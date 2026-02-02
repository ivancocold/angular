import { Component, OnDestroy, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { PanierService, PanierItem } from '../../services/panier/panier.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgOptimizedImage, RouterModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit, OnDestroy {
  items$!: Observable<PanierItem[]>;

  // index d'image par produit.id
  private imageIndexByProductId = new Map<number, number>();

  // Auto-play
  private intervalByProductId = new Map<number, number>();
  private hovered = new Set<number>();

  private destroyRef = inject(DestroyRef);

  constructor(private panier: PanierService) {}

  ngOnInit(): void {
    this.items$ = this.panier.items$;

    // Abonnement "logique" (timers) proprement nettoyé automatiquement
    this.items$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => {
        const ids = new Set(items.map(it => it.produit.id));

        // Stop timers qui ne servent plus
        for (const [id, handle] of this.intervalByProductId.entries()) {
          if (!ids.has(id)) {
            clearInterval(handle);
            this.intervalByProductId.delete(id);
            this.imageIndexByProductId.delete(id);
            this.hovered.delete(id);
          }
        }

        // Start timers pour les nouveaux produits (si + d'1 image)
        for (const it of items) {
          const id = it.produit.id;
          if (!this.intervalByProductId.has(id) && this.getUrls(it).length > 1) {
            this.startAutoplayFor(it);
          }
        }
      });
  }

  ngOnDestroy(): void {
    // takeUntilDestroyed gère la désinscription. Ici on nettoie les intervals.
    for (const handle of this.intervalByProductId.values()) clearInterval(handle);
    this.intervalByProductId.clear();
  }

  // --- Carrousel helpers ---
  getUrls(it: PanierItem): string[] {
    const u: any = (it as any).produit?.imageUrls;
    if (!u) return [];
    return Array.isArray(u) ? u.filter(Boolean) : [u].filter(Boolean);
  }

  getIndex(it: PanierItem): number {
    return this.imageIndexByProductId.get(it.produit.id) ?? 0;
  }

  setImage(it: PanierItem, i: number): void {
    const urls = this.getUrls(it);
    if (!urls.length) return;
    const clamped = Math.max(0, Math.min(i, urls.length - 1));
    this.imageIndexByProductId.set(it.produit.id, clamped);
  }

  nextImage(it: PanierItem): void {
    const urls = this.getUrls(it);
    if (urls.length <= 1) return;
    const idx = this.getIndex(it);
    this.imageIndexByProductId.set(it.produit.id, (idx + 1) % urls.length);
  }

  prevImage(it: PanierItem): void {
    const urls = this.getUrls(it);
    if (urls.length <= 1) return;
    const idx = this.getIndex(it);
    this.imageIndexByProductId.set(it.produit.id, (idx - 1 + urls.length) % urls.length);
  }

  currentImage(it: PanierItem): string {
    const urls = this.getUrls(it);
    if (!urls.length) return 'assets/placeholder.png';
    const idx = this.getIndex(it);
    return urls[Math.min(idx, urls.length - 1)];
  }

  // --- Pause au survol ---
  onHoverStart(id: number) { this.hovered.add(id); }
  onHoverEnd(id: number) { this.hovered.delete(id); }

  private startAutoplayFor(it: PanierItem): void {
    const id = it.produit.id;
    if (this.intervalByProductId.has(id)) return;

    const handle = window.setInterval(() => {
      if (this.hovered.has(id)) return;
      this.nextImage(it);
    }, 5000);

    this.intervalByProductId.set(id, handle);
  }

  // --- panier ---
  trackById = (_: number, it: PanierItem) => it.produit.id;

  inc(id: number) { this.panier.inc(id); }
  dec(id: number) { this.panier.dec(id); }
  remove(id: number) { this.panier.remove(id); }

  total(): number { return this.panier.getTotal(); }
  count(): number { return this.panier.getCount(); }
  clear() { this.panier.clear(); }

  pay(): void {
    const total = this.total();
    if (!total || total <= 0) return;

    const amount = total.toFixed(2);
    const url = `https://www.paypal.me/ivancorneille/${amount}EUR`;
    window.location.assign(url);
  }
}