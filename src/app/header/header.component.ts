import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
