import React from 'react';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation-wrapper';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar: 'SJ',
    content: 'This todo app has completely transformed how I manage my projects. The dark mode is beautiful and the interface is so intuitive. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Developer',
    avatar: 'MC',
    content: 'Finally, a todo app that doesn\'t get in my way. Fast, clean, and the keyboard shortcuts make it perfect for developers. Love the dark theme!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Freelance Designer',
    avatar: 'ER',
    content: 'The design is stunning! I appreciate the attention to detail and smooth animations. It makes task management actually enjoyable.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimationWrapper animation="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Loved by Thousands of Users
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              See what our users have to say about their experience with TodoApp.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimationWrapper
              key={testimonial.name}
              animation="scale-in"
              delay={index * 150}
            >
              <div className="relative p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-xl transition-all duration-300">
                {/* Quote Mark */}
                <div className="absolute top-6 right-6 text-6xl text-primary-100 dark:text-primary-950 font-serif leading-none">
                  "
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-warning-500 text-warning-500"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-neutral-700 dark:text-neutral-300 mb-6 relative z-10">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-50">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
