import { Component } from '@angular/core';

interface ContactLink {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  protected readonly links: readonly ContactLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ibai-fuentes-palacios-92b043208/'
    }
  ];

  protected submissionStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submissionStatus = 'loading';

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify({
      ...object,
      access_key: '81efe5cb-5ee8-4694-9da4-64fb4bb904bd' // Reemplazar con la clave de web3forms.com
    });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();
      if (result.success) {
        this.submissionStatus = 'success';
        form.reset();
      } else {
        this.submissionStatus = 'error';
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      this.submissionStatus = 'error';
    }
  }
}
