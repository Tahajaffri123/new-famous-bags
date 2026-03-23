import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-gray-900 text-white pt-12 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="col-span-1 md:col-span-1">
            <h3 class="text-2xl font-bold text-white mb-4 tracking-tight">Famous Bags</h3>
            <p class="text-gray-400 text-sm mb-4">
              Your ultimate destination for premium quality bags. From luggage to school bags, we carry your world.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Facebook</span>
                <mat-icon>facebook</mat-icon>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Instagram</span>
                <mat-icon>photo_camera</mat-icon>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Twitter</span>
                <mat-icon>flutter_dash</mat-icon>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Shop</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a routerLink="/products" [queryParams]="{category: 'Luggage'}" class="hover:text-white transition-colors">Luggage</a></li>
              <li><a routerLink="/products" [queryParams]="{category: 'School Bags'}" class="hover:text-white transition-colors">School Bags</a></li>
              <li><a routerLink="/products" [queryParams]="{category: 'Duffle Bags'}" class="hover:text-white transition-colors">Duffle Bags</a></li>
              <li><a routerLink="/products" [queryParams]="{category: 'Tote Bags'}" class="hover:text-white transition-colors">Tote Bags</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a routerLink="/about" class="hover:text-white transition-colors">About Us</a></li>
              <li><a routerLink="/contact" class="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Customer Service</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-400">
            &copy; {{ currentYear }} Famous Bags. All rights reserved.
          </p>
          <div class="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
