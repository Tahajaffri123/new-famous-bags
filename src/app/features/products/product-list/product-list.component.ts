import { ChangeDetectionStrategy, Component, computed, inject, signal, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { TiltDirective } from '../../../shared/directives/tilt.directive';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, MatIconModule, MatSnackBarModule, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gray-50 min-h-screen pb-24">
      <!-- Header Banner -->
      <div class="bg-white border-b border-gray-200 py-12 mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">
            @if (searchQuery()) {
              Search Results for "{{ searchQuery() }}"
            } @else {
              {{ selectedCategory() ? selectedCategory() : 'All Collection' }}
            }
          </h1>
          <p class="mt-4 text-lg text-gray-500 max-w-2xl">
            @if (searchQuery()) {
              Found {{ filteredProducts().length }} products matching your search.
            } @else {
              Explore our meticulously crafted bags designed to elevate your everyday carry.
            }
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div class="text-sm text-gray-500 font-medium">
            Showing {{ filteredProducts().length }} products
          </div>
          
          <div class="mt-4 md:mt-0 flex items-center space-x-6">
            <!-- View Toggle -->
            <div class="flex bg-gray-100 rounded-lg p-1">
              <button (click)="setViewMode('grid')" [class.bg-white]="viewMode() === 'grid'" [class.shadow-sm]="viewMode() === 'grid'" [class.text-indigo-600]="viewMode() === 'grid'" class="p-2 rounded-md text-gray-500 hover:text-gray-900 transition-all">
                <mat-icon class="text-sm block">grid_view</mat-icon>
              </button>
              <button (click)="setViewMode('list')" [class.bg-white]="viewMode() === 'list'" [class.shadow-sm]="viewMode() === 'list'" [class.text-indigo-600]="viewMode() === 'list'" class="p-2 rounded-md text-gray-500 hover:text-gray-900 transition-all">
                <mat-icon class="text-sm block">view_list</mat-icon>
              </button>
            </div>
            
            <!-- Sort -->
            <div class="relative">
              <select (change)="onSortChange($event)" class="appearance-none block w-full pl-4 pr-10 py-2.5 text-sm font-medium bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-colors cursor-pointer">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <mat-icon class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">expand_more</mat-icon>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
          <!-- Sidebar Filters -->
          <div class="w-full md:w-64 flex-shrink-0">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
              <h3 class="text-lg font-bold text-gray-900 mb-6">Categories</h3>
              <ul class="space-y-4">
                <li>
                  <button (click)="setCategory(null)" [class.text-indigo-600]="!selectedCategory()" [class.font-bold]="!selectedCategory()" class="text-gray-600 hover:text-indigo-600 transition-colors flex items-center w-full group">
                    <span class="w-1.5 h-1.5 rounded-full mr-3 transition-colors" [class.bg-indigo-600]="!selectedCategory()" [class.bg-transparent]="selectedCategory()" [class.group-hover:bg-indigo-300]="selectedCategory()"></span>
                    All Categories
                  </button>
                </li>
                @for (category of categories(); track category) {
                  <li>
                    <button (click)="setCategory(category)" [class.text-indigo-600]="selectedCategory() === category" [class.font-bold]="selectedCategory() === category" class="text-gray-600 hover:text-indigo-600 transition-colors flex items-center w-full group">
                      <span class="w-1.5 h-1.5 rounded-full mr-3 transition-colors" [class.bg-indigo-600]="selectedCategory() === category" [class.bg-transparent]="selectedCategory() !== category" [class.group-hover:bg-indigo-300]="selectedCategory() !== category"></span>
                      {{ category }}
                    </button>
                  </li>
                }
              </ul>
            </div>
          </div>

          <!-- Product Grid/List -->
          <div class="flex-grow">
            @if (filteredProducts().length === 0) {
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-24">
                <div class="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <mat-icon class="text-gray-400 text-4xl">inventory_2</mat-icon>
                </div>
                <h3 class="text-xl font-bold text-gray-900">No products found</h3>
                <p class="mt-2 text-gray-500">Try selecting a different category or adjusting filters.</p>
              </div>
            } @else {
              <div class="product-grid" [class]="viewMode() === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000' : 'space-y-6'">
                @for (product of filteredProducts(); track product.id) {
                  @if (viewMode() === 'grid') {
                    <div appTilt class="product-card opacity-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
                      <a [routerLink]="['/products', product.id]" class="block relative h-72 overflow-hidden bg-gray-100">
                        <img [src]="product.imageUrl" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerpolicy="no-referrer" />
                      </a>
                      <div class="p-6 flex-grow flex flex-col bg-white relative z-10">
                        <p class="text-xs text-gray-400 mb-2 uppercase tracking-widest font-semibold">{{ product.category }}</p>
                        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
                        </h3>
                        <div class="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                          <p class="text-xl font-extrabold text-gray-900">{{ product.price | currency }}</p>
                          <button (click)="addToCart(product)" class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg active:scale-90 transition-all duration-200" title="Add to cart">
                            <mat-icon class="text-sm">add_shopping_cart</mat-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  } @else {
                    <div class="product-card opacity-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row group">
                      <a [routerLink]="['/products', product.id]" class="block sm:w-64 h-64 sm:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
                        <img [src]="product.imageUrl" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer" />
                      </a>
                      <div class="p-8 flex-grow flex flex-col justify-between">
                        <div>
                          <p class="text-xs text-gray-400 mb-2 uppercase tracking-widest font-semibold">{{ product.category }}</p>
                          <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                            <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
                          </h3>
                          <p class="text-gray-600 line-clamp-2 mb-6 text-lg font-light">{{ product.description }}</p>
                        </div>
                        <div class="flex justify-between items-center">
                          <div class="flex items-center">
                            <span class="text-2xl font-extrabold text-gray-900 mr-6">{{ product.price | currency }}</span>
                            <div class="flex items-center bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                              <mat-icon class="text-yellow-400 text-sm mr-1">star</mat-icon>
                              {{ product.rating }} <span class="text-gray-400 ml-1">({{ product.reviews }})</span>
                            </div>
                          </div>
                          <button (click)="addToCart(product)" class="px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center">
                            <mat-icon class="mr-2 text-sm">shopping_cart</mat-icon>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductListComponent implements AfterViewInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private snackBar = inject(MatSnackBar);

  viewMode = signal<'grid' | 'list'>('grid');
  selectedCategory = signal<string | null>(null);
  sortBy = signal<string>('popular');
  searchQuery = signal<string>('');

  categories = computed(() => this.productService.getCategories());

  filteredProducts = computed(() => {
    let products = this.productService.products();
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase();
    
    if (category) {
      products = products.filter(p => p.category === category);
    }

    if (query) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    const sort = this.sortBy();
    return [...products].sort((a, b) => {
      switch (sort) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return b.reviews - a.reviews; // popular
      }
    });
  });

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory.set(params['category']);
      }
      
      if (params['search']) {
        this.searchQuery.set(params['search']);
      } else {
        this.searchQuery.set('');
      }
      
      setTimeout(() => this.animateProducts(), 50);
    });
  }

  ngAfterViewInit() {
    this.animateProducts();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
    setTimeout(() => this.animateProducts(), 50); // Re-animate on view mode change
  }

  private router = inject(Router);

  setCategory(category: string | null) {
    this.selectedCategory.set(category);
    this.searchQuery.set('');
    
    // Update URL to reflect category and remove search
    const queryParams: Record<string, string> = {};
    if (category) {
      queryParams['category'] = category;
    }
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortBy.set(select.value);
    setTimeout(() => this.animateProducts(), 50); // Re-animate on sort
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.snackBar.open(`${product.name} added to cart`, 'View Cart', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    }).onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }

  private animateProducts() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    animate('.product-card', 
      { opacity: [0, 1], y: [20, 0] }, 
      { delay: stagger(0.05), duration: 0.4, ease: 'easeOut' }
    );
  }
}
