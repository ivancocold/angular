import { Injectable } from '@angular/core';

export interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  imageUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private produits: Produit[] = [
    { id: 1, nom: 'Vélo de route', description: 'Description du produit : vélo de route', prix: 1599.00, imageUrl: 'https://savaclub.com/wp-content/uploads/2024/05/AK105FullCarbonRoadBike-Aurora.webp' },
    { id: 2, nom: 'Vélo tout terrain', description: 'Description du produit : vélo tout terrain', prix: 889.00, imageUrl: 'https://cdn.rosebikes.de/cms/cms.68187fed7e14f6.44074144.png?im=Resize=(2000)' },
    { id: 3, nom: 'Vélo électrique', description: 'Description du produit : vélo électrique', prix: 2399.00, imageUrl: 'https://performancevelo.com/36444-superlarge_default/vtt-electrique-gitane-g-one-redwood-1.webp,https://performancevelo.com/36444-superlarge_default_2x/vtt-electrique-gitane-g-one-redwood-1.webp' },
    { id: 4, nom: 'Casque vélo', description: 'Description du produit : casque vélo', prix: 289.00, imageUrl: 'https://assets.specialized.com/i/specialized/60923-107_HLMT_SW-PREVAIL-3-HLMT-CE-WHT-BLK-M_HERO?$scom-pdp-gallery-image$&fmt=webp' },
    { id: 5, nom: 'Gants cyclistes', description: 'Description du produit : gants cyclistes', prix: 94.41, imageUrl: 'https://warm-style.fr/cdn/shop/files/LP31_1024x1024.jpg?v=1698255810' },
    { id: 6, nom: 'Chaussures vélo', description: 'Description du produit : chaussures vélo', prix: 389.00, imageUrl: 'https://assets.specialized.com/i/specialized/61024-0544_SHOE_24SWTORCH_REDSKY_HERO?$scom-pdp-gallery-image$&fmt=webp' },
    { id: 7, nom: 'Pédales automatiques', description: 'Description du produit : pédales automatiques', prix: 422.75, imageUrl: 'https://media.bike-street.com/10664-large_default/pedales-capteur-de-puissance-favero-assioma-duo.jpg' },
    { id: 8, nom: 'Sacoche de selle', description: 'Description du produit : sacoche de selle', prix: 211.22, imageUrl: 'https://topracingshop.fr/hpeciai/bb42fb30600777f02fbe1c4f3b434386/fre_pl_Sac-de-voyage-Ogio-Endurance-9-0-Noir-17150_1.jpg' },
    { id: 9, nom: 'Éclairage avant', description: 'Description du produit : éclairage avant', prix: 15.99, imageUrl: 'https://contents.mediadecathlon.com/p2943866/k$112fcaf504c2f651829d4ad2159bb841/sq/kit-eclairage-velo-led-st-110-avant-et-arriere-a-piles.jpg?format=auto&f=1200x1200' },
    { id: 10, nom: 'Éclairage arrière', description: 'Description du produit : éclairage arrière', prix: 12.99, imageUrl: 'https://contents.mediadecathlon.com/p1635058/k$7529d24aeb7460d0fcc5c892bd424449/sq/eclairage-velo-arriere-a-pile-led-80mm.jpg?format=auto&f=1200x1200' },
    { id: 11, nom: "Bidon d'eau", description: "Description du produit : bidon d'eau", prix: 2.49, imageUrl: 'https://contents.mediadecathlon.com/p2721829/k$3b7f00a38a37b966e4792ff10f50a593/image_pixl.png?format=auto' },
    { id: 12, nom: 'Pompe à vélo', description: 'Description du produit : pompe à vélo', prix: 24.99, imageUrl: 'https://contents.mediadecathlon.com/p744930/k$f09d6d35d432223e78e3ec6686909afd/sq/pompe-a-pied-velo-air-x-press-80.jpg?format=auto&f=1200x1200' },
    { id: 13, nom: 'Antivol U', description: 'Description du produit : antivol u', prix: 29.99, imageUrl: 'https://contents.mediadecathlon.com/p2534983/k$7e90b462b51c31d26351ad511f622f97/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200' },
    { id: 14, nom: 'Antivol à chaîne', description: 'Description du produit : antivol à chaîne', prix: 59.99, imageUrl: 'https://contents.mediadecathlon.com/p2314918/k$9fb0a72702a47f3ff9a026ff07a80136/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200' },
    { id: 15, nom: 'Garde-boue', description: 'Description du produit : garde-boue', prix: 29.99, imageUrl: 'https://contents.mediadecathlon.com/p3023097/k$efc895440156f64eac0ef2ed97ae4b2f/sq/garde-boues-avant-et-arriere-avec-tringles-rigides-velo-trekking-28.jpg?format=auto&f=1200x1200' },
    { id: 16, nom: 'Support téléphone', description: 'Description du produit : support téléphone', prix: 29.99, imageUrl: 'https://contents.mediadecathlon.com/p2572653/k$be4514a39480800f3da09fd2db3ac414/sq/support-smartphone-pour-guidon-de-velo-telephone-xl.jpg?format=auto&f=1200x1200' },
    { id: 17, nom: 'Compteur de vitesse', description: 'Description du produit : compteur de vitesse', prix: 184.99, imageUrl: 'https://contents.mediadecathlon.com/p2626718/k$82d80a04619ade82b46e945f2cf201dc/sq/display-shimano-steps-sc-e6100.jpg?format=auto&f=1200x1200' },
    { id: 18, nom: 'Vélo pliant', description: 'Description du produit : vélo pliant', prix: 1599.00, imageUrl: 'https://dma.canyon.com/image/upload/t_web-p5/w_991,c_fit/b_rgb:F2F2F2/f_auto/q_auto/v1744104233/2026_FULL_endurace_cf-6_4273_R076_P09_mkth9v' },
    { id: 19, nom: 'Maillot cycliste', description: 'Description du produit : maillot cycliste', prix: 57.50, imageUrl: 'https://maillotcycliste-vintage.fr/cdn/shop/products/Bic_Pen_Retro_Long_sleeve_Cycling_Jersey_1__00721.1510063468_f1668d7c-15ba-43b6-9c0e-b62150e0ecdc_500x.jpg?v=1601881886' },
    { id: 20, nom: 'Short vélo', description: 'Description du produit : short vélo', prix: 44.95, imageUrl: 'https://i0.wp.com/wodandgo.com/wp-content/uploads/2024/04/Pack-Blackgrip.webp?fit=768%2C1152&ssl=1' },
    /*{ id: 21, nom: 'Cuissard', description: 'Description du produit : cuissard', prix: 149.78, imageUrl: 'https://via.placeholder.com/300x200?text=Cuissard' },
    { id: 22, nom: 'Trousse outils', description: 'Description du produit : trousse outils', prix: 61.64, imageUrl: 'https://via.placeholder.com/300x200?text=Trousse%20outils' },
    { id: 23, nom: 'Chambre à air', description: 'Description du produit : chambre à air', prix: 53.07, imageUrl: 'https://via.placeholder.com/300x200?text=Chambre%20%C3%A0%20air' },
    { id: 24, nom: 'Pneu route', description: 'Description du produit : pneu route', prix: 259.39, imageUrl: 'https://via.placeholder.com/300x200?text=Pneu%20route' },
    { id: 25, nom: 'Pneu VTT', description: 'Description du produit : pneu vtt', prix: 468.25, imageUrl: 'https://via.placeholder.com/300x200?text=Pneu%20VTT' },
    { id: 26, nom: 'Guidoline', description: 'Description du produit : guidoline', prix: 180.38, imageUrl: 'https://via.placeholder.com/300x200?text=Guidoline' },
    { id: 27, nom: 'Selle confort', description: 'Description du produit : selle confort', prix: 477.63, imageUrl: 'https://via.placeholder.com/300x200?text=Selle%20confort' },
    { id: 28, nom: 'Lunettes vélo', description: 'Description du produit : lunettes vélo', prix: 238.44, imageUrl: 'https://via.placeholder.com/300x200?text=Lunettes%20v%C3%A9lo' },
    { id: 29, nom: 'Béquille', description: 'Description du produit : béquille', prix: 56.46, imageUrl: 'https://via.placeholder.com/300x200?text=B%C3%A9quille' },*/
    { id: 30, nom: 'Porte-bidon', description: 'Description du produit : porte-bidon', prix: 9.80, imageUrl: 'https://contents.mediadecathlon.com/p744984/k$590ff9496690762fd130c68933e1ea28/sq/porte-bidon-velo-custom-race-noir.jpg?format=auto&f=1200x1200' }
  ];
  getProduits(): Produit[] {
    return this.produits;
  }
}

