import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation-wrapper';
import { CheckCircle, Sparkles, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30 dark:from-neutral-950 dark:via-primary-950/20 dark:to-accent-950/20 py-20 sm:py-32">
      {/* Enhanced Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-400/40 to-primary-600/40 dark:from-primary-600/30 dark:to-primary-800/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-400/40 to-accent-600/40 dark:from-accent-600/30 dark:to-accent-800/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-300/20 to-accent-300/20 dark:from-primary-700/10 dark:to-accent-700/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <ScrollAnimationWrapper animation="slide-up" delay={100}>
            <div className="text-center lg:text-left">
              {/* Enhanced Badge with Gradient Border */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-950 dark:to-accent-950 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6 shadow-lg border border-primary-200 dark:border-primary-800 animate-fade-in">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>✨ Modern Task Management</span>
              </div>

              {/* Enhanced Headline with Better Gradient */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-6 leading-tight">
                Organize Your Life,{' '}
                <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent animate-gradient">
                  One Task at a Time
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                A beautiful, intuitive todo app with dark mode, smart organization, and seamless sync. Stay productive and focused on what matters most.
              </p>

              {/* Feature Highlights */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success-600" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Dark mode support
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success-600" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Smart organization
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success-600" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Real-time sync
                  </span>
                </div>
              </div>

              {/* Enhanced CTA Buttons with Gradient */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/register">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    <Zap className="h-5 w-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:border-primary-400 dark:hover:border-primary-600">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Right: Enhanced Hero Image/Illustration */}
          <ScrollAnimationWrapper animation="scale-in" delay={300}>
            <div className="relative">
              {/* Enhanced Dashboard Preview with Glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-primary-200/50 dark:border-primary-800/50 backdrop-blur-sm">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 via-purple-100 to-accent-100 dark:from-primary-950 dark:via-purple-950 dark:to-accent-950 flex items-center justify-center p-8">
                  {/* Mock Dashboard Preview with Better Design */}
                  <div className="w-full h-full space-y-4">
                    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-xl p-5 shadow-xl border border-primary-200/30 dark:border-primary-800/30 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-success-500 to-success-600" />
                        <div className="h-3 bg-gradient-to-r from-neutral-300 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded w-3/4" />
                      </div>
                      <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded w-1/2" />
                    </div>
                    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-xl p-5 shadow-xl border border-accent-200/30 dark:border-accent-800/30 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-warning-500 to-warning-600" />
                        <div className="h-3 bg-gradient-to-r from-neutral-300 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded w-2/3" />
                      </div>
                      <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded w-1/3" />
                    </div>
                    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-xl p-5 shadow-xl border border-primary-200/30 dark:border-primary-800/30 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" />
                        <div className="h-3 bg-gradient-to-r from-neutral-300 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded w-5/6" />
                      </div>
                      <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded w-2/5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};
