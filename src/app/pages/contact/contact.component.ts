import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component(
  {
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
  })
export class ContactComponent
{
  formData = 
  {
    name: '',
    email: '',
    message: ''
  };
  successMessage = 'Merci pour votre message qui a été envoyé avec succès. ✅ '; // ✅ Message de confirmation
  errorMessage = 'Erreur lors de l’envoi du message. ⚠️';   // ⚠️ Message d’erreur éventuel

  constructor(private http: HttpClient) {}

  onSubmit(form: any) 
  {
    if (form.invalid) 
      {
      Object.values(form.controls).forEach((c: any) => c.markAsTouched());
      return;
      }

    this.http.post('http://localhost:3000/contact', this.formData).subscribe(
    {
      next: () => 
        {
        this.successMessage = '✅ Votre message a bien été envoyé !';
        this.errorMessage = '';
        form.resetForm();

        // Efface la bannière après 3 secondes
        setTimeout(() => (this.successMessage = ''), 3000);
        },
      error: (err) =>
        {
        console.error('Erreur envoi message :', err);
        this.errorMessage = '❌ Une erreur est survenue. Veuillez réessayer.';
        this.successMessage = '';

        // Efface la bannière après 3 secondes
        setTimeout(() => (this.errorMessage = ''), 3000);
        }
    })

  }
}
