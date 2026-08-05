import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jeffreyandersenphotography.com";

export const metadata: Metadata = {
  title: "About — Jef Photography",
  description:
    "The story behind the lens. Learn about Jef, a photographer based in the American Midwest capturing light and quiet moments.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About — Jef Photography",
    description: "The story behind the lens. Learn about Jef.",
    type: "website",
    url: "/about",
    siteName: "Jef Photography",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About — Jef Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Jef Photography",
    description: "The story behind the lens.",
  },
};

const portraitImage = "/images/portrait.jpg";

const biographyParagraphs = [
  `I'm Jef — i specialize in blurry and deep fried film photography.`,
  `I shoot primarily on film with a Minolta x-700 with m42 lenses.`,
  `This website is a collection of galleries, some thoughts on the cameras I use, and a look into my mind when it comes to creating somthing new.`,
];

const journeyParagraphs = [
  `I started my adventure in photography as a freshman in high school, and currently only develope and print in black and white.`,
  `I started with a K1000 and a few cheap kmount lenses, but developed a habit of acquiring old cameras and lenses. `,
  `These days I divide my time between personal projects and the occasional concert.`,
];

const equipmentItems = [
  { name: "Minotla X-700", role: "Primary" },
  { name: "Fed 2", role: "Secondary" },
  { name: "K1000", role: "Most reliable" },
  { name: "Helios 44", role: "Everyday lens — the one I reach for" },
  { name: "Voigtländer 15mm f/4.5 Super Wide-Heliar", role: "wide angle" },
];

const filmStocks = [
  "Ilford HP5 plus",
  "Kodak XX",
  "Fujifilm C200",
  "Kentmere 400",
  "Kodak Gold 200",
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Email", href: "mailto:focusedprio@gmail.com" },
];

export default async function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Portrait + Introduction */}
        <section className="py-16 md:py-24">
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-[280px_1fr]">
            {/* Portrait image */}
            <div className="overflow-hidden rounded-[12px] border border-border">
              <img
                src={portraitImage}
                alt="Jef, photographer"
                width={560}
                height={700}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>

            {/* Introduction text */}
            <div className="flex flex-col justify-center py-4">
              <p className="font-montserrat text-xs tracking-[0.2em] uppercase text-muted">
                About
              </p>
              <h1 className="mt-3 font-cormorant text-5xl font-normal tracking-wide text-foreground md:text-6xl lg:text-7xl">
                Jef
              </h1>
              <div className="my-8 h-px w-20 bg-border" />
              {biographyParagraphs.slice(0, 2).map((paragraph, index) => (
                <p
                  key={index}
                  className={`font-montserrat text-[15px] leading-relaxed tracking-wide text-muted ${
                    index === biographyParagraphs.length - 1 ? "" : "mb-6"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Biography */}
        <section className="py-12 md:py-20">
          <SectionHeading title="Biography" />
          <div className="mt-8 max-w-[750px]">
            {biographyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`font-montserrat text-[15px] leading-relaxed tracking-wide text-muted ${
                  index < biographyParagraphs.length - 1 ? "mb-6" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Photography Journey */}
        <section className="py-12 md:py-20">
          <SectionHeading title="Photography Journey" />
          <div className="mt-8 max-w-[750px]">
            {journeyParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`font-montserrat text-[15px] leading-relaxed tracking-wide text-muted ${
                  index < journeyParagraphs.length - 1 ? "mb-6" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Equipment & Film */}
        <section className="py-12 md:py-20">
          <SectionHeading title="Equipment" subtitle="What I carry and what I develop" />

          <div className="mt-8 grid gap-x-12 gap-y-16 md:grid-cols-2">
            {/* Cameras & Lenses */}
            <div>
              <h3 className="font-cormorant text-2xl font-normal tracking-wide text-foreground md:text-3xl">
                Cameras & Lenses
              </h3>
              <div className="mt-6 border-t border-border pt-6">
                {equipmentItems.map((item, index) => (
                  <div key={index} className="py-4">
                    <p className="font-montserrat text-[15px] font-medium tracking-wide text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-1 font-montserrat text-sm tracking-wide text-muted">
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Film Stocks */}
            <div>
              <h3 className="font-cormorant text-2xl font-normal tracking-wide text-foreground md:text-3xl">
                Film Stocks
              </h3>
              <ul className="mt-6 border-t border-border pt-6">
                {filmStocks.map((stock, index) => (
                  <li key={index} className="py-2.5 font-montserrat text-[15px] tracking-wide text-muted">
                    {stock}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="pb-20 pt-12 md:py-20">
          <SectionHeading title="Contact" subtitle="Get in touch" />
          <div className="mt-8 max-w-[750px]">
            <p className="font-montserrat text-[15px] leading-relaxed tracking-wide text-muted">
              reach me{" "}
              <Link
                href="mailto:focusedprio@gmail.com"
                className="text-accent underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent/80 hover:decoration-accent"
              >
                by email
              </Link>
              . I try to respond within a few days.
            </p>

            <div className="mt-10 flex gap-x-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat text-sm tracking-wide text-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back to home */}
        <section className="border-t border-border py-12 text-center">
          <p className="font-cormorant text-xl tracking-wide text-muted md:text-2xl">
            Thank you for stopping by.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block font-montserrat text-sm tracking-wide text-muted underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
          >
            Back to home &rarr;
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
