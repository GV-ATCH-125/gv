"use client";

import { useState } from "react";

type Props = {
  /** Where the logo links to. */
  href?: string;
  /** Logo image. Put your own file in /public (default: /public/ayvens-logo.svg). */
  logoSrc?: string;
  alt?: string;
};

export default function AyvensMapsSidebarFooter({
  href = "https://www.ayvens.com",
  logoSrc = "@public/assets/Ayvens_Logo_2024.svg",
  alt = "Ayvens",
}: Props) {
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <footer className="sb-footer">
      <a href={href} target="_blank" rel="noreferrer" aria-label={alt}>
        {logoMissing ? (
          <span className="sb-footer-text">{alt}</span>
        ) : (
          // Plain <img>: the logo is a user-supplied static asset.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} alt={alt} height={28} onError={() => setLogoMissing(true)} />
        )}
      </a>
    </footer>
  );
}
