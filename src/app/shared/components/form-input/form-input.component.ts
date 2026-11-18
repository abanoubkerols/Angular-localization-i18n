import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <label class="mb-2 block text-sm font-medium text-slate-700" [for]="id">{{ labelKey | translate }}</label>
    <input
      [id]="id"
      [type]="type"
      class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none"
      [placeholder]="placeholderKey | translate"
      [value]="value"
      (input)="onInput($event.target.value)"
    />
  `
})
export class FormInputComponent {
  @Input() id = 'search-input';
  @Input() labelKey = 'form.search';
  @Input() placeholderKey = 'form.placeholder';
  @Input() type: 'text' | 'search' = 'search';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(value: string): void {
    this.valueChange.emit(value);
  }
}
