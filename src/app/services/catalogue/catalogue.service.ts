import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';


export function isFiniteNumber(x: unknown): x is number
{
  return typeof x === 'number' && Number.isFinite(x);
}

export function isPositivePrice(x: unknown): x is number
{
  return isFiniteNumber(x) && x > 0;
}

export function isPositiveInt(x: unknown): x is number
{
  return isFiniteNumber(x) && Number.isInteger(x) && x > 0;
}

export interface Produit
{
  readonly id: number;
  nom: string;
  categorie?: string[];
  sous_categorie?: string[];
  description: string;
  prix: number;
  quantite_en_stock?: number;
  //Pour gérer plusieurs images par produit, je les stocke dans un tableau
  imageUrls: string[];
}
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private produits: Produit[] = [
    {
      id: 1,
      nom: 'Aeroad CFR Di2',
      categorie: ['Vélo'],
      sous_categorie: ['Vélo de route'],
      description: 'Vélo de route avec cadre en carbone ultra-léger emblématique, roulé par les pros sur les plus grandes courses. Roues carbone DT Swiss ARC ultra-réactives. Groupe Shimano Dura-Ace Di2 haut de gamme. Capteur de puissance Shimano. Cockpit réglable en carbone.',
      prix: 1599.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://savaclub.com/wp-content/uploads/2024/05/AK105FullCarbonRoadBike-Aurora.webp',
        'https://dma.canyon.com/image/upload/t_web-detail/w_1300,h_1300,c_fill/b_rgb:F2F2F2/f_auto/q_auto/v1749020113/2026_FULL_aeroad_cfr-di2_4039_R108_P03_rb7wpt',
        'https://dma.canyon.com/image/upload/w_1300,h_1300,c_fill/f_auto/q_auto/v1749795857/2026_TOP-3_aeroad_cfr-di2_4039_R108_P03_adjustable-cockpit_ecmdeh',
        'https://dma.canyon.com/image/upload/w_1300,h_1300,c_fill/f_auto/q_auto/v1749795854/2026_TOP-4_aeroad_cfr-di2_4039_R108_P03_aero-seatpost_ho243d',
        'https://dma.canyon.com/image/upload/w_1300,h_1300,c_fill/f_auto/q_auto/v1749795860/2026_TOP-6_aeroad_cfr-di2_4039_R108_P03_integrated-tool_knihcn'
      ]
    },

    {
      id: 2,
      nom: 'PDQ AL 2',
      categorie: ['Vélo'],
      sous_categorie: ['VTT'],
      description: 'Vélo tout terrain polyvalent avec cadre en aluminium léger, fourche à suspension pneumatique de 120 mm et pneus larges pour une adhérence optimale sur les sentiers. Transmission 1x12 de SRAM pour une montée facile. Freins à disque mécaniques pour un contrôle fiable dans toutes les conditions.',
      prix: 889.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://cdn.rosebikes.de/cms/cms.68187fed7e14f6.44074144.png?im=Resize=(2000)',
        'https://storage.rosebikes.com/images/p/245581_1769079316.png?im=Resize=1212',
        'https://storage.rosebikes.com/images/p/245582_1769079314.png?im=Resize=1212',
        'https://storage.rosebikes.com/images/p/245583_1769079310.png?im=Resize=1212'
      ]
    },

    {
      id: 3,
      nom: 'Gitane G-One REDWOOD 1+',
      categorie: ['Vélo'],
      sous_categorie: ['VTT électrique'],
      description: 'Le VTT électrique GITANE G-One Redwood 1+ est équipé d\'une fourche Suntour XCR-34-Coil-Boost, 27,5\'\' Plus, hydraulique, offrant un débattement de 120 mm pour un confort optimal dans toutes les conditions.Propulsé par le moteur Shimano STEPS E6100 de 60 Nm et alimenté par une batterie eGoing de 603 Wh, ce électrique offre une autonomie impressionnante pouvant atteindre jusqu\'à 220 km. Idéal pour des excursions vtt avec dénivelé, le moteur Shimano STEPS E6100 est accompagné d\'un écran Shimano SC-E7000 + Mini Remote SW E7000 à gauche pour un contrôle facile.\n La tige de selle télescopique de 125 mm et la Selle Royal Vivo assurent une adaptabilité exceptionnelle aux terrains les plus techniques.\n Équipé de pneus TEC Saxum, 27,5\'\' x 3,00\'\' Tubeless Ready, ce VTT électrique garantit un passage en douceur sur des terrains techniques tout en assurant une sécurité maximale. La transmission 9 vitesses Shimano, CS-HG400-9, 11-36, associée au moteur Shimano STEPS E6100, 60 Nm, permet de surmonter efficacement les dénivelés.\n La colonne de direction intègre un passage interne des câbles et offre la possibilité d\'ajouter un porte-bagages au look baroudeur. Le cadre est spécialement conçu pour accueillir divers accessoires tels que béquille, garde-boue, etc.\n Cette version du VTT électrique GITANE G-One Redwood 1+ offre un excellent rapport qualité-prix, idéal pour ceux qui veulent s\'initier au VTTAE. Parfait pour des randonnées vtt, ce vélo léger offre une grande liberté pour explorer des paysages variés, que ce soit en France ou à l\'international.\n Les points forts incluent le confort maximal de la fourche Suntour, l\'autonomie étendue grâce à la batterie performante, la puissance du moteur Shimano STEPS, l\'assistance pédalage compacte et un freinage performant, fiable et discret.',
      prix: 2399.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://performancevelo.com/36444-superlarge_default/vtt-electrique-gitane-g-one-redwood-1.webp',
        'https://mounesmobilite.com/cdn/shop/files/yrz189-2400-1600_f3d2a31e-b1a0-46bd-983c-69a28d63e9d2_696x464.jpg?v=1711998421',
        'https://shop.roulezjeunesse.com/cdn/shop/files/1GitaneG-OneREDWOOD1.jpg?v=1737814036&width=610',
        'https://shop.roulezjeunesse.com/cdn/shop/files/5GitaneG-OneREDWOOD1.jpg?v=1737814036&width=610',
        'https://shop.roulezjeunesse.com/cdn/shop/files/7GitaneG-OneREDWOOD1.jpg?v=1737814036&width=610',
        'https://shop.roulezjeunesse.com/cdn/shop/files/6GitaneG-OneREDWOOD1.jpg?v=1737814036&width=610',
        'https://shop.roulezjeunesse.com/cdn/shop/files/8GitaneG-OneREDWOOD1.jpg?v=1737814036&width=610'
      ]
    },

    {
      id: 4,
      nom: 'Casque Specialized Prevail 3',
      categorie: ['Accessoire'],
      sous_categorie: ['Casque'],
      description: 'Le casque S-Works Prevail 3 est parfait pour les cyclistes qui apprécient les caractéristiques de confort et de thermorégulation offertes par une ventilation supérieure. C\'est le casque polyvalent ultime qui excelle dans des conditions chaudes, des ascensions ardues et des étapes de montagne. Avec une recherche fine pour trouver les limites de la ventilation, Specialized a éliminé les «cavaliers» centraux du matériau en mousse, qui bloquent l\'air du centre, créant ainsi des canaux qui dépassent la surface de 24,5% par rapport au S-Works Prevail II Évent . Le tout nouveau S-Works Prevail 3 possède la plus grande zone de ventilation de tous les casques jamais fabriqués. Lorsqu\'un casque fait un impact, son rôle est de sous-dissiper l\'énergie générée. L\'approche conventionnelle est que plus de mousse (EPS) signifie une meilleure gestion de l\'énergie. Le design des casques de vélo a été réécrit, allant au-delà de la mousse. Les câbles en aramide traversent le casque et sont ancrés aux panneaux latéraux en fibre de carbone. Dans l\'ensemble, la technologie AirCage * fonctionne comme un pont suspendu et est conçue pour les chocs dus à des forces localisées. L\'ajustement occipital permet un ajustement personnalisé, et même l\'angle du casque peut être géré pour la compatibilité avec les lunettes. Le système TriFix dispose désormais de sangles plus fines pour éviter toute irritation. Le système de maintien Mindset avec micro-registre est très léger, a une meilleure prise en main pour un réglage à la volée pendant le pédalage et est préparé pour l\'utilisation du capteur ANGi. La technologie MIPS Node Air est intégrée au rembourrage avec une fine couche conçue pour dissiper les forces de rotation. Des perforations ont été ajoutées pour améliorer encore le confort et les performances.',
      prix: 289.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://assets.specialized.com/i/specialized/60923-107_HLMT_SW-PREVAIL-3-HLMT-CE-WHT-BLK-M_HERO?$scom-pdp-gallery-image$&fmt=webp',
        'https://www.all4cycling.com/cdn/shop/products/casco-orevail-3-bianco-team-5_1800x1800.jpg?v=1666880582',
        'https://www.all4cycling.com/cdn/shop/products/casco-orevail-3-bianco-team-3_1800x1800.jpg?v=1666880582',
        'https://www.all4cycling.com/cdn/shop/products/casco-orevail-3-bianco-team-6_800x.jpg?v=1666880582',
        'https://www.all4cycling.com/cdn/shop/products/casco-orevail-3-bianco-team-7_800x.jpg?v=1666880582'
      ]
    },

