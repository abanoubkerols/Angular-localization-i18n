import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, tap, catchError } from 'rxjs';

export type SupportedLanguage = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly defaultLanguage: SupportedLanguage = 'en';
  readonly supportedLanguages: Array<{ code: SupportedLanguage; label: string; dir: 'ltr' | 'rtl' }> = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' }
  ];

  private currentLangSubject = new BehaviorSubject<SupportedLanguage>(this.defaultLanguage);
  currentLang$ = this.currentLangSubject.asObservable();

  get currentLanguage(): SupportedLanguage {
    return this.currentLangSubject.value;
  }

  constructor(private translate: TranslateService, private http: HttpClient) {
    this.translate.addLangs(this.supportedLanguages.map(lang => lang.code));
    this.translate.setDefaultLang(this.defaultLanguage);
    this.initializeLanguage();
  }

  initializeLanguage(): void {
    const savedLang = localStorage.getItem('enterprise-i18n-lang') as SupportedLanguage | null;
    const browserLang = (navigator.language || navigator['userLanguage'] || this.defaultLanguage).split('-')[0] as SupportedLanguage;
    const selectedLang = savedLang ?? (this.supportedLanguages.some(lang => lang.code === browserLang) ? browserLang : this.defaultLanguage);
    this.setLanguage(selectedLang);
  }

  setLanguage(lang: SupportedLanguage): void {
    const normalizedLang = this.supportedLanguages.some(item => item.code === lang) ? lang : this.defaultLanguage;
    this.translate.use(normalizedLang).subscribe(() => {
      localStorage.setItem('enterprise-i18n-lang', normalizedLang);
      this.currentLangSubject.next(normalizedLang);
      this.applyDirection(normalizedLang);
    });
  }

  loadFeatureTranslations(feature: string): Observable<unknown> {
    const lang = this.currentLangSubject.value;
    return this.http.get<Record<string, unknown>>(`assets/i18n/${feature}/${lang}.json`).pipe(
      tap(translations => {
        this.translate.setTranslation(lang, translations, true);
      }),
      catchError(() => of({}))
    );
  }

  private applyDirection(lang: SupportedLanguage): void {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
  }
}
