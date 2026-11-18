import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { TranslationService } from '../../core/translation.service';

interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, PrimaryButtonComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  products: Product[] = [
    { id: 'alpha', name: 'Apollo Laptop', price: 1299 },
    { id: 'beta', name: 'Orion Tablet', price: 799 },
    { id: 'gamma', name: 'Helios Headphones', price: 199 }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.loadFeatureTranslations('products').subscribe();
    const productId = this.route.snapshot.paramMap.get('id');
    this.product = this.products.find(item => item.id === productId) ?? this.products[0];
  }

  backToList(): void {
    this.router.navigate(['/products']);
  }
}