{
  id: 5,
  nom: 'Gants chauffant thermiques Warmstyle',
  description: 'Restez au chaud et actif cet hiver avec des gants chauffants Warmstyle® pratiques, sûrs et performants. Chauffage ultra-rapide. Couverture chauffante complète. Réglage de la température à 3 niveaux. Fonction tactile pratique. Batterie longue durée',
  prix: 94.41,
  quantite_en_stock : 100,
  imageUrls: 
  [
    'https://warm-style.fr/cdn/shop/files/LP31_1024x1024.jpg?v=1698255810',
    'https://warm-style.fr/cdn/shop/files/5_b5cbf093-0379-41bf-9d50-24a8b9ebfde3_1024x1024.png?v=1728381510',
    'https://warm-style.fr/cdn/shop/files/7_16b5cd2b-38a2-4f2c-ad05-7ce1c6e46d5e_1024x1024.png?v=1728381509',
    'https://warm-style.fr/cdn/shop/files/4_1df2d51e-65d0-4957-8a0e-4185521820b5_1024x1024.png?v=1728381510',
    'https://warm-style.fr/cdn/shop/files/1_4d31f613-29f7-4f22-bc1f-47a0d17910a1_1024x1024.png?v=1728381510',
    'https://warm-style.fr/cdn/shop/files/3_0a52ad6c-8e10-42ef-80fd-6bc0cc2620cf_1024x1024.png?v=1728381510',
    'https://warm-style.fr/cdn/shop/files/6_1c661f1c-67e9-4b83-8254-a5134e432a19_1024x1024.png?v=1728381509'
  ]
},

    {
      id: 6,
      nom: 'Chaussures Specialized S-Works Torch',
      description: 'La torche Specialized S-Works représente la dernière évolution dans le domaine des chaussures les plus performantes du cyclisme. En utilisant la géométrie corporelle, le biomimétisme, la science des données et le savoir-faire, Specialized a conçu une chaussure construite avec tant de soin que vous oublierez que vous la portez. Tirant parti de la science des données, Specialized a perfectionné chaque détail de la partie supérieure de la torche S-Works pour un meilleur ajustement et des performances inégalées. Le câble BOA® est décalé vers le bas et incliné, empêchant le soulèvement de l\'avant-pied. Cette évolution élimine le besoin d\'une sangle velcro, tout en offrant une structure qui améliore la puissance et élimine les pressions ou pincements indésirables. Les matériaux adaptatifs permettent un mouvement naturel du pied là où cela est nécessaire pour plus de confort, tandis que le renforcement zonal basé sur les données maintient le pied bandé pour une puissance de sortie nette et une efficacité optimale. Guidé par plus de 100 000 scans de pieds de données RETÜL, Specialized a reconnu qu\'une semelle standard et une semelle large conviendraient mieux à l\'éventail complet des formes de pieds humains. Un renfort interne ajoute de la rigidité et de la résistance. Le résultat est une réduction de poids de 20 grammes, une plus grande efficacité et un transfert de puissance immédiat. Également sur la base des données RETÜL, il a été estimé qu\'il fallait plus d\'espace pour accueillir le tendon d\'Achille afin d\'augmenter le confort. Le problème a été résolu en créant un siège de talon asymétrique qui offrait plus d\'espace, tout en conservant une excellente connexion. Par conséquent, il a été vérifié pour maintenir un alignement optimal du genou et un confort accru. La torche S-Works a été scientifiquement conçue pour disparaître à vos pieds.',
      prix: 389.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://assets.specialized.com/i/specialized/61024-0544_SHOE_24SWTORCH_REDSKY_HERO?$scom-pdp-gallery-image$&fmt=webp',
        'https://www.all4cycling.com/cdn/shop/files/61024-0544_SHOE_24SWTORCH_REDSKY_TOP.jpg?v=1750076467',
        'https://www.all4cycling.com/cdn/shop/files/61024-0544_SHOE_24SWTORCH_REDSKY_PAIR.jpg?v=1750076587',
        'https://www.all4cycling.com/cdn/shop/files/61024-0544_SHOE_24SWTORCH_REDSKY_MEDIAL.jpg?v=1750076588',
        'https://www.all4cycling.com/cdn/shop/files/61024-0544_SHOE_24SWTORCH_REDSKY_BOTTOM.jpg?v=1750076498'
      ]
    },

    {
      id: 7,
      nom: 'Pedales Assioma Uno | favero',
      description: 'Les pédales automatiques Assioma peuvent être facilement montées, démontées et transférées d’un vélo à l’autre en quelques minutes : sans outils spéciaux et sans l’aide d’un mécanicien. Tout simplement comme des pédales communes.',
      prix: 350.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://media.bike-street.com/10664-large_default/pedales-capteur-de-puissance-favero-assioma-duo.jpg',
        'https://www.365rider.com/24551-thickbox_default/favero-assioma-uno-pedales-de-mesure-de-puissance-individuelles.jpg',
        'https://www.365rider.com/24549-thickbox_default/favero-assioma-uno-pedales-de-mesure-de-puissance-individuelles.jpg',
        'https://www.365rider.com/24552-thickbox_default/favero-assioma-uno-pedales-de-mesure-de-puissance-individuelles.jpg',
        'https://www.365rider.com/24548-thickbox_default/favero-assioma-uno-pedales-de-mesure-de-puissance-individuelles.jpg',
        'https://triathlonstore.fr/cdn/shop/files/19296.jpg?v=1734993924&width=1500',
        'https://triathlonstore.fr/cdn/shop/files/19297.jpg?v=1734993924&width=1500'
      ]
    },

    {
      id: 8,
      nom: 'Sacoche de selle OGIO Duffel Endurance 9.0',
      categorie: ['Accessoire'],
      sous_categorie: ['Sacoche'],
      description: `Bretelles réglables de style sac à dos avec sangle de poitrine réglable.
      Tech Vault résistant à l'écrasement pour lunettes de soleil et appareils électroniques.
      Compartiment ventilé pour chaussures et vêtements sales.
      Poche humide/sèche avec soufflet d'aération à 360°.
      Le tissu 3M-Tech hautement réfléchissant offre une visibilité exceptionnelle dans des conditions de faible luminosité`,
      prix: 175.43,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://topracingshop.fr/hpeciai/bb42fb30600777f02fbe1c4f3b434386/fre_pl_Sac-de-voyage-Ogio-Endurance-9-0-Noir-17150_1.jpg',
        'https://m.media-amazon.com/images/I/61ZhS3wGcQL._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/61zvYoyEgsL._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/61mOFoSRZkL._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/61BHZFPRnLL._AC_SL1000_.jpg'

      ]
    },

    {
      id: 9,
      nom: 'Éclairage vélo ELOPS',
      categorie: ['Accessoire'],
      sous_categorie: ['Éclairage'],
      description: `Éclairage avant et arrière à LED pour vélo, alimenté par piles. Puissance éclairage LED :
      - éclairage LED avant : 25Lux/75 Lumens et 15Lux/35 lumens en mode ECO
      - éclairage LED arrière : 5Lux/3 Lumens
      Homologué code de la route Allemagne (STVZO)
      Équipé de lentilles spécifiques qui focalisent la lumière pour voir à l'AVANT (devant soit à une vitesse de 15km/h correctement) pour éviter un obstacle et à l'arrière pour être vu à 220°.
      Piles: 3xAAA pour l'éclairage avant (inclus dans le pack), 2xAA pour l'éclairage arrière (inclus dans le pack). Compatibles avec des piles rechargeables.
      Pour changer les piles, utiliser une pièce de monnaie pour l'éclairage arrière. Pour l'éclairage avant, il suffit de faire glisser la capot de l'éclairage vers l'arrière`,
      prix: 15.99,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2943866/k$112fcaf504c2f651829d4ad2159bb841/sq/kit-eclairage-velo-led-st-110-avant-et-arriere-a-piles.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2943863/k$d4994f8fd328e3fcd5ffdaec289c0190/image_pixl.png?format=auto',
        'https://contents.mediadecathlon.com/p2943865/k$27ce149ef48ec1c3c06bbd0a69f205e5/image_pixl.png?format=auto',
        'https://contents.mediadecathlon.com/p2943864/k$b894e83735159189786a1db4250645f0/image_pixl.png?format=auto',
        'https://contents.mediadecathlon.com/p2277070/k$91480cb7e54aaacb3e14d771d0f5577b/image_pixl.png?format=auto'
      ]
    },

    {
      id: 10,
      nom: 'Feu arrière de vélo à LED alimenté par batterie - 80 mm',
      categorie: ['Accessoire'],
      sous_categorie: ['Éclairage'],
      description: `Conçu pour remplacer le feu arrière de votre vélo de ville. L\'accessoire de sécurité indispensable.`,
      prix: 12.99,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p1635058/k$7529d24aeb7460d0fcc5c892bd424449/sq/eclairage-velo-arriere-a-pile-led-80mm.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p710760/1cr1/k$105f9d1eea41e39e701ba807c76ccd70/battery-powered-rear-80-mm-led-bike-lights.jpg?f=3000x0&format=auto',
        'https://contents.mediadecathlon.com/p710759/1cr1/k$d26d99139810949d6616807d14f0ba77/battery-powered-rear-80-mm-led-bike-lights.jpg?f=3000x0&format=auto',
        'https://contents.mediadecathlon.com/p710755/1cr1/k$d94c4f41238786ad277dc199af752a97/battery-powered-rear-80-mm-led-bike-lights.jpg?f=3000x0&format=auto'
      ]
    },

    {
      id: 11,
      nom: "Gourde de vélo 550 ml indispensable",
      categorie: ['Accessoire'],
      sous_categorie: ['Gourde'],
      description: `Restez hydraté lors de vos courtes sorties à vélo grâce à cette gourde pratique. D'un volume de 550 ml, cette gourde est simple et fiable. Fabriquée en plastique souple, elle vous permet de boire facilement même en pédalant. Savourez le goût pur de l'eau.`,
      prix: 2.49,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2721829/k$3b7f00a38a37b966e4792ff10f50a593/image_pixl.png?format=auto',
        'https://decathlon.ae/cdn/shop/files/pic_eaec83b7-8e45-45b0-a5e6-bfcf04d189d5.jpg?v=1769724046&width=1000',
        'https://decathlon.ae/cdn/shop/files/pic_cc8277d2-6560-4143-aa90-a56506057bbe.jpg?v=1769724046&width=1000'
      ]
    },

    {
      id: 12,
      nom: 'SKS Pompe à Air et au Sol Air Control 8.0 avec Manomètre, Noir 55,4 cm de long',
      description: `Pompe à vélo SKS. La matière est plastique. Hauteur : 554 mm. Pression max. : 8 bar`,
      categorie: ['Accessoire'],
      sous_categorie: ['Pompe'],
      prix: 44.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p744930/k$f09d6d35d432223e78e3ec6686909afd/sq/pompe-a-pied-velo-air-x-press-80.jpg?format=auto&f=1200x1200',
        'https://m.media-amazon.com/images/I/51yHYkw34nL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/710pLPF+iOL._AC_SL1500_.jpg'
      ]
    },

    {
      id: 13,
      nom: 'Antivol U certifié ART2 D 900 M',
      categorie: ['Accessoire'],
      sous_categorie: ['Antivol'],
      description: `Cet antivol vélo U haute sécurité a été conçu pour protéger votre vélo contre le vol lors d'arrêts de longue durée. Antivol certifié ART2, Sold Secure silver. LE D900 M est un antivol haute sécurité très résistant et ultra compact. Léger et facile à transporter, il permet d'attacher le cadre de votre vélo à un point fixe comme un mobilier urbain.`,
      prix: 29.99,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2534983/k$7e90b462b51c31d26351ad511f622f97/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2534981/k$c1f16de82d027cc410de4d288e19a7fe/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2534979/k$1fa8ed04899b2032b1d0483feaba655c/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2534980/k$80e3e1d95ca1060fc7d360d2cf9b94f9/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2534977/k$11e2c956eaa21c15305e9a22855da788/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2534977/k$11e2c956eaa21c15305e9a22855da788/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 14,
      nom: 'Antivol à chaîne certifié art3 920',
      description: `Nos équipes ont développé cette chaîne antivol de haute sécurité pour sécuriser votre vélo à différentes formes de points d'attache. Certifié ART3 & Sold Secure.
      Un antivol de haute sécurité de bonne longueur permettant d'attacher 2 vélos, un vélo électrique ou son vélo autour de points fixes à grand diamètre (ex: arbres, poteaux, grilles…).`,
      prix: 59.99,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2314918/k$9fb0a72702a47f3ff9a026ff07a80136/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2314919/k$f20886a98a683c8c1797ebe09e4d62bc/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2314916/k$416400f87fc10b0370f79c1790377823/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2314920/k$6bd26c696337504cfa0162ad007627ae/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2314915/k$e754b8addb110ca2433a02faaed97cf0/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/p2815492/k$47dd88c7c1a64fe35620043478d74c1f/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200',
        ''
      ]
    },

    {
      id: 15,
      nom: 'Garde-boue en aluminuium TrackloX',
      categorie: ['Accessoire'],
      sous_categorie: ['Garde-boue'],
      description:`Garde-boue en aluminium pour XFIXXI TrackloX - Idéal pour le Tracklocross et le bikepacking. Un ensemble de garde-boues intégraux conçu sur mesure pour le XFIXXI TrackloX, offrant une durabilité et une protection inégalées pour rouler par tous les temps, que ce soit en tracklocross ou en bikepacking. Fabriqués en aluminium léger, ces garde-boues s'adaptent facilement aux pneus jusqu'à 700x35c, assurant une protection optimale contre la boue, l'eau et les débris. Aucune modification n'est nécessaire : il suffit de les boulonner sur le XFIXXI TrackloX avec la visserie fournie, pour une utilisation simple et sereine, quel que soit votre niveau. Roulez en toute confiance, quelles que soient les conditions, grâce à cette protection ultime : des garde-boues légers et performants.
      Spécifications
      Matériau : Aluminium
      Compatible : 700x35c max
      Poids : 620 g environ / paire
      Prix pour une paire (avant et arrière)
      Compatible avec les modèles XFIXXI : TrackloX`,
      prix: 59.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://xfixxi.ca/cdn/shop/files/Photoroom-20240414-154604_1024x1024.png?v=1713124262',
        'https://xfixxi.ca/cdn/shop/files/DSC05137_1024x1024.jpg?v=1713124261',
        'https://xfixxi.ca/cdn/shop/files/DSC05138_1024x1024.jpg?v=1713124261',
        'https://xfixxi.ca/cdn/shop/files/DSC05139_1024x1024.jpg?v=1713124261',
        'https://xfixxi.ca/cdn/shop/files/DSC05141_1024x1024.jpg?v=1713124261',
        'https://xfixxi.ca/cdn/shop/files/DSC05142_1024x1024.jpg?v=1713124261',
        'https://xfixxi.ca/cdn/shop/files/DSC05147_1024x1024.jpg?v=1713124261'
      ]
    },

    {
      id: 16,
      nom: 'Support téléphone Shapeheart',
      categorie: ['Accessoire'],
      sous_categorie: ['Support téléphone'],
      description: 'Système magnétique avec fixation élastique en silicone, plaque métal incluse. Installation facile.',
      prix: 29.99,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2572653/k$be4514a39480800f3da09fd2db3ac414/sq/support-smartphone-pour-guidon-de-velo-telephone-xl.jpg?format=auto&f=1200x1200',
        'https://shapeheart.fr/cdn/shop/files/MOTOTU.png?v=1743689613&width=1000',
        'https://shapeheart.fr/cdn/shop/products/Clapplaquemetaladhesive.jpg?v=1763970510&width=1000',
        'https://shapeheart.fr/cdn/shop/products/Steelplate.jpg?v=1763970510&width=1000',
        'https://shapeheart.fr/cdn/shop/products/Rangementplaquepochemoto.jpg?v=1763970510&width=1000'
      ]
    },

    {
      id: 17,
      nom: 'Capteur Shimano ISCE6100DI',
      description: 'Capteur de vitesse de vélo SC-E6100. Système E-TUBE. Mode d\'assistance.\n 5 modes d\'assistance : HIGH, NORM, ECO, OFF, WALK.\n Communication étendue par connectivité sans fil.\n Écran large et lisible.\n Communication sans fil avec d\'autres écrans et les applications smartphones.\n Support total E-TUBE PROJECT pour les différents modes d\'utilisation du vélo.\n D-FLY (boîtier de communication sans fil)',
      prix: 184.99,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2626718/k$82d80a04619ade82b46e945f2cf201dc/sq/display-shimano-steps-sc-e6100.jpg?format=auto&f=1200x1200',
        'https://www.bike-discount.de/media/8e/a0/13/1705530552/shimano_sc-e6100-steps-display-inkl-halter_ksce6100ci.jpg?ts=1762584160',
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQFBIhPypMQycWDCfMojPDC_Xy7iGZRUdw-TYWjjIAwPRVPxNk_pYHEjI4OHf99PdIc4z0LNI1eY5QOSXM_0M2Ed2OkyZs7MQ',
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTWX9bZzC-4XT7J4UaE-fsil2izDARkXuS2Hpuk3kuqZyPGRcuSxyyCZ5gss1Dh439y1HGK5pk6FpF2DDuvZRsAVKsPUN1i',
        'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTzWNMd8D_7mdmuIUe31a15GPPbV2x6POicEVb-MGmc5JPykJpMfmRkw90-_PCZ-w605yfbI69YtVtZ7OqRuUjSi0Eg_229Ag'
      ]
    },

    {
      id: 18,
      nom: 'Engine Pro 2.0',
      description: 'Vélo électrique pliant d\'aventure en plein air à couple élevé de 75 Nm',
      prix: 1499.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://engwe.com/cdn/shop/files/Engine_Pro_2_3.jpg?crop=center&height=2089&v=1767078817&width=1500',
        'https://engwe.com/cdn/shop/files/Engine_pro_2.0.jpg?crop=center&height=2089&v=1767078817&width=1500',
        'https://engwe.com/cdn/shop/files/9_ea5393f3-881a-48e1-bb44-5ebad8ddd763.jpg?crop=center&height=2089&v=1767078817&width=1500',
        'https://engwe.com/cdn/shop/files/Engine_Pro_2_2.jpg?crop=center&height=2089&v=1764660051&width=1500'        
      ]
    },

    {
      id: 19,
      nom: 'Maillot cycliste BIC vintage',
      description: `Maillot long vintage BIC. Une apparence clairement Vintage, pour une conception tout à fait contemporaine.\n
      La coupe est très actuelle et près du corps pour plus d'aérodynamisme.
      ✅ il bénéficie d'un séchage rapide grâce au Lycra et au polyester
      ✅ il est respirant, anti-rétrécissement, anti-transpiration et anti-boulochage, 
      ✅ il possède 3 poches à l'arrière.
      Pour les 3 saisons de vélo !`,
      prix: 57.50,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://maillotcycliste-vintage.fr/cdn/shop/products/Bic_Pen_Retro_Long_sleeve_Cycling_Jersey_1__00721.1510063468_f1668d7c-15ba-43b6-9c0e-b62150e0ecdc_500x.jpg?v=1601881886',
        'https://iovevelo.com/cdn/shop/products/Maillot-Long-Ete-Vintage-BIC-Dos_800x800.jpg',
        'https://www.prendas.co.uk/cdn/shop/products/3c_5a1188d4-bc44-48b0-922f-15b7c770bfb0_5000x.jpg?v=1678790386',
        'https://www.prendas.co.uk/cdn/shop/products/3d_303c0626-7c93-4fd5-8eb8-762aea16b676_5000x.jpg?v=1678790386',
        'https://www.prendas.co.uk/cdn/shop/products/3e_b271fb14-87a2-4df7-87f3-065e48c68779_5000x.jpg?v=1678790386'
      ]
    },

    {
      id: 20,
      nom: 'Short WAG',
      categorie: ['Vêtement'],
      sous_categorie: ['Short'],
      description: 'Short WAG noir, utilisable à vélo',
      prix: 44.95,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://i0.wp.com/wodandgo.com/wp-content/uploads/2024/04/Pack-Blackgrip.webp?fit=768%2C1152&ssl=1',
        'https://i0.wp.com/wodandgo.com/wp-content/uploads/2024/04/short_wag-scaled.webp?fit=1707%2C2560&ssl=1',
        'https://i0.wp.com/wodandgo.com/wp-content/uploads/2024/04/image00008.webp?fit=1080%2C1619&ssl=1',
        'https://i0.wp.com/wodandgo.com/wp-content/uploads/2024/04/image00001.webp?fit=1080%2C1619&ssl=1'
      ]
    },

    {
      id: 30,
      nom: 'Porte-bidon Supacaz Manta',
      description: 'Optimisez vos sorties avec le porte-bidon Supacaz Manta, alliant légèreté, robustesse et design moderne pour chaque cycliste passionné.',
      prix: 25.00,
      quantite_en_stock : 100,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/m22294700/k$d9ed75cbe45e83d65feea06c5657daca/sq/porte-bidon-supacaz-manta.jpg?format=auto&f=1200x1200',
        'https://contents.mediadecathlon.com/m22294698/k$231a629ffed1752a071332666598c368/sq/porte-bidon-supacaz-manta.jpg?format=auto&f=1200x1200'
      ]
    }
  ];

  getProduits$(): Observable<Produit[]>
  {
    return of(this.produits).pipe(
      delay(150), // simulate réseau

      map((produits) =>
        produits.map
      (
        (p) =>
          (
            {
              ...p,
              quantite: p.quantite_en_stock ?? 100, // défaut = 100
            }
          )
        )
      ),

      catchError
      (
        (err) =>
          {
            return throwError(() => new Error('Impossible de charger le catalogue (local).'));
          }
      )
    );
  }
}

/*{ id: 21, nom: 'Cuissard', description: 'Cuissard', prix: 149.78, imageUrl: 'https://via.placeholder.com/300x200?text=Cuissard' },
    
    { id: 22, nom: 'Trousse outils', description: 'Trousse outils', prix: 61.64, imageUrl: 'https://via.placeholder.com/300x200?text=Trousse%2Foutils' },
    
    { id: 23, nom: 'Chambre à air', description: 'Chambre à air', prix: 53.07, imageUrl: 'https://via.placeholder.com/300x200?text=Chambre%2F%C3%A0%2Fair' },
    
    { id: 24, nom:'Pneu route', description:'Pneu route', prix : 259.39, imageUrl:'https://via.placeholder.com/300x2
    
    { id: 28, nom: 'Lunettes vélo', description: 'Lunettes vélo', prix: 238.44, imageUrl: 'https://via.placeholder.com/300x200?text=Lunettes%20v%C3%A9lo' },
    
    { id: 29, nom: 'Béquille', description: 'Béquille', prix: 56.46, imageUrl: 'https://via.placeholder.com/300x200?text=B%C3%A9quille' },*/

