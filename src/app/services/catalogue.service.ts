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
    { id: 1, nom: 'Vélo de route', description: 'Description du produit : vélo de route', prix: 132.58, imageUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/bike-1845719_1280.jpg' },
    { id: 2, nom: 'Vélo tout terrain', description: 'Description du produit : vélo tout terrain', prix: 384.99, imageUrl: 'https://via.placeholder.com/300x200?text=V%C3%A9lo%20tout%20terrain' },
    { id: 3, nom: 'Vélo électrique', description: 'Description du produit : vélo électrique', prix: 446.73, imageUrl: 'https://via.placeholder.com/300x200?text=V%C3%A9lo%20%C3%A9lectrique' },
    { id: 4, nom: 'Casque vélo', description: 'Description du produit : casque vélo', prix: 154.77, imageUrl: 'https://via.placeholder.com/300x200?text=Casque%20v%C3%A9lo' },
    { id: 5, nom: 'Gants cyclistes', description: 'Description du produit : gants cyclistes', prix: 24.35, imageUrl: 'https://via.placeholder.com/300x200?text=Gants%20cyclistes' },
    { id: 6, nom: 'Chaussures vélo', description: 'Description du produit : chaussures vélo', prix: 168.01, imageUrl: 'https://via.placeholder.com/300x200?text=Chaussures%20v%C3%A9lo' },
    { id: 7, nom: 'Pédales automatiques', description: 'Description du produit : pédales automatiques', prix: 392.83, imageUrl: 'https://via.placeholder.com/300x200?text=P%C3%A9dales%20automatiques' },
    { id: 8, nom: 'Sacoche de selle', description: 'Description du produit : sacoche de selle', prix: 33.91, imageUrl: 'https://via.placeholder.com/300x200?text=Sacoche%20de%20selle' },
    { id: 9, nom: 'Éclairage avant', description: 'Description du produit : éclairage avant', prix: 126.94, imageUrl: 'https://via.placeholder.com/300x200?text=%C3%89clairage%20avant' },
    { id: 10, nom: 'Éclairage arrière', description: 'Description du produit : éclairage arrière', prix: 173.82, imageUrl: 'https://via.placeholder.com/300x200?text=%C3%89clairage%20arri%C3%A8re' },
    { id: 11, nom: "Bidon d'eau", description: "Description du produit : bidon d'eau", prix: 30.44, imageUrl: 'https://via.placeholder.com/300x200?text=Bidon%20d%27eau' },
    { id: 12, nom: 'Pompe à vélo', description: 'Description du produit : pompe à vélo', prix: 137.66, imageUrl: 'https://via.placeholder.com/300x200?text=Pompe%20%C3%A0%20v%C3%A9lo' },
    { id: 13, nom: 'Antivol U', description: 'Description du produit : antivol u', prix: 332.92, imageUrl: 'https://via.placeholder.com/300x200?text=Antivol%20U' },
    { id: 14, nom: 'Antivol à chaîne', description: 'Description du produit : antivol à chaîne', prix: 250.37, imageUrl: 'https://via.placeholder.com/300x200?text=Antivol%20%C3%A0%20cha%C3%AEne' },
    { id: 15, nom: 'Garde-boue', description: 'Description du produit : garde-boue', prix: 63.66, imageUrl: 'https://via.placeholder.com/300x200?text=Garde-boue' },
    { id: 16, nom: 'Support téléphone', description: 'Description du produit : support téléphone', prix: 31.53, imageUrl: 'https://via.placeholder.com/300x200?text=Support%20t%C3%A9l%C3%A9phone' },
    { id: 17, nom: 'Compteur de vitesse', description: 'Description du produit : compteur de vitesse', prix: 214.61, imageUrl: 'https://via.placeholder.com/300x200?text=Compteur%20de%20vitesse' },
    { id: 18, nom: 'Vélo pliant', description: 'Description du produit : vélo pliant', prix: 368.04, imageUrl: 'https://via.placeholder.com/300x200?text=V%C3%A9lo%20pliant' },
    { id: 19, nom: 'Maillot cycliste', description: 'Description du produit : maillot cycliste', prix: 267.23, imageUrl: 'https://via.placeholder.com/300x200?text=Maillot%20cycliste' },
    { id: 20, nom: 'Short vélo', description: 'Description du produit : short vélo', prix: 53.38, imageUrl: 'https://via.placeholder.com/300x200?text=Short%20v%C3%A9lo' },
    { id: 21, nom: 'Cuissard', description: 'Description du produit : cuissard', prix: 149.78, imageUrl: 'https://via.placeholder.com/300x200?text=Cuissard' },
    { id: 22, nom: 'Trousse outils', description: 'Description du produit : trousse outils', prix: 61.64, imageUrl: 'https://via.placeholder.com/300x200?text=Trousse%20outils' },
    { id: 23, nom: 'Chambre à air', description: 'Description du produit : chambre à air', prix: 53.07, imageUrl: 'https://via.placeholder.com/300x200?text=Chambre%20%C3%A0%20air' },
    { id: 24, nom: 'Pneu route', description: 'Description du produit : pneu route', prix: 259.39, imageUrl: 'https://via.placeholder.com/300x200?text=Pneu%20route' },
    { id: 25, nom: 'Pneu VTT', description: 'Description du produit : pneu vtt', prix: 468.25, imageUrl: 'https://via.placeholder.com/300x200?text=Pneu%20VTT' },
    { id: 26, nom: 'Guidoline', description: 'Description du produit : guidoline', prix: 180.38, imageUrl: 'https://via.placeholder.com/300x200?text=Guidoline' },
    { id: 27, nom: 'Selle confort', description: 'Description du produit : selle confort', prix: 477.63, imageUrl: 'https://via.placeholder.com/300x200?text=Selle%20confort' },
    { id: 28, nom: 'Lunettes vélo', description: 'Description du produit : lunettes vélo', prix: 238.44, imageUrl: 'https://via.placeholder.com/300x200?text=Lunettes%20v%C3%A9lo' },
    { id: 29, nom: 'Béquille', description: 'Description du produit : béquille', prix: 56.46, imageUrl: 'https://via.placeholder.com/300x200?text=B%C3%A9quille' },
    { id: 30, nom: 'Porte-bidon', description: 'Description du produit : porte-bidon', prix: 470.18, imageUrl: 'https://via.placeholder.com/300x200?text=Porte-bidon' }
  ];
  getProduits(): Produit[] {
    return this.produits;
  }
}

