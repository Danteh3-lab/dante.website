import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Team from '@/components/Team';

export default function AboutPage() {
  return (
    <main className="min-h-screen animated-bg">
      <Header />
      <div className="space-y-24 pt-28 md:pt-36">
        <section className="container">
          <h1 className="section-title">About</h1>
          <p className="text-gray-300 max-w-2xl">
            We build modern, reliable software with a focus on quality and velocity. Meet the team behind Dante.dev.
          </p>
        </section>
        <Team />
      </div>
      <Footer />
    </main>
  );
}
