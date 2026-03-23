import { ChangeDetectionStrategy, Component, computed, inject, signal, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CurrencyPipe, Location, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { CommentService } from '../../../core/services/comment.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TiltDirective } from '../../../shared/directives/tilt.directive';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, MatIconModule, MatSnackBarModule, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gray-50 min-h-screen pb-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button (click)="goBack()" class="flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 mb-8 transition-colors group">
          <mat-icon class="text-sm mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</mat-icon>
          Back to Products
        </button>

        @if (product()) {
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-12">
            <div class="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
              <!-- Image gallery -->
              <div class="flex flex-col-reverse perspective-1000">
                <div appTilt class="detail-image opacity-0 w-full aspect-w-1 aspect-h-1 mt-6 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  <img [src]="product()?.imageUrl" [alt]="product()?.name" class="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-700 ease-out" referrerpolicy="no-referrer" />
                </div>
              </div>

              <!-- Product info -->
              <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <p class="detail-content opacity-0 text-sm text-indigo-600 uppercase tracking-widest font-bold mb-3">{{ product()?.category }}</p>
                <h1 class="detail-content opacity-0 text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{{ product()?.name }}</h1>
                
                <div class="detail-content opacity-0 flex items-center mb-8">
                  <p class="text-3xl font-extrabold text-gray-900 mr-6">{{ product()?.price | currency }}</p>
                  <div class="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                    <mat-icon class="text-yellow-400 text-sm mr-1">star</mat-icon>
                    <span class="text-sm font-medium text-gray-700">{{ product()?.rating }}</span>
                    <span class="text-sm text-gray-400 ml-1">({{ product()?.reviews }} reviews)</span>
                  </div>
                </div>

                <div class="detail-content opacity-0 mb-8">
                  <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Description</h3>
                  <p class="text-lg text-gray-600 font-light leading-relaxed">
                    {{ product()?.description }}
                  </p>
                </div>

                <div class="detail-content opacity-0 mt-10 pt-10 border-t border-gray-100">
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider">Availability</h3>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" [class.bg-green-100]="(product()?.stock ?? 0) > 0" [class.text-green-800]="(product()?.stock ?? 0) > 0" [class.bg-red-100]="(product()?.stock ?? 0) === 0" [class.text-red-800]="(product()?.stock ?? 0) === 0">
                      {{ (product()?.stock ?? 0) > 0 ? 'In Stock' : 'Out of Stock' }}
                    </span>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                      <button (click)="decrementQuantity()" class="p-3 text-gray-500 hover:text-indigo-600 transition-colors" [disabled]="quantity() <= 1">
                        <mat-icon class="text-sm block">remove</mat-icon>
                      </button>
                      <span class="w-12 text-center font-bold text-gray-900">{{ quantity() }}</span>
                      <button (click)="incrementQuantity()" class="p-3 text-gray-500 hover:text-indigo-600 transition-colors" [disabled]="quantity() >= (product()?.stock ?? 0)">
                        <mat-icon class="text-sm block">add</mat-icon>
                      </button>
                    </div>
                    
                    <button (click)="addToCart()" [disabled]="(product()?.stock ?? 0) === 0" class="flex-1 bg-indigo-600 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-bold text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed">
                      <mat-icon class="mr-2">shopping_cart</mat-icon>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div class="mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-12">
            <h2 class="text-2xl font-extrabold text-gray-900 mb-8">Reviews & Comments</h2>
            
            <!-- Add Comment -->
            <div class="mb-10">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    GU
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <form (ngSubmit)="submitComment()" class="relative">
                    <div class="border border-gray-300 rounded-2xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                      <label for="comment" class="sr-only">Add your comment</label>
                      <textarea rows="3" name="comment" id="comment" [ngModel]="newCommentText()" (ngModelChange)="newCommentText.set($event)" class="block w-full py-3 px-4 resize-none border-0 focus:ring-0 sm:text-sm" placeholder="Add your comment..."></textarea>
                    </div>
                    <div class="mt-3 flex justify-end">
                      <button type="submit" [disabled]="!newCommentText().trim()" class="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                        Post Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Comment List -->
            <div class="space-y-8">
              @if (comments().length === 0) {
                <div class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <mat-icon class="text-gray-400 text-4xl mb-2">chat_bubble_outline</mat-icon>
                  <p class="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                </div>
              } @else {
                @for (comment of comments(); track comment.id) {
                  <div class="flex space-x-4">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                        {{ comment.author.charAt(0) }}
                      </div>
                    </div>
                    <div class="flex-grow">
                      <div class="text-sm">
                        <span class="font-bold text-gray-900">{{ comment.author }}</span>
                        <span class="text-gray-500 ml-2">{{ comment.date | date:'mediumDate' }}</span>
                      </div>
                      <div class="mt-1 text-sm text-gray-700">
                        <p>{{ comment.text }}</p>
                      </div>
                      <div class="mt-3 flex items-center space-x-4">
                        <button (click)="upvoteComment(comment.id)" class="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors group">
                          <mat-icon class="text-[18px] mr-1 group-hover:-translate-y-0.5 transition-transform">thumb_up</mat-icon>
                          <span class="font-medium">{{ comment.upvotes }}</span>
                        </button>
                        <button (click)="downvoteComment(comment.id)" class="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors group">
                          <mat-icon class="text-[18px] mr-1 group-hover:translate-y-0.5 transition-transform">thumb_down</mat-icon>
                          <span class="font-medium">{{ comment.downvotes }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              }
            </div>
          </div>
        } @else {
          <div class="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <mat-icon class="text-gray-400 text-6xl mb-4">error_outline</mat-icon>
            <h2 class="text-2xl font-bold text-gray-900">Product Not Found</h2>
            <p class="mt-2 text-gray-500">The product you are looking for does not exist or has been removed.</p>
            <button (click)="goBack()" class="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors">
              Go back to products
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductDetailComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private location = inject(Location);
  private platformId = inject(PLATFORM_ID);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private commentService = inject(CommentService);

  productId = signal<string | null>(null);
  quantity = signal<number>(1);
  newCommentText = signal<string>('');

  product = computed(() => {
    const id = this.productId();
    return id ? this.productService.getProductById(id) : undefined;
  });

  comments = computed(() => {
    const id = this.productId();
    return id ? this.commentService.getCommentsForProduct(id) : [];
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.productId.set(params.get('id'));
      this.quantity.set(1); // Reset quantity when product changes
      setTimeout(() => this.animateContent(), 50);
    });
  }

  ngAfterViewInit() {
    this.animateContent();
  }

  private animateContent() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    animate('.detail-image', { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.6, ease: 'easeOut' });
    animate('.detail-content', { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1), duration: 0.5, ease: 'easeOut' });
  }

  incrementQuantity() {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity() {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  addToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct, this.quantity());
      this.snackBar.open(`${this.quantity()}x ${currentProduct.name} added to cart`, 'View Cart', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      }).onAction().subscribe(() => {
        this.router.navigate(['/cart']);
      });
    }
  }

  submitComment() {
    const text = this.newCommentText().trim();
    const id = this.productId();
    if (text && id) {
      // In a real app, author would come from auth service
      this.commentService.addComment(id, 'Guest User', text);
      this.newCommentText.set('');
      this.snackBar.open('Comment added successfully', 'Close', { duration: 2000, panelClass: ['success-snackbar'] });
    }
  }

  upvoteComment(commentId: string) {
    this.commentService.upvoteComment(commentId);
  }

  downvoteComment(commentId: string) {
    this.commentService.downvoteComment(commentId);
  }

  goBack() {
    this.location.back();
  }
}
