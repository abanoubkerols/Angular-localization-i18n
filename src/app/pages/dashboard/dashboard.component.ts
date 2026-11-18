import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, PrimaryButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = 'Sara';
  totalProducts = 18;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.loadFeatureTranslations('dashboard').subscribe();
  }
}
