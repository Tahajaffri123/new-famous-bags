import { Injectable, signal } from '@angular/core';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly mockProducts: Product[] = [
    {
      id: '1',
      name: 'Classic Leather Tote',
      description: 'A spacious and elegant leather tote bag perfect for everyday use.',
      price: 129.99,
      category: 'Tote Bags',
      imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      reviews: 124,
      stock: 50,
      isTrending: true
    },
    {
      id: '2',
      name: 'Urban Explorer Backpack',
      description: 'Durable school and college backpack with multiple compartments.',
      price: 59.99,
      category: 'School Bags',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
      rating: 4.5,
      reviews: 89,
      stock: 120,
      isTrending: true
    },
    {
      id: '3',
      name: 'Pro Travel Luggage 24"',
      description: 'Hard-shell spinner luggage for smooth and secure travel.',
      price: 189.99,
      category: 'Luggage',
      imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dce3eb?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      reviews: 210,
      stock: 30,
      isTrending: true
    },
    {
      id: '4',
      name: 'Weekend Duffle Bag',
      description: 'Stylish canvas duffle bag for short trips and gym sessions.',
      price: 79.99,
      category: 'Duffle Bags',
      imageUrl: 'https://images.unsplash.com/photo-1550850839-8dc894ed385a?auto=format&fit=crop&w=600&q=80',
      rating: 4.6,
      reviews: 156,
      stock: 85
    },
    {
      id: '5',
      name: 'Premium Trolley Bag',
      description: 'Lightweight and durable trolley bag with TSA lock.',
      price: 149.99,
      category: 'Trolley Bags',
      imageUrl: 'https://images.unsplash.com/photo-1581553680321-4fffae59fdda?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      reviews: 92,
      stock: 40
    },
    {
      id: '6',
      name: 'Minimalist Crossbody',
      description: 'Compact crossbody bag for essentials.',
      price: 45.00,
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
      rating: 4.4,
      reviews: 67,
      stock: 200,
      isTrending: true
    },
    {
      id: '7',
      name: 'Vintage Leather Duffle',
      description: 'Premium full-grain leather duffle bag.',
      price: 249.99,
      category: 'Duffle Bags',
      imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80',
      rating: 5.0,
      reviews: 45,
      stock: 15
    },
    {
      id: '8',
      name: 'Kids School Backpack',
      description: 'Fun and colorful backpack for kids.',
      price: 39.99,
      category: 'School Bags',
      imageUrl: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=600&q=80',
      rating: 4.3,
      reviews: 112,
      stock: 150
    }
  ];

  private productsSignal = signal<Product[]>(this.mockProducts);

  get products() {
    return this.productsSignal.asReadonly();
  }

  getProductById(id: string): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  getTrendingProducts(): Product[] {
    return this.productsSignal().filter(p => p.isTrending);
  }

  getCategories(): string[] {
    return Array.from(new Set(this.productsSignal().map(p => p.category)));
  }
}
