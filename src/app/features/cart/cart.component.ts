import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Shopping Cart</h1>

        @if (cartService.cartItems().length === 0) {
          <div class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <mat-icon class="text-gray-400 text-4xl">shopping_cart</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p class="text-gray-500 mb-8">Looks like you haven't added any bags to your cart yet.</p>
            <a routerLink="/products" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              Start Shopping
            </a>
          </div>
        } @else {
          <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div class="lg:col-span-8">
              <div class="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                <ul role="list" class="divide-y divide-gray-200">
                  @for (item of cartService.cartItems(); track item.product.id) {
                    <li class="flex py-6 px-4 sm:px-6">
                      <div class="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden">
                        <img [src]="item.product.imageUrl" [alt]="item.product.name" class="w-full h-full object-center object-cover" referrerpolicy="no-referrer" />
                      </div>

                      <div class="ml-4 flex-1 flex flex-col justify-between">
                        <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div class="flex justify-between">
                              <h3 class="text-sm sm:text-base font-medium text-gray-900">
                                <a [routerLink]="['/products', item.product.id]">{{ item.product.name }}</a>
                              </h3>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">{{ item.product.category }}</p>
                            <p class="mt-1 text-sm font-medium text-gray-900">{{ item.product.price | currency }}</p>
                          </div>

                          <div class="mt-4 sm:mt-0 sm:pr-9 flex items-center">
                            <label [for]="'quantity-' + item.product.id" class="sr-only">Quantity, {{ item.product.name }}</label>
                            <div class="flex items-center border border-gray-300 rounded-md">
                              <button (click)="updateQuantity(item.product.id, item.quantity - 1)" class="p-1 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors">
                                <mat-icon class="text-sm">remove</mat-icon>
                              </button>
                              <span class="px-2 sm:px-4 py-1 sm:py-2 text-gray-900 font-medium text-sm">{{ item.quantity }}</span>
                              <button (click)="updateQuantity(item.product.id, item.quantity + 1)" [disabled]="item.quantity >= item.product.stock" class="p-1 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50">
                                <mat-icon class="text-sm">add</mat-icon>
                              </button>
                            </div>

                            <div class="absolute top-0 right-0">
                              <button type="button" (click)="removeItem(item.product.id)" class="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors">
                                <span class="sr-only">Remove</span>
                                <mat-icon>close</mat-icon>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div class="mt-4 flex items-center text-sm text-gray-500">
                          <mat-icon class="text-green-500 mr-1 text-sm">check_circle</mat-icon>
                          <span>In stock</span>
                        </div>
                      </div>
                    </li>
                  }
                </ul>
              </div>
            </div>

            <!-- Order summary -->
            <div class="mt-16 bg-white rounded-lg shadow-sm px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Order summary</h2>
              
              <dl class="space-y-4 text-sm text-gray-600">
                <div class="flex justify-between">
                  <dt>Subtotal ({{ cartService.totalItems() }} items)</dt>
                  <dd class="font-medium text-gray-900">{{ cartService.subtotal() | currency }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt>Shipping estimate</dt>
                  <dd class="font-medium text-gray-900">Calculated at checkout</dd>
                </div>
                <div class="flex justify-between">
                  <dt>Tax estimate</dt>
                  <dd class="font-medium text-gray-900">{{ cartService.tax() | currency }}</dd>
                </div>
                <div class="border-t border-gray-200 pt-4 flex justify-between">
                  <dt class="text-base font-medium text-gray-900">Order total</dt>
                  <dd class="text-base font-bold text-gray-900">{{ cartService.total() | currency }}</dd>
                </div>
              </dl>

              <div class="mt-6">
                <a routerLink="/checkout" class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-center items-center transition-colors">
                  Checkout
                </a>
              </div>
              
              <div class="mt-6 text-center">
                <p class="text-sm text-gray-500">
                  or
                  <a routerLink="/products" class="text-indigo-600 font-medium hover:text-indigo-500">
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
