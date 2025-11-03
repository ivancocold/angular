// server.js
import express from "express";
import fs from "fs";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import { dateTimestampProvider } from "rxjs/internal/scheduler/dateTimestampProvider";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const key = Buffer.from(process.env.SECRET_KEY_BASE64 || "", "base64");
if (key.length !== 32) {
  console.error("❌ SECRET_KEY_BASE64 invalide : fournis 32 octets en base64.");
  process.exit(1);
}

function encrypt(value) {
  if (value == null) return null;
  const iv = crypto.randomBytes(12); // 96 bits recommandé pour GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    // on stocke tout en base64
    iv: iv.toString("base64"),
    ct: ciphertext.toString("base64"),
    tag: tag.toString("base64"),
    alg: "AES-256-GCM"
  };
}

// Optionnel : pour lire côté admin/offline
function decrypt(payload) {
  if (!payload) return null;
  const iv = Buffer.from(payload.iv, "base64");
  const ct = Buffer.from(payload.ct, "base64");
  const tag = Buffer.from(payload.tag, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ct), decipher.final()]);
  return plaintext.toString("utf8");
}

app.post("/contact", (req, res) => {
  const incoming = req.body;

  // Lis l’existant
  const filePath = "./messages.json";
  let messages = [];
  if (fs.existsSync(filePath)) {
    messages = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  }

  // Prépare l’objet à stocker
  const record = {
    name: encrypt(incoming.name),
    email: encrypt(incoming.email),
    // On peut laisser le message en clair ou le chiffrer aussi :
    // message: encrypt(incoming.message),
    message: incoming.message,
    dateUTC: new Date().toISOString(),
    dateLocal: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
  };

  messages.push(record);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  res.status(200).json({ success: true, message: "Message enregistré (chiffré)." });
});

// (Optionnel) Endpoint protégé pour relire (ne l’expose pas en prod sans auth !)
app.get("/admin/messages-plaintext", (req, res) => {
  const filePath = "./messages.json";
  if (!fs.existsSync(filePath)) return res.json([]);

  const messages = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  const readable = messages.map((m) => ({
    name: decrypt(m.name),
    email: decrypt(m.email),
    message: m.message,
    date: m.date
  }));
  res.json(readable);
});

app.listen(3000, () => console.log("✅ Serveur backend sur http://localhost:3000"));
