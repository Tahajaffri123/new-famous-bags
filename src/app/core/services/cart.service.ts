import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  readonly cartItems = this.cartItemsSignal.asReadonly();
  
  readonly totalItems = computed(() => 
    this.cartItemsSignal().reduce((total, item) => total + item.quantity, 0)
  );

  readonly subtotal = computed(() => 
    this.cartItemsSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  readonly tax = computed(() => this.subtotal() * 0.08); // 8% tax
  
  readonly total = computed(() => this.subtotal() + this.tax());

  addToCart(product: Product, quantity = 1) {
    this.cartItemsSignal.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { product, quantity }];
    });
  }

  removeFromCart(productId: string) {
    this.cartItemsSignal.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItemsSignal.update(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart() {
    this.cartItemsSignal.set([]);
  }
}
