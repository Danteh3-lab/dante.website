export default function PortfolioPage() {
  type Project = {
    title: string;
    desc: string;
    tags: string[];
    img?: string;
    video?: string;
    poster?: string;
  };
  const projects: Project[] = [
    {
      title: "EBS N.V. — Medewerker & Sleutel Beheer Dashboard",
      desc: "Overview of employees and key management with recent transactions and attention indicators.",
      img: "/images/portfolio/EBS%20DASHBOARD.png",
      tags: ["Dashboard", "Design", "Next.js"],
    },
    {
      title: "Shoprunner — Web Development",
      desc: "E-commerce storefront and admin dashboard.",
      img: "/images/portfolio/Shoprunner.png",
      tags: ["Next.js", "Tailwind", "E-commerce"],
    },
    {
      title: "Fireweb",
      desc: "Interactive web app demo with smooth motion and a responsive UI.",
      video: "/banners/fireweb.mp4",
      tags: ["Next.js", "UI", "Animation"],
    },
  ];

  return (
    <section className="container py-24">
      <h1 className="section-title mb-4">Portfolio</h1>
      <p className="text-gray-300 max-w-3xl mb-12">
        A snapshot of projects and product work. These examples highlight scalable backends, performant UIs,
        and clean developer experience. Want to see something specific? Reach out below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((p) => (
          <div key={p.title} className="glass-card overflow-hidden group">
            <div className="relative h-44 w-full overflow-hidden">
              {p.video ? (
                <video
                  src={p.video}
                  poster={p.poster}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
              <p className="text-gray-300/90 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <a href="#contact" className="btn-primary">Book a Call</a>
      </div>
    </section>
  );
}
