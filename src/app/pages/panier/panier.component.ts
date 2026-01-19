import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { PanierService, PanierItem } from '../../services/panier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgOptimizedImage],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})

export class PanierComponent {
  items$!: Observable<PanierItem[]>;

  constructor(private panier: PanierService) 
  {
    this.items$ = this.panier.items$;
  }
  
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
