import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { PanierService, PanierItem } from '../../services/panier.service';
import { Observable, Subscription } from 'rxjs';

@Component
(
  {
    selector: 'app-panier',
    standalone: true,
    imports: [CommonModule, CurrencyPipe, NgOptimizedImage],
    templateUrl: './panier.component.html',
    styleUrl: './panier.component.scss'
  }
)

export class PanierComponent
{
  items$!: Observable<PanierItem[]>;

  // index d'image par produit.id
  private imageIndexByProductId = new Map<number, number>()
  // --- Auto-play ---
  private intervalByProductId = new Map<number, number>();
  private hovered = new Set<number>();
  private itemsSub?: Subscription;

  constructor(private panier: PanierService) 
  {
        this.items$ = this.panier.items$;

    // Démarre/stoppe les timers selon les items présents dans le panier
    this.itemsSub = this.items$.subscribe(items =>
      {
        const ids = new Set(items.map(it => it.produit.id));

        // stop timers qui ne servent plus
        for (const [id, handle] of this.intervalByProductId.entries())
          {
            if (!ids.has(id))
              {
                clearInterval(handle);
                this.intervalByProductId.delete(id);
                this.imageIndexByProductId.delete(id);
                this.hovered.delete(id);
              }
        } 

        // start timers pour les nouveaux produits (si + d'1 image)
        for (const it of items)
          {
            const id = it.produit.id;
            if (!this.intervalByProductId.has(id) && this.getUrls(it).length > 1) 
              {
                this.startAutoplayFor(it);
              }
          }
      });
  }

  ngOnDestroy(): void 
  {
    this.itemsSub?.unsubscribe();
    for (const handle of this.intervalByProductId.values()) clearInterval(handle);
    this.intervalByProductId.clear();
  }
    
  
    // --- Carrousel helpers ---
  getUrls(it: PanierItem): string[]
  {
    const u: any = (it as any).produit?.imageUrls;
    if (!u) return [];
    return Array.isArray(u) ? u.filter(Boolean) : [u].filter(Boolean);
  }

  getIndex(it: PanierItem): number 
  {
    return this.imageIndexByProductId.get(it.produit.id) ?? 0;
  }

  setImage(it: PanierItem, i: number): void 
  {
    const urls = this.getUrls(it);
    if (!urls.length) return;
    const clamped = Math.max(0, Math.min(i, urls.length - 1));
    this.imageIndexByProductId.set(it.produit.id, clamped);
  }

  nextImage(it: PanierItem): void 
  {
    const urls = this.getUrls(it);
    if (urls.length <= 1) return;
    const idx = this.getIndex(it);
    this.imageIndexByProductId.set(it.produit.id, (idx + 1) % urls.length);
  }

  prevImage(it: PanierItem): void 
  {
    const urls = this.getUrls(it);
    if (urls.length <= 1) return;
    const idx = this.getIndex(it);
    this.imageIndexByProductId.set(it.produit.id, (idx - 1 + urls.length) % urls.length);
  }

  currentImage(it: PanierItem): string 
  {
    const urls = this.getUrls(it);
    if (!urls.length) return 'assets/placeholder.png'; // mets ton placeholder si tu veux
    const idx = this.getIndex(it);
    return urls[Math.min(idx, urls.length - 1)];
  }

    // --- Pause au survol ---
  onHoverStart(id: number) { this.hovered.add(id); }
  onHoverEnd(id: number) { this.hovered.delete(id); }

  private startAutoplayFor(it: PanierItem): void {
    const id = it.produit.id;

    // évite tout doublon
    if (this.intervalByProductId.has(id)) return;

    const handle = window.setInterval(() => {
      if (this.hovered.has(id)) return; // pause si hover
      // on avance en utilisant l'item courant (URLs identiques)
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

  pay(): void 
  {
    const total = this.total();

    if (!total || total <= 0) return;

    // PayPal.me attend un montant "12.34" (point), pas "12,34"
    const amount = total.toFixed(2); // ex: "19.90"

    // URL PayPal.me avec devise EUR
    const url = `https://www.paypal.me/ivancorneille/${amount}EUR`;

    // Redirection (propose le paiement sur PayPal)
    window.location.assign(url);

    // Option: ouvrir dans un nouvel onglet
    // window.open(url, '_blank', 'noopener,noreferrer');
  }
}
