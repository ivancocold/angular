import { Component, OnInit } from '@angular/core';
import { CatalogueService, Produit } from '../../services/catalogue.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private catalogueService: CatalogueService) {}

  ngOnInit(): void {
    this.produits = this.catalogueService.getProduits();
  }

}
