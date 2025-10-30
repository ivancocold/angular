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
}
