import {Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogueService, Produit } from '../../services/catalogue.service';
import { PanierService } from '../../services/panier.service';

type KpiFmt = 'int' | 'dec';

interface KpiCard {
  label: string;
  icon: string;
  fmt: KpiFmt;
  value: () => number;
  suffix?: string;
}

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {

  // Ajuste si tu veux accélérer / ralentir le scroll via CSS var()
  scrollDuration = '25s';

  // ➜ Déclare les cartes ici
  cards: KpiCard[] = [
    { label: 'Articles', icon: '📦', fmt: 'int', value: () => this.count() },
    { label: 'Prix moyen', icon: '💶', fmt: 'dec', value: () => this.avgPrice(), suffix: ' €' },
    { label: 'Prix à partir de', icon: '⬇️', fmt: 'dec', value: () => this.minPrice(), suffix: ' €' },
    { label: 'Prix maximal', icon: '⬆️', fmt: 'dec', value: () => this.maxPrice(), suffix: ' €' },
    { label: 'Valorisation du stock', icon: '💼', fmt: 'dec', value: () => this.totalValue(), suffix: ' €' },
  ];

  // Optionnel: aide au trackBy
  trackByLabel = (_: number, c: KpiCard) => c.label;
  produits = signal<Produit[]>([]);

  // --- KPI calculés proprement ---
  count = computed(() => this.produits().length);
  totalValue = computed(() =>
    this.produits().reduce((sum, p) => sum + (Number(p.prix) || 0), 0)
  );
  avgPrice = computed(() => (this.count() ? this.totalValue() / this.count() : 0));
  minPrice = computed(() =>
    this.count() ? Math.min(...this.produits().map(p => Number(p.prix) || 0)) : 0
  );
  maxPrice = computed(() =>
    this.count() ? Math.max(...this.produits().map(p => Number(p.prix) || 0)) : 0
  );

  // Produits mis en avant: top 3 par prix (décroissant)
  featured = computed<Produit[]>(() =>
    [...this.produits()].sort((a, b) => (b.prix || 0) - (a.prix || 0)).slice(0, 3)
  );
  
  constructor(
    private catalogue: CatalogueService,
    private panier: PanierService
  ) {}
  
  ngOnInit(): void {
    // Récupération immédiate (synchrone) depuis le service fourni
    const data = this.catalogue.getProduits();
    this.produits.set(data);
  }

  trackById = (_: number, p: Produit) => p.id;

  // Certaines entrées peuvent avoir plusieurs URLs séparées par un point virgule (ex: id 3) -> on prend la 1re
  primaryImage(url: string): string {
    if (!url) return '';
    const first = url.split(';')[0]?.trim();
    return first || url;
  }

  AjouterAuPanier(produit: Produit): void
  {
    this.panier.add(produit,1)
    console.log('Ajouter au panier :', produit);
    // Optionnel : petit feedback visuel
    alert(`“${produit.nom}” a été ajouté au panier !`);
  }

}
