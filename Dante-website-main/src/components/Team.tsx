"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import danickPortrait from "@/../public/images/danick-portrait.jpg";
import shaquillePortrait from "@/../public/images/shaquille.jpg";
import jilmoPortrait from "@/../public/images/jilmo.jpg";

// Edit this array later with your real team info
type MaybeStatic = string | StaticImageData;

const team = [
  {
    id: "t1",
    name: "Danick Toikromo",
    role: "Full Stack Developer",
    bio: "Hands-on developer, DevOps.",
    tags: ["Full Stack", "Backend", "Frontend", "DevOps"],
    // Keep video banner; use portrait image for avatar for now
    banner: "/images/captain-america-avatar.mp4",
    avatar: danickPortrait as MaybeStatic,
    poster: danickPortrait as MaybeStatic,
  },
  {
    id: "t2",
    name: "Shaquille Ngadimin",
    role: "Software Developer",
    bio: "In charge of marketing, public relations, backend developer.",
    tags: ["Marketing", "Public Relations", "Backend"],
    banner: "/banners/iron%20man.mp4",
    avatar: shaquillePortrait as MaybeStatic,
    poster: shaquillePortrait as MaybeStatic,
  },
  {
    id: "t3",
    name: "Jilmo Jong A Tai",
    role: "Senior Developer",
    bio: "Leads backend architecture and developer experience.",
    tags: ["Senior", "Architecture", "Backend"],
    banner: "/banners/wally%20west.mp4",
    avatar: jilmoPortrait as MaybeStatic,
    poster: jilmoPortrait as MaybeStatic,
  },
];

// Removed framer-motion for performance; using CSS transitions instead

// Helper to determine if the banner is a video
const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

export default function Team() {
  return (
    <section id="team" className="container">
      <h2 className="section-title">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {team.map((member, i) => (
          <div
            key={member.id}
            className="glass-card overflow-hidden group transition-transform duration-300 hover:translate-y-1"
          >
            {/* Banner */}
            <div className="relative h-28 w-full rounded-xl overflow-hidden mb-10">
              {isVideo(member.banner) ? (
                <video
                  src={member.banner}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={
                    typeof (member as any).poster === "string"
                      ? (member as any).poster
                      : ((member as any).poster as StaticImageData).src
                  }
                />
              ) : (
                <Image
                  src={member.banner}
                  alt={`${member.name} banner`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={false}
                />
              )}
              {/* Subtle top sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            </div>
            {/* Avatar moved outside banner to avoid clipping */}
            <div className="relative z-10 -mt-8 flex justify-center">
              <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-black/40">
                  {isVideo(member.avatar as string) ? (
                    <video
                      src={member.avatar as string}
                      className="h-full w-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={
                        typeof (member as any).poster === "string"
                          ? (member as any).poster
                          : ((member as any).poster as StaticImageData).src
                      }
                    />
                  ) : (
                    <Image
                      src={member.avatar}
                      alt={`${member.name} portrait`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                      placeholder="blur"
                      priority={false}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center px-2">
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-300 mb-3">{member.role}</p>
              <p className="text-gray-300/90 mb-5">{member.bio}</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {member.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
