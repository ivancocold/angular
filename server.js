// server.js

// Import du framework HTTP minimaliste Express
import express from "express";

// Module natif de Node pour lire/écrire des fichiers
import fs from "fs";

// Middleware pour autoriser les requêtes cross-origin (depuis un autre domaine/port)
import cors from "cors";

// Module natif de Node pour cryptographie (hash, chiffrement, etc.)
import crypto from "crypto";

// Pour charger les variables d'environnement depuis un fichier .env
import dotenv from "dotenv";
// Charger les variables d'environnement définies dans .env
dotenv.config();

// Création de l'application Express
const app = express();

// Autorise les requêtes CORS (par défaut, toutes les origines
app.use(cors());

// Permet à Express de comprendre les corps de requêtes JSON (req.body)
app.use(express.json());

/* Récupérer la clé de chiffrement depuis la variable d'environnement SECRET_KEY_BASE64.
 Je m'attend à une clé de 32 octets (256 bits) encodée en base64.
*/
const key = Buffer.from(process.env.SECRET_KEY_BASE64 || "", "base64");

// Je vérifie que la clé fait bien 32 octets, sinon on arrête le serveur.
if (key.length !== 32) {
  console.error("❌ SECRET_KEY_BASE64 invalide : fournis 32 octets en base64.");
  process.exit(1);
}

/*
  Fonction de chiffrement d'une valeur (string, nombre, etc.)
  Retourne un objet contenant :
   - iv (vecteur d'initialisation)
   - ct (ciphertext / texte chiffré)
   - tag (auth tag pour AES-GCM)
  Tout est encodé en base64 pour être stocké proprement en JSON.
*/
function encrypt(value) {
  // Si la valeur est null ou undefined, on renvoie null (pas d'erreur)
  if (value == null) return null;

  // Génère un IV (initialization vector) de 96 bits : recommandé pour GCM
  const iv = crypto.randomBytes(12); // 96 bits recommandé pour GCM

  // Crée un objet de chiffrement AES-256-GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  // Chiffre la valeur (convertie en string UTF-8)
  const ciphertext = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);

  // Récupère le tag d'authentification (pour vérifier l'intégrité à la déchiffre)
  const tag = cipher.getAuthTag();

  // je renvoie un objet sérialisable (tout en base64)
  return {
    // Je stocke tout en base64
    iv: iv.toString("base64"),
    ct: ciphertext.toString("base64"),
    tag: tag.toString("base64"),
    alg: "AES-256-GCM" // Juste une info pour savoir quel algorithme a été utilisé
  };
}


/*
  Fonction de déchiffrement (symétrique de encrypt);
  Utile côté admin ou offline pour relire les données chiffrées.
*/
function decrypt(payload) {
  // Si rien n'est fourni, Jje renvoie null
  if (!payload) return null;
  const iv = Buffer.from(payload.iv, "base64");
  const ct = Buffer.from(payload.ct, "base64");
  const tag = Buffer.from(payload.tag, "base64");

  // Création du déchiffreur AES-256-GCM
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  // Je fournis le tag pour vérifier l'intégrité des données
  decipher.setAuthTag(tag);

  // Je déchiffre les données
  const plaintext = Buffer.concat([decipher.update(ct), decipher.final()]);

  // Je renvoie une string UTF-8 lisible
  return plaintext.toString("utf8");
}


/*
  Endpoint POST /contact.
  Reçoit un message de contact (nom, email, message) depuis le frontend,
  chiffre le nom et l'email, puis stocke le tout dans un fichier JSON.
*/
app.post("/contact", (req, res) => {
  // Données envoyées par le frontend (body de la requête)
  const incoming = req.body;

  //Lire l'existant.
  // Chemin du fichier dans lequel on stocke les messages
  const filePath = "./messages.json";

  // J'initialise un tableau pour stocker les messages existants
  let messages = [];

  // Si le fichier existe déjà, je le lis et je parse le JSON
  if (fs.existsSync(filePath)) {
    messages = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  }

  // Préparer l’objet à stocker
  // Je construis l’objet à stocker
  const record = {
    //Je chiffre le nom et l'email
    name: encrypt(incoming.name),
    email: encrypt(incoming.email),
    
    // Si jamais je souhaite le chiffrer le message :
    // message: encrypt(incoming.message),
    message: incoming.message,

    // Date en format ISO UTC pourfacilier le traitement backend
    dateUTC: new Date().toISOString(),

    // Date formatée en heure locale française pour faciliter la lecture
    dateLocal: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
  };

  // J'ajoute ce nouveau message au tableau.
  messages.push(record);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  //Je renvoie une réponse succès au frontend
  res.status(200).json({ success: true, message: "Message enregistré (chiffré)." });
});

/*
  Endpoint GET /admin/messages-plaintext
  Permet de relire les messages en clair (en déchiffrant nom & email).
  ⚠️ À NE PAS exposer en production sans auth (JWT, session, etc.)
*/
app.get("/admin/messages-plaintext", (req, res) => {
  const filePath = "./messages.json";
  // Si aucun fichier, je renvoie un tableau vide
  if (!fs.existsSync(filePath)) return res.json([]);

  // Je lis tous les messages stockés (chiffrés)
  const messages = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");

  // Je construis une version "lisible" en déchiffrant nom & email
  const readable = messages.map((m) => ({
    name: decrypt(m.name),
    email: decrypt(m.email),
    message: m.message,
    dateUTC: m.dateUTC,
    dateLocal: m.dateLocal
  }));

  // Je retourne la version déchiffrée
  res.json(readable);
});

// Lancement du serveur sur le port 3000
app.listen(3000, () => console.log("✅ Serveur backend sur http://localhost:3000"));
