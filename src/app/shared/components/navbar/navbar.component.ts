import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LanguageSwitcherComponent],
  template: `
    <header class="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <a routerLink="/dashboard" class="text-lg font-semibold tracking-tight text-slate-900">
            {{ 'app.title' | translate }}
          </a>
          <nav class="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <a routerLink="/dashboard" class="transition hover:text-slate-900">{{ 'nav.dashboard' | translate }}</a>
            <a routerLink="/products" class="transition hover:text-slate-900">{{ 'nav.products' | translate }}</a>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <app-language-switcher></app-language-switcher>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {}
