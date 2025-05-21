import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import {CatalogueComponent} from './pages/catalogue/catalogue.component';

export const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'catalogue', component: CatalogueComponent }
];
