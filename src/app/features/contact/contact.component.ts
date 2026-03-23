import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Get in Touch</h1>
          <p class="mt-4 text-lg text-gray-600">
            Have a question about our products or your order? We're here to help.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div class="bg-gray-50 p-8 rounded-2xl shadow-sm">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            
            @if (submitted) {
              <div class="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                Thank you for your message! We'll get back to you shortly.
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" formControlName="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border" placeholder="Your full name">
                  @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                    <p class="mt-1 text-sm text-red-600">Name is required.</p>
                  }
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border" placeholder="you@example.com">
                  @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                    <p class="mt-1 text-sm text-red-600">Please enter a valid email address.</p>
                  }
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
                  <input type="text" id="subject" formControlName="subject" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border" placeholder="How can we help?">
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" formControlName="message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border" placeholder="Your message here..."></textarea>
                  @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                    <p class="mt-1 text-sm text-red-600">Message is required.</p>
                  }
                </div>

                <button type="submit" [disabled]="contactForm.invalid" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Send Message
                </button>
              </form>
            }
          </div>

          <!-- Contact Info & Map -->
          <div class="space-y-10">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <dl class="space-y-4 text-gray-600">
                <div class="flex items-start">
                  <mat-icon class="text-indigo-600 mr-3">location_on</mat-icon>
                  <dd>123 Bag Street, Fashion District<br>New York, NY 10001</dd>
                </div>
                <div class="flex items-center">
                  <mat-icon class="text-indigo-600 mr-3">phone</mat-icon>
                  <dd>+1 (555) 123-4567</dd>
                </div>
                <div class="flex items-center">
                  <mat-icon class="text-indigo-600 mr-3">email</mat-icon>
                  <dd>support&#64;famousbags.com</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                  <mat-icon>facebook</mat-icon>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                  <mat-icon>photo_camera</mat-icon>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                  <mat-icon>flutter_dash</mat-icon>
                </a>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="bg-gray-200 rounded-lg h-64 w-full flex items-center justify-center relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map location" class="absolute inset-0 w-full h-full object-cover opacity-60" referrerpolicy="no-referrer" />
              <div class="relative z-10 bg-white/90 px-4 py-2 rounded shadow-sm font-medium text-gray-800">
                Google Maps Integration
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  
  submitted = false;
  
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.submitted = true;
      // Reset form after 3 seconds
      setTimeout(() => {
        this.submitted = false;
        this.contactForm.reset();
      }, 3000);
    }
  }
}
