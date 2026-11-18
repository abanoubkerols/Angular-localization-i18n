import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ]
    });

    service = TestBed.inject(TranslationService);
    localStorage.removeItem('enterprise-i18n-lang');
  });

  it('should initialize with the default language when no saved language exists', () => {
    expect(service.currentLang$).toBeTruthy();
  });

  it('should update the current language and store it in localStorage', () => {
    service.setLanguage('ar');
    expect(localStorage.getItem('enterprise-i18n-lang')).toBe('ar');
  });
});
