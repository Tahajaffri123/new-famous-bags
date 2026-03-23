import { ChangeDetectionStrategy, Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate, stagger, inView, scroll } from 'motion';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white overflow-hidden">
      <!-- Hero Section -->
      <div class="relative py-32 bg-gray-900 text-white text-center flex items-center justify-center min-h-[70vh] overflow-hidden" #aboutHero>
        <div class="absolute inset-0 z-0" #aboutBg>
          <img src="https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1920&q=80" alt="About Us" class="w-full h-[130%] -top-[15%] absolute object-cover opacity-40" referrerpolicy="no-referrer" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80 z-0"></div>
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <p class="about-text opacity-0 text-indigo-400 font-bold tracking-widest uppercase mb-4">Discover Famous Bags</p>
          <h1 class="about-text opacity-0 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 drop-shadow-lg text-white">Crafting Journeys Since 2010</h1>
          <p class="about-text opacity-0 text-xl sm:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto">
            We believe every journey deserves a reliable companion. Our bags are designed to carry your world in style.
          </p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-indigo-600 py-12 relative z-20 -mt-12 mx-4 sm:mx-8 lg:mx-16 rounded-3xl shadow-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-indigo-500/50">
            <div class="stat-item opacity-0">
              <p class="text-4xl font-extrabold text-white mb-2">12+</p>
              <p class="text-indigo-200 font-medium text-sm uppercase tracking-wider">Years of Excellence</p>
            </div>
            <div class="stat-item opacity-0">
              <p class="text-4xl font-extrabold text-white mb-2">50k+</p>
              <p class="text-indigo-200 font-medium text-sm uppercase tracking-wider">Happy Customers</p>
            </div>
            <div class="stat-item opacity-0">
              <p class="text-4xl font-extrabold text-white mb-2">15</p>
              <p class="text-indigo-200 font-medium text-sm uppercase tracking-wider">Retail Stores</p>
            </div>
            <div class="stat-item opacity-0 border-none md:border-solid">
              <p class="text-4xl font-extrabold text-white mb-2">100%</p>
              <p class="text-indigo-200 font-medium text-sm uppercase tracking-wider">Sustainable</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div class="story-content opacity-0 order-2 lg:order-1">
            <h2 class="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Story</h2>
            <h3 class="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
              From a small workshop to a global brand.
            </h3>
            <div class="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
              <p>
                What started as a small workshop in a bustling city has grown into a globally recognized brand. At Famous Bags, we believe that a bag is more than just a container; it's a statement of style, a reliable partner, and a keeper of your most treasured belongings.
              </p>
              <p>
                Our founders, passionate travelers themselves, realized the need for bags that could withstand the rigors of travel without compromising on elegance. Thus, Famous Bags was born with a simple mission: to create the perfect travel companion.
              </p>
              <p>
                Today, we continue to innovate, blending traditional craftsmanship with modern materials to bring you products that are as durable as they are beautiful.
              </p>
            </div>
            <div class="mt-10 flex items-center space-x-6">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Founder" class="w-16 h-16 rounded-full object-cover shadow-md" referrerpolicy="no-referrer" />
              <div>
                <p class="text-lg font-bold text-gray-900">Jane Doe</p>
                <p class="text-sm text-gray-500">Founder & CEO</p>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2 relative">
            <div class="aspect-w-4 aspect-h-5 rounded-3xl overflow-hidden shadow-2xl">
              <img appTilt src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80" alt="Craftsmanship" class="story-img opacity-0 w-full h-full object-cover" referrerpolicy="no-referrer" />
            </div>
            <div class="absolute -bottom-12 -left-12 w-2/3 aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden shadow-2xl border-8 border-white hidden md:block z-10">
              <img appTilt src="https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=600&q=80" alt="Design" class="story-img-small opacity-0 w-full h-full object-cover" referrerpolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mission Section -->
      <div class="bg-gray-900 text-white py-24 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <svg class="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" stroke-width="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 class="mission-text opacity-0 text-3xl md:text-5xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
            "To inspire and equip the modern explorer with thoughtfully designed, sustainable, and enduring gear."
          </h2>
          <p class="mission-text opacity-0 text-xl text-gray-400 font-light tracking-widest uppercase text-sm">Our Mission Statement</p>
        </div>
      </div>

      <!-- Values Section -->
      <div class="bg-gray-50 py-24 lg:py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-20">
            <h2 class="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Core Values</h2>
            <h3 class="text-4xl font-extrabold text-gray-900 tracking-tight">The principles that guide us</h3>
          </div>
          
          <div class="values-grid grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            <div class="value-card opacity-0 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
              </div>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Quality First</h4>
              <p class="text-gray-600 leading-relaxed font-light">We never compromise on materials or craftsmanship. Every stitch is a testament to our commitment to excellence.</p>
            </div>
            <div class="value-card opacity-0 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Sustainable</h4>
              <p class="text-gray-600 leading-relaxed font-light">We are dedicated to minimizing our environmental footprint through responsible sourcing and eco-friendly packaging.</p>
            </div>
            <div class="value-card opacity-0 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Customer Delight</h4>
              <p class="text-gray-600 leading-relaxed font-light">Your satisfaction is our ultimate goal. We strive to provide an exceptional experience from browsing to unboxing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('aboutHero') aboutHero!: ElementRef<HTMLElement>;
  @ViewChild('aboutBg') aboutBg!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    animate('.about-text', { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.15), duration: 0.8, ease: 'easeOut' });
    
    if (this.aboutHero && this.aboutBg) {
      scroll(
        animate(this.aboutBg.nativeElement, { y: ['-15%', '15%'] }),
        { target: this.aboutHero.nativeElement, offset: ['start start', 'end start'] }
      );
    }

    inView('.stat-item', () => {
      animate('.stat-item', { opacity: [0, 1], scale: [0.9, 1] }, { delay: stagger(0.1), duration: 0.6, ease: 'easeOut' });
    });

    inView('.story-content', (element) => {
      animate(element, { opacity: [0, 1], x: [-40, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    });

    inView('.story-img', (element) => {
      animate(element, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    });

    inView('.story-img-small', (element) => {
      animate(element, { opacity: [0, 1], x: [-30, 0], y: [30, 0] }, { delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    });

    inView('.mission-text', () => {
      animate('.mission-text', { opacity: [0, 1], y: [30, 0] }, { delay: stagger(0.2), duration: 0.8, ease: 'easeOut' });
    });

    inView('.values-grid', () => {
      animate('.value-card', { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.15), duration: 0.6, ease: 'easeOut' });
    });
  }
}
