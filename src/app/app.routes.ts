import { Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { PanierComponent } from './pages/panier/panier.component';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'panier', component: PanierComponent },
  { path: '**', redirectTo: '/accueil' }
];
