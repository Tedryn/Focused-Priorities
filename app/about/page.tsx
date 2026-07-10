import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About — Jeffrey Andersen",
  description:
    "The story behind the lens. Learn about Jeffrey Andersen, a photographer based in the American Midwest capturing light and quiet moments.",
};

const portraitImage = "/images/portrait.jpg";

const biographyParagraphs = [
  `I'm Jeffrey Andersen — a photographer and writer working from the American Midwest. My work is an ongoing attempt to slow down long enough to see what's already there: the weight of afternoon light on a weathered wall, the quiet geometry of an empty street, the unguarded gestures that make up most of our days.`,
  `I shoot primarily on film with a Leica M6 and a Pentax KP. I believe the limits of a frame — thirty-six exposures a day, a single lens on your shoulder, the patience required to wait for things to reveal themselves — are not constraints but invitations. They force you to pay attention.`,
  `This website is a collection of galleries, some thoughts on the process, and an attempt to keep something honest in public.`,
];

const journeyParagraphs = [
  `I started taking photography seriously around 2015, after years of letting cameras sit on shelves next to other half-finished hobbies. Something shifted — maybe it was finding a roll of Portra 400 in the back of a jacket drawer and actually developing it instead of tossing the canister — and suddenly I was looking at the world differently.`,
  `My early work was borrowed time. I picked up a battered Olympus OM-4 Ti from a estate sale, taught myself darkroom processing in a borrowed basement, and spent two years figuring out what film stock suited the kind of light I was chasing. By 2018 I'd settled into a practice: shoot on weekends when possible, edit slowly, and only print work I could live with on the wall for a year or more.`,
  `These days I divide my time between personal projects and occasional commissions — editorial assignments for small publications, portrait sessions for people who want something that doesn't look like every other family photo. The camera hasn't changed much: still the M6, sometimes the KP, usually one lens. The intention has gotten sharper.`,
];

const equipmentItems = [
  { name: "Leica M6", role: "Primary — 35mm rangefinder" },
  { name: "Pentax KP", role: "Secondary — APS-C DSLR, low-light work" },
  { name: "Olympus OM-4 Ti", role: "Weekend shooter — battered and beloved" },
  { name: "Summicron 50mm f/2", role: "Everyday lens — the one I reach for" },
  { name: "Summilux 35mm f/1.4", role: "Available light — streets, interiors" },
];

const filmStocks = [
  "Kodak Portra 400",
  "Kodak Tri-X 400",
  "Fujifilm C200",
  "Ilford HP5 Plus",
  "Kodak Gold 200",
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Email", href: "mailto:hello@example.com" },
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
                alt="Jeffrey Andersen, photographer"
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
                Jeffrey Andersen
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
              For commissions, collaborations, or just to say hello — reach me{" "}
              <Link
                href="mailto:hello@example.com"
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
