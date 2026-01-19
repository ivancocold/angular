import { Component, OnInit } from '@angular/core';
import { CatalogueService, Produit } from '../../services/catalogue.service';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service';

// ✅ Angular Material Snackbar pour le feedback visuel (éviter les alert() qui nuisent à l'UX)
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalogue',
  //standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {
  produits: Produit[] = [];

  constructor
  (
    private catalogueService: CatalogueService,
    private panier: PanierService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.produits = this.catalogueService.getProduits();
  }
  trackById = (_: number, p: Produit) => p.id;

  AjouterAuPanier(produit: Produit): void
  {
    this.panier.add(produit,1)
    console.log('Ajouter au panier :', produit);
    // Optionnel : petit feedback visuel
    //alert(`“${produit.nom}” a été ajouté au panier !`);

    // ✅ SnackBar non bloquant (remplace alert)
    this.snackBar.open
    (`“${produit.nom}” a été ajouté au panier !`, 'OK',
      { duration: 2000, 
        horizontalPosition: 'right',
        verticalPosition: 'top', 
      }
    );

  }
}
