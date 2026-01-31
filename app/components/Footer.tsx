import { Button } from "./ui/button";
import Github from "./GitHub";

import logoPng from "~/assets/logo/logo-52.png";
import logoWebp from "~/assets/logo/logo-52.webp";
import logoAvif from "~/assets/logo/logo-52.avif";

const startingYear = 2024;

export default function Footer() {
  return (
    <footer className="mb-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-auto items-center">
          <div className="flex items-center gap-2">
            <picture>
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <img src={logoPng} alt="Trove" className="h-auto w-10" />
            </picture>
            <p className="text-2xl font-semibold">Trove</p>
          </div>

          <Button variant="ghost" size="icon" className="ml-5 flex items-center gap-2" asChild>
            <a
              href="https://github.com/AlstonChan/TokenTrove"
              target="_blank"
              rel="noreferrer noopener"
              referrerPolicy="no-referrer"
            >
              <Github className="p-2" />
            </a>
          </Button>
        </div>
        <p>
          © Trove{" "}
          {new Date().getFullYear() > startingYear
            ? `${startingYear} - ${new Date().getFullYear()}`
            : startingYear}
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
