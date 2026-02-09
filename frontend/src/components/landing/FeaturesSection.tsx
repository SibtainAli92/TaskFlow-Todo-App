import React from 'react';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation-wrapper';
import {
  CheckSquare,
  Palette,
  Zap,
  Shield,
  Cloud,
  Bell
} from 'lucide-react';

const features = [
  {
    icon: CheckSquare,
    title: 'Smart Task Management',
    description: 'Organize tasks with priorities, due dates, and tags. Filter and sort to find what you need instantly.',
    color: 'from-primary-500 to-primary-600',
    bgColor: 'from-primary-50 to-primary-100/50 dark:from-primary-950/50 dark:to-primary-900/30',
  },
  {
    icon: Palette,
    title: 'Beautiful Dark Mode',
    description: 'Seamlessly switch between light and dark themes. Your preference is saved and synced across devices.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100/50 dark:from-purple-950/50 dark:to-purple-900/30',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with modern technology for instant loading and smooth animations. No lag, just productivity.',
    color: 'from-warning-500 to-warning-600',
    bgColor: 'from-warning-50 to-warning-100/50 dark:from-warning-950/50 dark:to-warning-900/30',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. We respect your privacy and never share your information.',
    color: 'from-success-500 to-success-600',
    bgColor: 'from-success-50 to-success-100/50 dark:from-success-950/50 dark:to-success-900/30',
  },
  {
    icon: Cloud,
    title: 'Cloud Sync',
    description: 'Access your tasks from anywhere. Automatic sync keeps everything up-to-date across all devices.',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'from-accent-50 to-accent-100/50 dark:from-accent-950/50 dark:to-accent-900/30',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss a deadline with intelligent notifications. Get reminded at the right time.',
    color: 'from-error-500 to-error-600',
    bgColor: 'from-error-50 to-error-100/50 dark:from-error-950/50 dark:to-error-900/30',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 sm:py-32 bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-950 dark:to-neutral-900/50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-300/20 to-accent-300/20 dark:from-primary-700/10 dark:to-accent-700/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <ScrollAnimationWrapper animation="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-950 dark:to-accent-950 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6 shadow-lg border border-primary-200 dark:border-primary-800">
              <Zap className="h-4 w-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent">
                Stay Organized
              </span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Powerful features designed to help you manage tasks efficiently and boost your productivity.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollAnimationWrapper
                key={feature.title}
                animation="slide-up"
                delay={index * 100}
              >
                <div className={`
                  group relative p-8 rounded-2xl border-2
                  bg-gradient-to-br ${feature.bgColor}
                  border-neutral-200 dark:border-neutral-800
                  hover:shadow-2xl hover:scale-105 hover:border-primary-300 dark:hover:border-primary-700
                  transition-all duration-300 transform cursor-pointer
                `}>
                  {/* Enhanced Icon */}
                  <div className={`
                    inline-flex items-center justify-center w-14 h-14 rounded-xl
                    bg-gradient-to-br ${feature.color} text-white
                    shadow-lg mb-5
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300
                  `}>
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
