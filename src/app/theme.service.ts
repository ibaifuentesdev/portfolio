import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export type ThemeName = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey: string = 'theme';
  private readonly linkElementId: string = 'app-theme';

  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  public getInitialTheme(): ThemeName {
    const savedTheme: ThemeName | null = this.readFromStorage();
    if (savedTheme) {
      return savedTheme;
    }

    const prefersDark: boolean = this.prefersDark();
    return prefersDark ? 'dark' : 'light';
  }

  public applyTheme(theme: ThemeName): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const linkEl: HTMLLinkElement = this.getOrCreateThemeLinkElement();
    linkEl.href = theme === 'dark' ? 'theme-dark.css' : 'theme-light.css';

    this.document.documentElement.setAttribute('data-theme', theme);
    this.writeToStorage(theme);
  }

  public toggleTheme(currentTheme: ThemeName): ThemeName {
    const nextTheme: ThemeName = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    return nextTheme;
  }

  private prefersDark(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
  }

  private readFromStorage(): ThemeName | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const value: string | null = this.document.defaultView?.localStorage.getItem(this.storageKey) ?? null;
    if (value === 'light' || value === 'dark') {
      return value;
    }

    return null;
  }

  private writeToStorage(theme: ThemeName): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.defaultView?.localStorage.setItem(this.storageKey, theme);
  }

  private getOrCreateThemeLinkElement(): HTMLLinkElement {
    const existing: HTMLElement | null = this.document.getElementById(this.linkElementId);
    if (existing && existing instanceof HTMLLinkElement) {
      return existing;
    }

    const linkEl: HTMLLinkElement = this.document.createElement('link');
    linkEl.id = this.linkElementId;
    linkEl.rel = 'stylesheet';

    this.document.head.appendChild(linkEl);

    return linkEl;
  }
}
