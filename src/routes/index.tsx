import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Instagram, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/cafe-de-olla.jpg";
import cherriesImage from "@/assets/coffee-cherries.jpg";
import foodImage from "@/assets/cafe-food.jpg";
import detailsImage from "@/assets/cafe-details.jpg";

const address = "1144 N Vermont Ave, Los Angeles, CA 90029";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
const instagramUrl = "https://www.instagram.com/delatierracafeorganic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "De La Tierra Café | Coffee & Café in Los Angeles" },
      { name: "description", content: "De La Tierra Café in Los Angeles offers coffee, breakfast, pastries, and a warm neighborhood café atmosphere at 1144 N Vermont Ave." },
      { property: "og:title", content: "De La Tierra Café | Coffee & Café in Los Angeles" },
      { property: "og:description", content: "Coffee, breakfast, pastries, and a warm neighborhood café atmosphere in Los Angeles." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        name: "De La Tierra Café",
        address: { "@type": "PostalAddress", streetAddress: "1144 N Vermont Ave", addressLocality: "Los Angeles", addressRegion: "CA", postalCode: "90029", addressCountry: "US" },
        telephone: "+1-323-522-6501",
        priceRange: "$10–20",
        sameAs: [instagramUrl],
      }),
    }],
  }),
  component: Index,
});

const navItems = [
  ["HOME", "#home"], ["OUR STORY", "#story"], ["MENU", "#menu"], ["CAFÉ", "#cafe"], ["VISIT", "#visit"],
] as const;

