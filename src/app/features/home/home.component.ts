import { ChangeDetectionStrategy, Component, inject, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { animate, stagger, inView, scroll } from 'motion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <div class="relative bg-gray-900 overflow-hidden h-[700px] flex items-center" #heroSection>
      <div class="absolute inset-0 z-0" #heroBg>
        <img src="https://images.unsplash.com/photo-1490427712608-588e68359dbd?auto=format&fit=crop&w=1920&q=80" alt="Hero background" class="w-full h-[120%] -top-[10%] relative object-cover opacity-50" referrerpolicy="no-referrer" />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-2xl">
          <h1 class="hero-text opacity-0 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-sans drop-shadow-lg">
            Carry Your World in Style
          </h1>
          <p class="hero-text opacity-0 mt-4 text-xl text-gray-200 drop-shadow-md">
            Discover our premium collection of luggage, backpacks, and accessories designed for the modern traveler and everyday explorer.
          </p>
          <div class="hero-text opacity-0 mt-10">
            <a routerLink="/products" class="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 px-8 font-medium text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-12 tracking-tight text-center">Shop by Category</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
        @for (category of categories; track category.name) {
          <a [routerLink]="['/products']" [queryParams]="{category: category.name}" appTilt class="category-card opacity-0 group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-100 block">
            <div class="aspect-w-3 aspect-h-4">
              <img [src]="category.image" [alt]="category.name" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerpolicy="no-referrer" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <h3 class="text-2xl font-bold text-white tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{{ category.name }}</h3>
            </div>
          </a>
        }
      </div>
    </div>

    <!-- Trending Products -->
    <div class="bg-gray-50 py-24 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Trending Now</h2>
          <a routerLink="/products" class="text-indigo-600 hover:text-indigo-800 font-medium group flex items-center">
            View all 
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </a>
        </div>
        
        <div class="trending-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          @for (product of trendingProducts(); track product.id) {
            <div appTilt class="trending-card opacity-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
              <a [routerLink]="['/products', product.id]" class="block relative h-72 overflow-hidden">
                <img [src]="product.imageUrl" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerpolicy="no-referrer" />
                @if (product.isTrending) {
                  <span class="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">HOT</span>
                }
              </a>
              <div class="p-6 flex-grow flex flex-col bg-white relative z-10">
                <p class="text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">{{ product.category }}</p>
                <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
                </h3>
                <div class="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                  <p class="text-xl font-extrabold text-gray-900">{{ product.price | currency }}</p>
                  <div class="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                    <span class="text-yellow-400 text-sm">★</span>
                    <span class="text-sm font-medium text-gray-700 ml-1">{{ product.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Brand Highlights -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div class="highlight-card opacity-0 p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-20 h-20 mx-auto bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 hover:rotate-6 transition-transform">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 class="text-xl font-bold mb-3 text-gray-900">Premium Quality</h3>
          <p class="text-gray-600 leading-relaxed">Crafted with the finest materials for durability and timeless style.</p>
        </div>
        <div class="highlight-card opacity-0 p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-20 h-20 mx-auto bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 -rotate-3 hover:-rotate-6 transition-transform">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
          </div>
          <h3 class="text-xl font-bold mb-3 text-gray-900">Easy Ordering</h3>
          <p class="text-gray-600 leading-relaxed">Simple and secure checkout process. We'll contact you to confirm your order.</p>
        </div>
        <div class="highlight-card opacity-0 p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-20 h-20 mx-auto bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 hover:rotate-6 transition-transform">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 class="text-xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
          <p class="text-gray-600 leading-relaxed">Quick, reliable, and trackable shipping to your doorstep worldwide.</p>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements AfterViewInit {
  private productService = inject(ProductService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroBg') heroBg!: ElementRef<HTMLElement>;

  trendingProducts = this.productService.getTrendingProducts.bind(this.productService);

  categories = [
    { name: 'Luggage', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dce3eb?auto=format&fit=crop&w=400&q=80' },
    { name: 'School Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80' },
    { name: 'Duffle Bags', image: 'https://images.unsplash.com/photo-1550850839-8dc894ed385a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Tote Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80' }
  ];

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Hero text stagger
    animate('.hero-text', 
      { opacity: [0, 1], y: [40, 0] }, 
      { delay: stagger(0.15), duration: 0.8, ease: 'easeOut' }
    );

    // Hero Parallax
    if (this.heroSection && this.heroBg) {
      scroll(
        animate(this.heroBg.nativeElement, { y: ['-15%', '15%'] }),
        { target: this.heroSection.nativeElement, offset: ['start start', 'end start'] }
      );
    }

    // Featured Categories fade in
    inView('.category-card', (element) => {
      animate(element, { opacity: [0, 1], y: [50, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    });

    // Trending products stagger
    inView('.trending-grid', () => {
      animate('.trending-card', 
        { opacity: [0, 1], scale: [0.95, 1], y: [30, 0] }, 
        { delay: stagger(0.1), duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      );
    });

    // Highlights stagger
    inView('.highlight-card', (element) => {
      animate(element, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, ease: 'easeOut' });
    });
  }
}
