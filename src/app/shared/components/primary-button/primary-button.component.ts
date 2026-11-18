import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <button
      class="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
      [type]="type"
    >
      {{ labelKey | translate }}
    </button>
  `
})
export class PrimaryButtonComponent {
  @Input() labelKey = 'button.save';
  @Input() type: 'button' | 'submit' = 'button';
}
