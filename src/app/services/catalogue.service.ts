import { Injectable } from '@angular/core';

export interface Produit {
  id: number;
  nom: string;
  categorie?: string;
  sous_categorie?: string;
  description: string;
  prix: number;
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
      categorie: 'Vélo',
      sous_categorie: 'Vélo de route',
      description: 'Vélo de route avec cadre en carbone ultra-léger emblématique, roulé par les pros sur les plus grandes courses. Roues carbone DT Swiss ARC ultra-réactives. Groupe Shimano Dura-Ace Di2 haut de gamme. Capteur de puissance Shimano. Cockpit réglable en carbone.',
      prix: 1599.00,
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
      categorie: 'Vélo',
      sous_categorie: 'VTT',
      description: 'Vélo tout terrain polyvalent avec cadre en aluminium léger, fourche à suspension pneumatique de 120 mm et pneus larges pour une adhérence optimale sur les sentiers. Transmission 1x12 de SRAM pour une montée facile. Freins à disque mécaniques pour un contrôle fiable dans toutes les conditions.',
      prix: 889.00,
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
      nom: 'Vélo électrique',
      categorie: 'Vélo',
      sous_categorie: 'Vélo électrique',
      description: 'Vélo électrique',
      prix: 2399.00,
      imageUrls: 
      [
        'https://performancevelo.com/36444-superlarge_default/vtt-electrique-gitane-g-one-redwood-1.webp'
      ]
    },

    {
      id: 4,
      nom: 'Casque vélo',
      categorie: 'Accessoire',
      sous_categorie: 'Casque',
      description: 'Casque vélo',
      prix: 289.00,
      imageUrls: 
      [
        'https://assets.specialized.com/i/specialized/60923-107_HLMT_SW-PREVAIL-3-HLMT-CE-WHT-BLK-M_HERO?$scom-pdp-gallery-image$&fmt=webp'
      ]
    },

    {
      id: 5,
      nom: 'Gants cyclistes',
      description: 'Gants cyclistes',
      prix: 94.41,
      imageUrls: 
      [
        'https://warm-style.fr/cdn/shop/files/LP31_1024x1024.jpg?v=1698255810'
      ]
    },

    {
      id: 6,
      nom: 'Chaussures vélo',
      description: 'Chaussures vélo',
      prix: 389.00,
      imageUrls: 
      [
        'https://assets.specialized.com/i/specialized/61024-0544_SHOE_24SWTORCH_REDSKY_HERO?$scom-pdp-gallery-image$&fmt=webp'
      ]
    },

    {
      id: 7,
      nom: 'Pédales automatiques',
      description: 'Pédales automatiques',
      prix: 422.75,
      imageUrls: 
      [
        'https://media.bike-street.com/10664-large_default/pedales-capteur-de-puissance-favero-assioma-duo.jpg'
      ]
    },

    {
      id: 8,
      nom: 'Sacoche de selle',
      description: 'Sacoche de selle',
      prix: 211.22,
      imageUrls: 
      [
        'https://topracingshop.fr/hpeciai/bb42fb30600777f02fbe1c4f3b434386/fre_pl_Sac-de-voyage-Ogio-Endurance-9-0-Noir-17150_1.jpg'
      ]
    },

    {
      id: 9,
      nom: 'Éclairage avant',
      description: 'Éclairage avant',
      prix: 15.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2943866/k$112fcaf504c2f651829d4ad2159bb841/sq/kit-eclairage-velo-led-st-110-avant-et-arriere-a-piles.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 10,
      nom: 'Éclairage arrière',
      description: 'Éclairage arrière',
      prix: 12.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p1635058/k$7529d24aeb7460d0fcc5c892bd424449/sq/eclairage-velo-arriere-a-pile-led-80mm.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 11,
      nom: "Bidon d'eau",
      description: "Bidon d'eau",
      prix: 2.49,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2721829/k$3b7f00a38a37b966e4792ff10f50a593/image_pixl.png?format=auto'
      ]
    },

    {
      id: 12,
      nom: 'Pompe à vélo',
      description: 'Pompe à vélo',
      prix: 24.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p744930/k$f09d6d35d432223e78e3ec6686909afd/sq/pompe-a-pied-velo-air-x-press-80.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 13,
      nom: 'Antivol U',
      description: 'Antivol U',
      prix: 29.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2534983/k$7e90b462b51c31d26351ad511f622f97/sq/antivol-velo-u-haute-securite-certifie-art2-d-900-m.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 14,
      nom: 'Antivol à chaîne',
      description: 'Antivol à chaîne',
      prix: 59.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2314918/k$9fb0a72702a47f3ff9a026ff07a80136/sq/antivol-velo-chaine-certifie-art3-920-l.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 15,
      nom: 'Garde-boue',
      description: 'Garde-boue',
      prix: 29.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p3023097/k$efc895440156f64eac0ef2ed97ae4b2f/sq/garde-boues-avant-et-arriere-avec-tringles-rigides-velo-trekking-28.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 16,
      nom: 'Support téléphone',
      description: 'Support téléphone',
      prix: 29.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2572653/k$be4514a39480800f3da09fd2db3ac414/sq/support-smartphone-pour-guidon-de-velo-telephone-xl.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 17,
      nom: 'Compteur de vitesse',
      description: 'Compteur de vitesse',
      prix: 184.99,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p2626718/k$82d80a04619ade82b46e945f2cf201dc/sq/display-shimano-steps-sc-e6100.jpg?format=auto&f=1200x1200'
      ]
    },

    {
      id: 18,
      nom: 'Vélo pliant',
      description: 'Vélo pliant',
      prix: 1599.00,
      imageUrls: 
      [
        'https://dma.canyon.com/image/upload/t_web-p5/w_991,c_fit/b_rgb:F2F2F2/f_auto/q_auto/v1744104233/2026_FULL_endurace_cf-6_4273_R076_P09_mkth9v'
      ]
    },

    {
      id: 19,
      nom: 'Maillot cycliste',
      description: 'Maillot cycliste',
      prix: 57.50,
      imageUrls: 
      [
        'https://maillotcycliste-vintage.fr/cdn/shop/products/Bic_Pen_Retro_Long_sleeve_Cycling_Jersey_1__00721.1510063468_f1668d7c-15ba-43b6-9c0e-b62150e0ecdc_500x.jpg?v=1601881886'
      ]
    },

    {
      id: 20,
      nom: 'Short vélo',
      description: 'Short vélo',
      prix: 44.95,
      imageUrls: 
      [
        'https://i0.wp.com/wodandgo.com/wp-content/uploads/2024/04/Pack-Blackgrip.webp?fit=768%2C1152&ssl=1'
      ]
    },

    {
      id: 30,
      nom: 'Porte-bidon',
      description: 'Porte-bidon',
      prix: 9.80,
      imageUrls: 
      [
        'https://contents.mediadecathlon.com/p744984/k$590ff9496690762fd130c68933e1ea28/sq/porte-bidon-velo-custom-race-noir.jpg?format=auto&f=1200x1200'
      ]
    }
  ];

  getProduits(): Produit[] {
    return this.produits;
  }
}

/*{ id: 21, nom: 'Cuissard', description: 'Cuissard', prix: 149.78, imageUrl: 'https://via.placeholder.com/300x200?text=Cuissard' },
    
    { id: 22, nom: 'Trousse outils', description: 'Trousse outils', prix: 61.64, imageUrl: 'https://via.placeholder.com/300x200?text=Trousse%2Foutils' },
    
    { id: 23, nom: 'Chambre à air', description: 'Chambre à air', prix: 53.07, imageUrl: 'https://via.placeholder.com/300x200?text=Chambre%2F%C3%A0%2Fair' },
    
    { id: 24, nom:'Pneu route', description:'Pneu route', prix : 259.39, imageUrl:'https://via.placeholder.com/300x2
    
    { id: 28, nom: 'Lunettes vélo', description: 'Lunettes vélo', prix: 238.44, imageUrl: 'https://via.placeholder.com/300x200?text=Lunettes%20v%C3%A9lo' },
    
    { id: 29, nom: 'Béquille', description: 'Béquille', prix: 56.46, imageUrl: 'https://via.placeholder.com/300x200?text=B%C3%A9quille' },*/