function CoffeeSketch({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" className={`h-auto w-full ${light ? "text-plaster" : "text-ink"}`}>
      <path d="M38 40c19-17 50-23 77-14 28 10 46 37 43 66-4 34-36 50-70 42-33-8-56-32-53-60 1-14 7-26 18-35" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M157 54c28-7 42 6 38 25-3 17-19 26-37 22M61 30c22 24 58 33 94 20M77 13c-8 18-4 36 9 47m27-48c-6 19-1 35 14 46M31 134c49 7 98 8 153 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 47c10-8 17-8 25 0M171 18c11-7 20-6 28 3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-mono text-xs font-bold uppercase tracking-normal">— {children}</p>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <main id="home" className="bg-plaster text-ink paper-grain">
      <header className="relative z-50 h-[72px] border-b border-ink/40 bg-plaster">
        <div className="mx-auto grid h-full max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-10">
          <a href="#home" className="min-w-0 font-display text-base uppercase leading-none sm:text-lg">De La Tierra Café</a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
            {navItems.map(([label, href]) => <a key={href} href={href} className="font-mono text-[11px] font-bold hover:text-terracotta">{label}</a>)}
          </nav>
          <div className="hidden justify-end md:flex"><Button asChild variant="cafe" size="sm"><a href="#menu">See menu</a></Button></div>
          <Button aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} variant="ghost" size="icon" className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-b border-ink bg-plaster p-5 md:hidden">
          <div className="grid gap-1">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-ink/20 py-3 font-display text-2xl">{label}</a>)}</div>
        </nav>}
      </header>

      <section className="grid min-h-[calc(100svh-72px)] grid-rows-[minmax(0,1fr)_minmax(0,1.08fr)] border-b border-ink lg:grid-cols-[0.82fr_1.18fr] lg:grid-rows-1">
        <div className="relative flex min-h-0 flex-col justify-center overflow-hidden bg-pine px-6 py-8 wood-grain sm:px-10 lg:px-[7vw]">
          <div className="relative z-10 max-w-2xl">
            <Eyebrow>De La Tierra Café · Los Angeles</Eyebrow>
            <h1 className="font-display text-[clamp(3.25rem,7.5vw,7.6rem)] uppercase leading-[0.84]">From the land.<br />By hand.</h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed sm:text-lg">Coffee, food, and a warm neighborhood space rooted in craft, community, and the people behind every cup.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="cafe" size="lg"><a href="#menu">See the menu <ArrowDown /></a></Button>
              <Button asChild variant="cafeOutline" size="lg"><a href="#visit">Visit us</a></Button>
            </div>
          </div>
          <div className="absolute -bottom-3 right-4 w-32 rotate-[-7deg] opacity-80 sm:w-44"><CoffeeSketch /></div>
        </div>
        <figure className="relative min-h-0 overflow-hidden bg-ink">
          <img src={heroImage} alt="Ceramic cup of coffee on a worn timber café table" width={1600} height={1200} fetchPriority="high" className="h-full w-full object-cover" />
          <figcaption className="absolute bottom-4 right-4 bg-plaster px-3 py-2 font-mono text-[10px] uppercase">Coffee / Los Angeles</figcaption>
        </figure>
      </section>

      <section id="story" className="scroll-mt-[72px] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div><Eyebrow>De La Tierra</Eyebrow><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl">Coffee has a story<br />before it reaches<br /><span className="text-terracotta">your cup.</span></h2></div>
          <div className="grid grid-cols-2 gap-3">
            <figure className="border border-ink p-2"><img src={cherriesImage} alt="Ripe coffee cherries on a coffee plant" width={1408} height={1056} loading="lazy" className="aspect-square w-full object-cover" /><figcaption className="pt-2 font-mono text-[10px] uppercase">Coffee / Origin</figcaption></figure>
            <figure className="mt-10 border border-ink p-2"><img src={detailsImage} alt="Reclaimed timber tables and a snake plant in a warm café" width={1408} height={1056} loading="lazy" className="aspect-square w-full object-cover" /><figcaption className="pt-2 font-mono text-[10px] uppercase">Space / Craft</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="bg-pine px-5 py-20 wood-grain md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl"><Eyebrow>Where coffee begins</Eyebrow><div className="grid gap-10 lg:grid-cols-2"><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl">Before the cup,<br />there are hands.</h2><p className="max-w-xl text-lg leading-relaxed">Every cup begins long before it reaches the café. We keep that work in view: the land, the harvest, the hands, and the coffee itself.</p></div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{["THE FARM", "THE HARVEST", "THE COFFEE", "THE LAND"].map((label, index) => <figure key={label} className="border border-ink bg-plaster p-2"><img src={cherriesImage} alt={index === 0 ? "Coffee plants growing on farmland" : "Ripe coffee cherries on branches"} width={1408} height={1056} loading="lazy" className={`aspect-square w-full object-cover ${index === 1 ? "object-right" : index === 2 ? "object-left" : ""}`} /><figcaption className="pt-2 font-mono text-[10px]">0{index + 1} / {label}</figcaption></figure>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <figure className="relative"><img src={detailsImage} alt="Warm café interior with reclaimed timber tables" width={1408} height={1056} loading="lazy" className="h-full min-h-96 w-full object-cover" /><figcaption className="absolute bottom-3 left-3 bg-sunflower px-3 py-2 font-hand text-xl">made for taking your time</figcaption></figure>
          <div className="flex flex-col justify-between border border-ink bg-terracotta p-7 text-plaster md:p-12"><div><Eyebrow>Made with intention</Eyebrow><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-6xl">Not everything<br />needs to match.</h2><p className="mt-7 max-w-md text-lg leading-relaxed">A neighborhood café built around good coffee, good food, and the simple pleasure of taking your time.</p></div><div className="mt-12 w-40 rotate-3"><CoffeeSketch light /></div></div>
        </div>
      </section>

      <section id="menu" className="scroll-mt-[72px] border-y border-ink bg-plaster px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div><Eyebrow>The coffee</Eyebrow><h2 className="font-display text-6xl uppercase leading-[0.88] sm:text-8xl">Start with<br />the cup.</h2><p className="mt-6 max-w-sm leading-relaxed">Four café favorites, printed simply. Ask at the counter for today’s full menu.</p></div>
          <div className="border-y-2 border-ink bg-pine p-6 wood-grain md:p-10">{["TRES LECHES LATTE", "CAFÉ DE OLLA", "LATTE", "COLD BREW COFFEE"].map((item, i) => <div key={item} className="grid grid-cols-[auto_1fr] items-end gap-3 border-b border-ink/45 py-5 last:border-0"><span className="font-display text-2xl uppercase sm:text-4xl">{item}</span><span className="mb-2 border-b border-dashed border-ink/50" /><span className="col-span-2 font-mono text-[10px] uppercase">0{i + 1} / Coffee</span></div>)}</div>
        </div>
      </section>

      <div aria-hidden="true" className="h-8 checker-strip" />

      <section className="bg-ink px-5 py-20 text-plaster md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"><figure className="border border-plaster/40 p-2"><img src={heroImage} alt="Café de olla in a painted ceramic cup" width={1600} height={1200} loading="lazy" className="aspect-[4/3] w-full object-cover" /></figure><div><Eyebrow>Featured cup</Eyebrow><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl">A little sweet.<br /><span className="text-sunflower">A lot of character.</span></h2><p className="mt-8 font-display text-2xl uppercase">Tres Leches Latte / Café de Olla</p><p className="mt-3 font-hand text-3xl text-pine">De La Tierra</p></div></div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-7xl"><Eyebrow>From the kitchen</Eyebrow><div className="grid gap-8 lg:grid-cols-2"><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl">Coffee needs<br />something good<br />beside it.</h2><div className="border-l border-ink pl-6 font-mono text-sm uppercase leading-loose"><p>Breakfast sandwiches</p><p>Pastries / Concha</p><p>Avocado toast</p><p>Nutella & banana croissant</p><p>Banana and PB toast</p><p>Bagel sandwich</p></div></div><figure className="relative mt-12"><div aria-hidden="true" className="absolute -bottom-4 -left-3 h-28 w-1/2 checker-strip" /><img src={foodImage} alt="Concha and breakfast sandwich served on checkered paper" width={1408} height={1056} loading="lazy" className="relative aspect-[16/8] w-full object-cover" /><figcaption className="relative mt-6 font-mono text-[10px] uppercase">Breakfast / Pastries / Something good beside it</figcaption></figure></div></section>

      <section id="cafe" className="scroll-mt-[72px] bg-pine px-5 py-20 wood-grain md:px-10 md:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-2"><div><Eyebrow>The space</Eyebrow><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl">Come for coffee.<br />Stay a while.</h2></div><img src={detailsImage} alt="Simple wooden tables inside the café" width={1408} height={1056} loading="lazy" className="aspect-[3/2] w-full border border-ink object-cover" /></div><div className="mt-12 grid border-y border-ink sm:grid-cols-3">{[["01", "SLOW DOWN"], ["02", "MEET HERE"], ["03", "TAKE YOUR TIME"]].map(([num, text]) => <div key={num} className="border-b border-ink p-6 last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="font-mono text-xs">{num}</span><p className="mt-4 font-display text-2xl">{text}</p></div>)}</div></div></section>

      <section className="px-5 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-7xl"><Eyebrow>Inside De La Tierra</Eyebrow><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl">The little<br />details matter.</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{([[heroImage,"COFFEE"],[detailsImage,"SPACE"],[foodImage,"FOOD"],[cherriesImage,"ORIGIN"]] as const).map(([src,label], index) => <figure key={label} className="border border-ink p-2"><img src={src} alt={`${label.toLowerCase()} detail`} width={index === 0 ? 1600 : 1408} height={index === 0 ? 1200 : 1056} loading="lazy" className="aspect-square w-full object-cover" /><figcaption className="pt-2 font-mono text-[10px]">0{index + 1} / {label}</figcaption></figure>)}</div></div></section>

      <section className="border-y border-ink bg-sunflower px-5 py-16 md:px-10"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[auto_1fr] md:items-center"><div><span className="font-display text-8xl leading-none">4.8</span><p className="font-mono text-xs font-bold">220 REVIEWS</p></div><div><Eyebrow>Customers talk about</Eyebrow><div className="flex flex-wrap gap-x-5 gap-y-2 font-display text-2xl uppercase sm:text-4xl"><span>Delicious coffee</span><span>·</span><span>Warm atmosphere</span><span>·</span><span>Fresh food</span><span>·</span><span>Friendly service</span></div></div></div></section>

      <section id="visit" className="scroll-mt-[72px] px-5 py-20 md:px-10 md:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><Eyebrow>Come by</Eyebrow><h2 className="font-display text-6xl uppercase leading-[0.88] sm:text-8xl">See you<br />at the café.</h2><p className="mt-7 font-hand text-3xl text-terracotta">Los Angeles, California</p></div><div className="border border-ink"><div className="bg-leaf p-7 text-plaster md:p-10"><p className="font-display text-2xl uppercase">De La Tierra Café</p><address className="mt-5 not-italic leading-relaxed">1144 N Vermont Ave<br />Los Angeles, CA 90029<br />United States</address><a href="tel:+13235226501" className="mt-4 inline-block font-mono text-sm underline">+1 323-522-6501</a></div><div className="grid sm:grid-cols-3"><Button asChild variant="cafeOutline" size="lg" className="h-14 border-0 border-b sm:border-b-0 sm:border-r"><a href={directionsUrl} target="_blank" rel="noreferrer"><MapPin /> Directions</a></Button><Button asChild variant="cafeOutline" size="lg" className="h-14 border-0 border-b sm:border-b-0 sm:border-r"><a href="tel:+13235226501"><Phone /> Call</a></Button><Button asChild variant="cafeOutline" size="lg" className="h-14 border-0"><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram /> Instagram</a></Button></div></div></div></section>

      <section className="bg-terracotta px-5 py-20 text-plaster md:px-10 md:py-28"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><Eyebrow>From the land. To the table.</Eyebrow><h2 className="font-display text-5xl uppercase leading-[0.9] sm:text-7xl">Good coffee, something to eat,<br />and a place that feels<br /><span className="text-sunflower">a little closer to home.</span></h2></div><Button asChild variant="cafeLight" size="lg"><a href="#visit">Visit De La Tierra <ArrowRight /></a></Button></div></section>

      <footer className="bg-ink px-5 py-12 text-plaster md:px-10"><div className="mx-auto max-w-7xl"><div className="grid gap-10 border-b border-plaster/30 pb-10 md:grid-cols-[1fr_auto_auto]"><div><p className="font-display text-3xl uppercase">De La Tierra Café</p><p className="mt-3 font-hand text-2xl text-pine">Coffee / Food / Community</p></div><address className="font-mono text-xs not-italic leading-relaxed">1144 N Vermont Ave<br />Los Angeles, CA 90029<br /><a href="tel:+13235226501">+1 323-522-6501</a></address><nav className="grid font-mono text-xs uppercase"><a href="#menu">Menu</a><a href="#visit">Visit</a><a href={directionsUrl} target="_blank" rel="noreferrer">Directions</a><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a></nav></div><div className="flex flex-wrap justify-between gap-4 pt-6 font-mono text-[10px] uppercase"><span>Specialty coffee · Los Angeles</span><span>From the land. By hand. To your cup.</span></div></div></footer>
    </main>
  );
}
