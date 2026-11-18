import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../core/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <label class="mr-2 text-sm text-slate-700" for="languageSelect">{{ 'nav.selectLanguage' | translate }}</label>
    <select
      id="languageSelect"
      class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none"
      [value]="currentLang"
      (change)="onLanguageChange($event.target.value)"
    >
      <option *ngFor="let item of languages" [value]="item.code">{{ item.label }}</option>
    </select>
  `
})
export class LanguageSwitcherComponent implements OnDestroy {
  languages = this.translationService.supportedLanguages;
  currentLang = this.translationService.currentLanguage;
  private subscription: Subscription;

  constructor(private translationService: TranslationService) {
    this.subscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  onLanguageChange(value: string): void {
    this.translationService.setLanguage(value as any);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
