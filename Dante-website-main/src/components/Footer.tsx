import Link from 'next/link';
import LiteYouTube from './LiteYouTube';

const footerLinks = {
  product: [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Documentation', href: '/docs' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/dantedev' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/dantedev' },
    { name: 'GitHub', href: 'https://github.com/dantedev' },
    { name: 'Discord', href: 'https://discord.gg/dantedev' },
  ],
};

// YouTubeSegment is now imported from './YouTubeSegment'

export default function Footer() {
  return (
    <footer className="bg-dark-light border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-bold gradient-text mb-4 inline-block">
              Dante.dev
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional software development platform delivering innovative solutions 
              through subscription-based services.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                    {item.name.charAt(0)}
                  </div>
                </a>
              ))}
            </div>

            {/* Featured Video Embed */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white/90 mb-2">Featured Video</h4>
              <div className="glow-frame">
                <div className="glow-inner relative bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="aspect-video relative">
                    <LiteYouTube
                      videoId="JPh7Pf1z7gE"
                      start={2923}
                      end={2935}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Segment 48:43–48:55 at 2× speed • Watch the full video{' '}
                <a
                  href="https://www.youtube.com/watch?v=JPh7Pf1z7gE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Dante.dev. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">Built with ❤️ using Next.js</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
