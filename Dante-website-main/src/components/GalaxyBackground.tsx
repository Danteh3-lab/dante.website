import React from 'react';

interface GalaxyBackgroundProps {
  withVignette?: boolean;
}

export default function GalaxyBackground({ withVignette = true }: GalaxyBackgroundProps) {
  return (
    <>
      <div className="galaxy-layer stars stars-1" aria-hidden="true" />
      <div className="galaxy-layer stars stars-2" aria-hidden="true" />
      <div className="galaxy-layer stars stars-3" aria-hidden="true" />
      <div className="galaxy-layer twinkling" aria-hidden="true" />
      <div className="galaxy-layer nebula" aria-hidden="true" />
      {withVignette && <div className="vignette" aria-hidden="true" />}
    </>
  );
}
