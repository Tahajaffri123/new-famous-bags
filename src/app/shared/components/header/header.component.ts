import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <a routerLink="/" class="text-2xl font-bold text-indigo-600 tracking-tight font-sans">
              Famous Bags
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a routerLink="/" routerLinkActive="text-indigo-600 border-b-2 border-indigo-600" [routerLinkActiveOptions]="{exact: true}" class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
            <a routerLink="/products" routerLinkActive="text-indigo-600 border-b-2 border-indigo-600" class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Shop</a>
            <a routerLink="/about" routerLinkActive="text-indigo-600 border-b-2 border-indigo-600" class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
            <a routerLink="/contact" routerLinkActive="text-indigo-600 border-b-2 border-indigo-600" class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
          </nav>

          <!-- Icons -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            @if (isSearchOpen) {
              <div class="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-100 border border-transparent focus-within:border-indigo-300">
                <mat-icon class="text-gray-400 text-[20px] leading-[20px] w-[20px] h-[20px] mr-2">search</mat-icon>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  class="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder-gray-500 outline-none p-0"
                  (keyup.enter)="onSearch($event)"
                  #searchInput
                >
                <button class="text-gray-400 hover:text-gray-600 ml-1 flex items-center justify-center" (click)="toggleSearch()">
                  <mat-icon class="text-[18px] leading-[18px] w-[18px] h-[18px]">close</mat-icon>
                </button>
              </div>
            } @else {
              <button class="text-gray-500 hover:text-gray-700 p-2 flex items-center justify-center" (click)="toggleSearch()">
                <mat-icon>search</mat-icon>
              </button>
            }
            <a routerLink="/auth/login" class="text-gray-500 hover:text-gray-700 p-2 hidden sm:block">
              <mat-icon>person</mat-icon>
            </a>
            <a routerLink="/cart" class="text-gray-500 hover:text-gray-700 p-2 relative">
              <mat-icon>shopping_cart</mat-icon>
              @if (cartService.totalItems() > 0) {
                <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {{ cartService.totalItems() }}
                </span>
              }
            </a>
            <!-- Mobile menu button -->
            <button class="md:hidden text-gray-500 hover:text-gray-700 p-2" (click)="toggleMobileMenu()">
              <mat-icon>menu</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      @if (isMobileMenuOpen) {
        <div class="md:hidden bg-white border-t border-gray-200">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a routerLink="/" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</a>
            <a routerLink="/products" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Shop</a>
            <a routerLink="/about" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">About</a>
            <a routerLink="/contact" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Contact</a>
            <a routerLink="/auth/login" (click)="toggleMobileMenu()" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Login</a>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  cartService = inject(CartService);
  router = inject(Router);
  
  isMobileMenuOpen = false;
  isSearchOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      setTimeout(() => {
        const input = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
        if (input) input.focus();
      }, 50);
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    if (query) {
      this.router.navigate(['/products'], { queryParams: { search: query } });
      this.isSearchOpen = false;
      input.value = '';
    }
  }
}
