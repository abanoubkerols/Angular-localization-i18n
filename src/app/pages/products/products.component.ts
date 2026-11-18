import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormInputComponent } from '../../shared/components/form-input/form-input.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { TranslationService } from '../../core/translation.service';

interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, FormInputComponent, PrimaryButtonComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  search = '';
  products: Product[] = [
    { id: 'alpha', name: 'Apollo Laptop', price: 1299 },
    { id: 'beta', name: 'Orion Tablet', price: 799 },
    { id: 'gamma', name: 'Helios Headphones', price: 199 }
  ];

  constructor(private router: Router, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.loadFeatureTranslations('products').subscribe();
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      this.search.length === 0 || product.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  navigateToProduct(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }
}
