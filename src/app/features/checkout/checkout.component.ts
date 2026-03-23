import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        @if (isOrderComplete) {
          <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <mat-icon class="text-green-600 text-4xl">check_circle</mat-icon>
            </div>
            <h1 class="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
            <p class="text-lg text-gray-600 mb-8">Thank you for your purchase. Your order number is #{{ orderNumber }}. We'll email you an order confirmation with details and tracking info.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a routerLink="/" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                Return Home
              </a>
              <a [href]="'https://wa.me/1234567890?text=Hi! I just placed order %23' + orderNumber + ' and wanted to confirm.'" target="_blank" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#25D366] hover:bg-[#128C7E] transition-colors">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        } @else if (cartService.cartItems().length === 0) {
          <div class="text-center py-24">
            <h2 class="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p class="mt-2 text-gray-500">Add some items to your cart before checking out.</p>
            <a routerLink="/products" class="mt-6 inline-block text-indigo-600 font-medium hover:text-indigo-500">Return to Shop</a>
          </div>
        } @else {
          <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div class="lg:col-span-7">
              <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
                <!-- Contact Info -->
                <div class="bg-white shadow-sm sm:rounded-lg p-6 mb-6">
                  <h2 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                  <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div class="sm:col-span-1">
                      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                      <input type="email" id="email" formControlName="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 border">
                    </div>
                    <div class="sm:col-span-1">
                      <label for="mobileNumber" class="block text-sm font-medium text-gray-700">Mobile Number</label>
                      <input type="tel" id="mobileNumber" formControlName="mobileNumber" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 border">
                    </div>
                  </div>
                </div>

                <!-- Shipping Address -->
                <div class="bg-white shadow-sm sm:rounded-lg p-6 mb-6">
                  <h2 class="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
                  <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
                      <input type="text" id="firstName" formControlName="firstName" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 border">
                    </div>
                    <div>
                      <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
                      <input type="text" id="lastName" formControlName="lastName" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 border">
                    </div>
                    <div class="sm:col-span-2">
                      <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                      <input type="text" id="address" formControlName="address" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 border">
                    </div>
                    <div>
                      <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                      <input type="text" id="city" formControlName="city" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 border">
                    </div>
                    <div>
                      <label for="zipCode" class="block text-sm font-medium text-gray-700">Postal code</label>
                      <input type="text" id="zipCode" formControlName="zipCode" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 border">
                    </div>
                  </div>
                </div>

                <!-- Payment section removed -->
                <div class="mt-8">
                  <button type="submit" [disabled]="checkoutForm.invalid || isProcessing" class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex justify-center items-center">
                    @if (isProcessing) {
                      <mat-icon class="animate-spin mr-2">refresh</mat-icon> Processing...
                    } @else {
                      Confirm Order
                    }
                  </button>
                </div>
              </form>
            </div>

            <!-- Order Summary Sidebar -->
            <div class="mt-10 lg:mt-0 lg:col-span-5">
              <div class="bg-white shadow-sm sm:rounded-lg p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <ul role="list" class="divide-y divide-gray-200 mb-6">
                  @for (item of cartService.cartItems(); track item.product.id) {
                    <li class="py-4 flex">
                      <div class="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                        <img [src]="item.product.imageUrl" [alt]="item.product.name" class="w-full h-full object-center object-cover" referrerpolicy="no-referrer" />
                      </div>
                      <div class="ml-4 flex-1 flex flex-col">
                        <div>
                          <div class="flex justify-between text-sm font-medium text-gray-900">
                            <h3 class="line-clamp-1">{{ item.product.name }}</h3>
                            <p class="ml-4">{{ item.product.price * item.quantity | currency }}</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{ item.product.category }}</p>
                        </div>
                        <div class="flex-1 flex items-end justify-between text-sm">
                          <p class="text-gray-500">Qty {{ item.quantity }}</p>
                        </div>
                      </div>
                    </li>
                  }
                </ul>

                <dl class="space-y-4 text-sm text-gray-600 border-t border-gray-200 pt-6">
                  <div class="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd class="font-medium text-gray-900">{{ cartService.subtotal() | currency }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt>Shipping</dt>
                    <dd class="font-medium text-gray-900">Free</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt>Tax</dt>
                    <dd class="font-medium text-gray-900">{{ cartService.tax() | currency }}</dd>
                  </div>
                  <div class="border-t border-gray-200 pt-4 flex justify-between">
                    <dt class="text-base font-medium text-gray-900">Total</dt>
                    <dd class="text-base font-bold text-gray-900">{{ cartService.total() | currency }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private fb = inject(FormBuilder);
  
  isProcessing = false;
  isOrderComplete = false;
  orderNumber = '';

  checkoutForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required]
  });

  async onSubmit() {
    if (this.checkoutForm.valid && this.cartService.cartItems().length > 0) {
      this.isProcessing = true;
      
      const orderData = {
        contact: {
          email: this.checkoutForm.value.email,
          mobileNumber: this.checkoutForm.value.mobileNumber,
        },
        shipping: {
          firstName: this.checkoutForm.value.firstName,
          lastName: this.checkoutForm.value.lastName,
          address: this.checkoutForm.value.address,
          city: this.checkoutForm.value.city,
          zipCode: this.checkoutForm.value.zipCode,
        },
        items: this.cartService.cartItems().map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalPrice: this.cartService.total()
      };

      try {
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/library/d/1Wr7eUWUZ0J8qVkE_REhroicxj7d1XVV9_XYXq9OuVu_b2ntJlESxxR4y/1';
        
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Required for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        });

        this.isProcessing = false;
        this.isOrderComplete = true;
        this.orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
        this.cartService.clearCart();
      } catch (error) {
        console.error('Error submitting order:', error);
        this.isProcessing = false;
        alert('There was an error processing your order. Please try again.');
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
