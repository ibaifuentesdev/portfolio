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
}
