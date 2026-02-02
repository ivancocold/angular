import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CatalogueService, Produit } from '../../services/catalogue/catalogue.service';
import { PanierService } from '../../services/panier/panier.service';
import { isPositivePrice } from '../../services/catalogue/catalogue.service';


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
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit, OnDestroy {

  // Ajuster ici pour accélérer / ralentir le scroll via CSS var()
  scrollDuration = '25s';

  // ---- Carrousel ----
  private carouselTimer?: number;
  private readonly SWITCH_MS = 5000; // 5s par image
  readonly FADE_MS = 700;            // durée du fondu (utile aussi côté CSS)

  /**
   * État par produit :
   * - currentIdx: index affiché
   * - prevIdx: index précédent (pour crossfade)
   * - transitioning: true pendant le fondu
   */
  private imgState = new Map<number,
  {
    currentIdx: number;
    prevIdx: number;
    transitioning: boolean;
    timeoutId?: number;
  }>();

  

  // ➜ Déclaration des cartes KPI
  cards: KpiCard[] = [
    { label: 'Articles', icon: '📦', fmt: 'int', value: () => this.count() },
    { label: 'Prix moyen', icon: '💶', fmt: 'dec', value: () => this.avgPrice(), suffix: ' €' },
    { label: 'Prix à partir de', icon: '⬇️', fmt: 'dec', value: () => this.minPrice(), suffix: ' €' },
    { label: 'Prix maximal', icon: '⬆️', fmt: 'dec', value: () => this.maxPrice(), suffix: ' €' },
    { label: 'Valorisation du stock', icon: '💼', fmt: 'dec', value: () => this.totalValue(), suffix: ' €' },
  ];

  trackByLabel = (_: number, c: KpiCard) => c.label;
  trackById = (_: number, p: Produit) => p.id;

  produits = signal<Produit[]>([]);
  

  // --- KPI calculés ---
  count = computed(() => this.produits().filter(p => isPositivePrice(p.prix)).length);

  totalValue = computed(() =>
    this.produits().filter(p => isPositivePrice(p.prix)).reduce((sum, p) => sum + (Number(p.prix*(p.quantite_en_stock ?? 100)) || 0), 0)
  );

  //avgPrice = computed(() => (this.count() ? this.totalValue() / this.count() : 0));

  avgPrice = computed(() => (this.count() ? this.produits().filter(p => isPositivePrice(p.prix)).reduce((sum, p) => sum + (p.prix || 0), 0) / this.count() : 0));

  minPrice = computed(() =>
    this.count() ? Math.min(...this.produits().filter(p => isPositivePrice(p.prix)).map(p => Number(p.prix) || 0)) : 0
  );

  maxPrice = computed(() =>
    this.count() ? Math.max(...this.produits().filter(p => isPositivePrice(p.prix)).map(p => Number(p.prix) || 0)) : 0
  );

  // Produits mis en avant: top 3 par prix (décroissant)
  featured = computed<Produit[]>(() =>
    [...this.produits()].filter(p => isPositivePrice(p.prix)).sort((a, b) => (b.prix || 0) - (a.prix || 0)).slice(0, 3)
  );

  constructor(
    private catalogue: CatalogueService,
    private panier: PanierService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.catalogue.getProduits$().subscribe(data => {
      this.produits.set(data);

      // init state pour tous les produits
      for (const p of data) {
        this.imgState.set(p.id, { currentIdx: 0, prevIdx: 0, transitioning: false });
      }

      // carrousel auto : toutes les 5 secondes sur les featured
      this.carouselTimer = window.setInterval(() => {
        for (const p of this.featured()) {
          this.advanceImage(p);
        }
      }, this.SWITCH_MS);
    });
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) window.clearInterval(this.carouselTimer);

    // cleanup timeouts (fin de transition)
    for (const st of this.imgState.values()) {
      if (st.timeoutId) window.clearTimeout(st.timeoutId);
    }
  }

  // -----------------------------
  // ✅ API images pour le template
  // -----------------------------

  /** true pendant le fondu (utile pour ajouter une classe CSS) */
  isTransitioning(p: Produit): boolean {
    return this.imgState.get(p.id)?.transitioning ?? false;
  }

  /** URL de l'image précédente (pour crossfade) */
  prevImage(p: Produit): string {
    const urls = p.imageUrls ?? [];
    if (urls.length === 0) return '';

    const st = this.imgState.get(p.id);
    const idx = st?.prevIdx ?? 0;
    return urls[idx] ?? urls[0];
  }

  /** URL de l'image courante (celle affichée) */
  currentImage(p: Produit): string {
    const urls = p.imageUrls ?? [];
    if (urls.length === 0) return '';

    const st = this.imgState.get(p.id);
    const idx = st?.currentIdx ?? 0;
    return urls[idx] ?? urls[0];
  }

  /** Fallback si jamais url vide */
  primaryImage(url: string): string {
    return url || '';
  }

  // -----------------------------
  // ✅ Mécanique interne carrousel
  // -----------------------------

  private advanceImage(p: Produit): void {
    const urls = p.imageUrls ?? [];
    if (urls.length <= 1) return;

    const st = this.imgState.get(p.id) ?? { currentIdx: 0, prevIdx: 0, transitioning: false };

    // évite de relancer une transition si elle est déjà en cours
    if (st.transitioning) return;

    const next = (st.currentIdx + 1) % urls.length;

    st.prevIdx = st.currentIdx;
    st.currentIdx = next;
    st.transitioning = true;

    // stop timeout précédent si existait
    if (st.timeoutId) window.clearTimeout(st.timeoutId);

    // fin de transition après FADE_MS
    st.timeoutId = window.setTimeout(() => {
      const s = this.imgState.get(p.id);
      if (!s) return;
      s.transitioning = false;
    }, this.FADE_MS);

    this.imgState.set(p.id, st);
  }

  // -----------------------------
  // Panier
  // -----------------------------
  AjouterAuPanier(produit: Produit): void 
  {
    // Guard prix
    if (!isPositivePrice(produit.prix))
      {
        this.snackBar.open(`Prix invalide pour "${produit.nom}"`, 'OK', { duration: 2500 });
        return;
      }

    try 
    {

      this.panier.add(produit, 1);

      this.snackBar.open
      (
        `"${produit.nom}" a été ajouté au panier !`, 'OK',
        {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        }
      );
    }
    catch (e)
    {
      const msg = e instanceof Error ? e.message : 'Erreur lors de l’ajout au panier';
      this.snackBar.open(msg, 'OK', { duration: 2500 });
    }
  }
}
