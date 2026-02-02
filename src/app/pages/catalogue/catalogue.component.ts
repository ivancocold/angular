import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogueService, Produit } from '../../services/catalogue/catalogue.service';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier/panier.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit, OnDestroy {
  produits: Produit[] = [];

  private imageIndexByProductId = new Map<number, number>();
  private intervalByProductId = new Map<number, number>();
  private hovered = new Set<number>();

  constructor(
    private catalogueService: CatalogueService,
    private panier: PanierService,
    private snackBar: MatSnackBar,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.catalogueService.getProduits$().subscribe(produits => {
      this.produits = produits;

      // démarre autoplay pour chaque produit qui a > 1 image
      for (const p of this.produits) {
        if ((p.imageUrls?.length ?? 0) > 1) this.startAutoplay(p);
      }
    });
  }

  ngOnDestroy(): void {
    for (const handle of this.intervalByProductId.values()) clearInterval(handle);
    this.intervalByProductId.clear();
  }

  trackById = (_: number, p: Produit) => p.id;

  // --- Autoplay + hover ---
  onHoverStart(id: number) { this.hovered.add(id); }
  onHoverEnd(id: number) { this.hovered.delete(id); }

  private startAutoplay(p: Produit): void {
    if (this.intervalByProductId.has(p.id)) return;

    const handle = window.setInterval(() => {
      if (this.hovered.has(p.id)) return;
      this.nextImage(p);
    }, 5000);

    this.intervalByProductId.set(p.id, handle);
  }

  // --- Carrousel actions ---
  getIndex(id: number): number {
    return this.imageIndexByProductId.get(id) ?? 0;
  }

  setImage(p: Produit, i: number): void {
    const urls = (p.imageUrls ?? []).filter(Boolean);
    if (!urls.length) return;
    const clamped = Math.max(0, Math.min(i, urls.length - 1));
    this.imageIndexByProductId.set(p.id, clamped);
  }

  nextImage(p: Produit): void {
    const urls = (p.imageUrls ?? []).filter(Boolean);
    if (urls.length <= 1) return;
    const idx = this.getIndex(p.id);
    this.imageIndexByProductId.set(p.id, (idx + 1) % urls.length);
  }

  prevImage(p: Produit): void {
    const urls = (p.imageUrls ?? []).filter(Boolean);
    if (urls.length <= 1) return;
    const idx = this.getIndex(p.id);
    this.imageIndexByProductId.set(p.id, (idx - 1 + urls.length) % urls.length);
  }

  currentImage(p: Produit): string {
    const urls = (p.imageUrls ?? []).filter(Boolean);
    if (!urls.length) return 'assets/placeholder.png';
    const idx = this.getIndex(p.id);
    return urls[Math.min(idx, urls.length - 1)];
  }

  // --- panier ---
    AjouterAuPanier(produit: Produit): void {
    // Log DEV uniquement (ne sortira pas en prod)
    this.logger.debug('[Panier] Ajout produit', { id: produit.id, nom: produit.nom });

    this.panier.add(produit, 1);

    this.snackBar.open(`“${produit.nom}” a été ajouté au panier !`, 'OK', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}