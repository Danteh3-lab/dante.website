'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What is included in the subscription plans?',
    answer: 'Each plan includes custom software development, hosting, maintenance, updates, and support. Higher tiers offer more applications, priority support, and advanced features like API integrations and automation tools.'
  },
  {
    question: 'How quickly can you deliver a custom application?',
    answer: 'Development timelines vary based on complexity. Simple applications typically take 2-4 weeks, while complex enterprise solutions may take 8-12 weeks. We provide detailed timelines during the planning phase.'
  },
  {
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Yes, all subscription plans include ongoing maintenance, security updates, bug fixes, and technical support. Pro and Enterprise plans offer priority support with faster response times.'
  },
  {
    question: 'Can I upgrade or downgrade my plan anytime?',
    answer: 'Absolutely! You can change your subscription plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.'
  },
  {
    question: 'What technologies do you use for development?',
    answer: 'We use modern, industry-standard technologies including React, Next.js, Node.js, Python, AWS, and more. We choose the best technology stack based on your specific requirements.'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial for all plans. No credit card required to start. You can explore our platform and see how we can help your business grow.'
  },
  {
    question: 'Do you offer custom enterprise solutions?',
    answer: 'Yes, our Enterprise plan includes fully customized solutions, dedicated development teams, and white-label options. Contact our sales team to discuss your specific requirements.'
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer email support for Basic plans, priority 24/7 support for Pro plans, and dedicated account managers for Enterprise clients. All plans include comprehensive documentation and tutorials.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about our services, pricing, and development process.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div className="glass-card">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex items-center justify-between p-6 focus:outline-none"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                >
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <ChevronDownIcon 
                    className={`h-5 w-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  id={`faq-panel-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'}`}
                >
                  <div className="px-6 pb-6" aria-hidden={openIndex !== index}>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="glass-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help. Get in touch and we'll answer any questions you have about our services.
            </p>
            <button className="btn-primary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
