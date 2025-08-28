'use client';

// framer-motion removed to reduce JS payload
import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon 
} from '@heroicons/react/24/outline';
import ScrollReveal from './ScrollReveal';
import StaggeredReveal from './StaggeredReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [botField, setBotField] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email.trim()) newErrors.email = 'Please enter your email address.';
    else if (!emailRe.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!formData.message.trim() || formData.message.trim().length < 10) newErrors.message = 'Please provide at least 10 characters.';
    return newErrors;
  };

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (botField) return; // honeypot

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      // Netlify form submission (progressive enhancement)
      const form = e.currentTarget;
      const payload = {
        'form-name': 'contact',
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      };

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" duration={800}>
          <div className="text-center mb-16">
            <h2 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business with custom software solutions? 
              Let's discuss your project and find the perfect plan for your needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <ScrollReveal direction="left" delay={200} duration={700}>
            <div className="glass-card">
              <h3 className="text-2xl font-bold mb-8">Let's Start a Conversation</h3>
              
              <StaggeredReveal
                staggerDelay={100}
                direction="up"
                duration={500}
                className="space-y-6"
              >
                {[
                  { icon: EnvelopeIcon, label: "Email", value: "hello@novaware.com" },
                  { icon: PhoneIcon, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPinIcon, label: "Location", value: "San Francisco, CA" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center">
                    <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl mr-4">
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{contact.label}</p>
                      <p className="text-gray-300">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </StaggeredReveal>

              <ScrollReveal direction="up" delay={600} duration={600}>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="font-semibold mb-4">Why Choose Novaware?</h4>
                  <StaggeredReveal
                    staggerDelay={80}
                    direction="up"
                    duration={400}
                    className="space-y-3 text-gray-300"
                  >
                    {[
                      "Expert development team",
                      "Transparent pricing", 
                      "24/7 support available",
                      "Proven track record"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </StaggeredReveal>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={400} duration={700}>
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="glass-card"
              noValidate
            >
              <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
              <p className="sr-only" aria-live="polite">
                {status === 'submitting' ? 'Submitting your message' : status === 'success' ? 'Message sent successfully' : ''}
              </p>
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human: 
                  <input name="bot-field" onChange={(e) => setBotField(e.target.value)} />
                </label>
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name) || undefined}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email) || undefined}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message) || undefined}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary group disabled:opacity-60"
                  disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                >
                  Send Message
                  <PaperAirplaneIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {status === 'success' && (
                  <p className="text-emerald-400 text-sm" role="status">Thanks! Your message has been sent. We'll get back to you soon.</p>
                )}
                {status === 'error' && Object.keys(errors).length === 0 && (
                  <p className="text-red-400 text-sm" role="alert">Sorry, something went wrong. Please try again.</p>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

