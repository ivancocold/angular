import { Component, OnInit } from '@angular/core';
import { CatalogueService, Produit } from '../../services/catalogue.service';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {
  produits: Produit[] = [];

  constructor
  (
    private catalogueService: CatalogueService,
    private panier: PanierService
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
    alert(`“${produit.nom}” a été ajouté au panier !`);
  }
}
