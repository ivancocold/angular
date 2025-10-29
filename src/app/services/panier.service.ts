import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Produit } from '../services/catalogue.service';

export interface PanierItem {
  produit: Produit;
  qty: number;
}

const STORAGE_KEY = 'app.panier.v1';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private readonly _items$ = new BehaviorSubject<PanierItem[]>(this.load());
  readonly items$ = this._items$.asObservable();

  // --- API publique ---

  add(produit: Produit, qty = 1): void {
    const items = [...this._items$.value];
    const i = items.findIndex(it => it.produit.id === produit.id);
    if (i >= 0) {
      items[i] = { ...items[i], qty: items[i].qty + qty };
    } else {
      items.push({ produit, qty });
    }
    this.commit(items);
  }

  remove(productId: number): void {
    const items = this._items$.value.filter(it => it.produit.id !== productId);
    this.commit(items);
  }

  setQty(productId: number, qty: number): void {
    if (qty <= 0) return this.remove(productId);
    const items = this._items$.value.map(it =>
      it.produit.id === productId ? { ...it, qty } : it
    );
    this.commit(items);
  }

  inc(productId: number): void {
    const it = this._items$.value.find(x => x.produit.id === productId);
    if (it) this.setQty(productId, it.qty + 1);
  }

  dec(productId: number): void {
    const it = this._items$.value.find(x => x.produit.id === productId);
    if (it) this.setQty(productId, it.qty - 1);
  }

  clear(): void {
    this.commit([]);
  }

  getCount(): number {
    return this._items$.value.reduce((s, it) => s + it.qty, 0);
  }

  getTotal(): number {
    return this._items$.value.reduce((s, it) => s + it.qty * it.produit.prix, 0);
  }

  // --- Persistance ---

  private commit(items: PanierItem[]) {
    this._items$.next(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private load(): PanierItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PanierItem[]) : [];
    } catch {
      return [];
    }
  }
}
