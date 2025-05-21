import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Formulaire envoyé :', this.formData);
    alert('Merci pour votre message !');
    this.formData = { name: '', email: '', message: '' };
  }
}
