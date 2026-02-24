import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeName, ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  protected theme: ThemeName;

  public constructor(private readonly themeService: ThemeService) {
    this.theme = this.themeService.getInitialTheme();
    this.themeService.applyTheme(this.theme);
  }

  protected toggleTheme(): void {
    this.theme = this.themeService.toggleTheme(this.theme);
  }
}
