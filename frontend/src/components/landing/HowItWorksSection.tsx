import React from 'react';
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation-wrapper';
import { UserPlus, ListPlus, CheckCircle, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up in seconds with your email. No credit card required, start organizing immediately.',
  },
  {
    number: 2,
    icon: ListPlus,
    title: 'Add Your Tasks',
    description: 'Create tasks with titles, descriptions, priorities, and due dates. Organize with tags and categories.',
  },
  {
    number: 3,
    icon: CheckCircle,
    title: 'Complete & Track',
    description: 'Check off tasks as you complete them. Track your progress with visual statistics and insights.',
  },
  {
    number: 4,
    icon: TrendingUp,
    title: 'Stay Productive',
    description: 'Build momentum with streaks and achievements. Watch your productivity soar over time.',
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 sm:py-32 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimationWrapper animation="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Get started in minutes and transform the way you manage your tasks.
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollAnimationWrapper
                key={step.number}
                animation="slide-up"
                delay={index * 150}
              >
                <div className="relative text-center">
                  {/* Connector Line (hidden on mobile, shown on desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-700 dark:to-accent-700" />
                  )}

                  {/* Step Number Badge */}
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-950 dark:to-accent-950 animate-pulse" />
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-neutral-900 border-4 border-primary-200 dark:border-primary-800">
                      <Icon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
