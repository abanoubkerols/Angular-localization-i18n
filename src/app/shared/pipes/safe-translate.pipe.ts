import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'safeTranslate',
  standalone: true,
  pure: false
})
export class SafeTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(key: string, params?: Record<string, unknown>): string {
    const translated = this.translate.instant(key, params);
    return translated && translated !== key ? translated : `[missing:${key}]`;
  }
}
