'use client';

import { CheckIcon, StarIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const plans = [
  {
    name: 'Basic',
    price: 39.99,
    description: 'Perfect for startups and small businesses',
    features: [
      'Up to 3 custom applications',
      'Basic web development',
      'Email support',
      'Monthly updates',
      'Standard hosting',
      '99.5% uptime guarantee'
    ],
    popular: false,
    cta: 'Start Basic Plan'
  },
  {
    name: 'Pro',
    price: 99.99,
    description: 'Ideal for growing businesses',
    features: [
      'Up to 10 custom applications',
      'Advanced web & mobile development',
      'Priority support (24/7)',
      'Weekly updates',
      'Premium hosting & CDN',
      'API integrations',
      'Custom automation tools',
      '99.9% uptime guarantee'
    ],
    popular: true,
    cta: 'Start Pro Plan'
  },
  {
    name: 'Enterprise',
    price: 399.99,
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited applications',
      'Full-stack development team',
      'Dedicated account manager',
      'Daily updates & monitoring',
      'Enterprise-grade infrastructure',
      'Advanced security features',
      'Custom integrations',
      'White-label solutions',
      '99.99% uptime guarantee'
    ],
    popular: false,
    cta: 'Contact Sales'
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const formatPrice = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business needs. All plans include our core features 
            with no hidden fees.
          </p>
          
          <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === 'monthly' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === 'annual' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative ${
                plan.popular 
                  ? 'glass-card border-primary/50 scale-105 shadow-2xl shadow-primary/20' 
                  : 'glass-card'
              } hover:scale-105 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold gradient-text">
                    {formatPrice(billingCycle === 'monthly' ? plan.price : plan.price * 0.8)}
                  </span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="mt-2 text-sm text-emerald-300">Billed yearly – save 20%</div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ Free migration assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
