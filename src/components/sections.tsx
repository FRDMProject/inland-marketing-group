import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Layers3,
  MoveUpRight,
  Search,
  Target,
} from "lucide-react";
import { TextReveal, Reveal, MotionToggle } from "./motion";
import { InlandSculpture } from "./ui/inland-sculpture";
import { BackgroundBeams } from "./ui/background-beams";
import { KineticGrid } from "./ui/kinetic-grid";
import { ContactForm } from "./contact-form";
import { cities, faqs, projects, services, type City } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero({
  city,
  webDesign = false,
  paid = false,
}: {
  city?: City;
  webDesign?: boolean;
  paid?: boolean;
}) {
  return (
    <section className={`hero ${city ? "city-hero" : ""}`}>
      <BackgroundBeams />
      <div className="container hero-main">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {city
              ? `${city.name.replace(/^the /, "")} · Custom web design`
              : "Independent digital studio · Southern California"}
          </p>
          <h1>
            {city ? (
              <>
                <span>{city.name.replace(/^the /, "")}.</span>
                <span>Web design</span>
                <em>with impact.</em>
              </>
            ) : webDesign ? (
              <>
                <span>More than</span>
                <span>a website.</span>
                <em>A statement.</em>
              </>
            ) : (
              <>
                <span>Good business.</span>
                <span>Unforgettable</span>
                <em>websites.</em>
              </>
            )}
          </h1>
          <p className="hero-description">
            {city
              ? city.description
              : webDesign
                ? "Distinctive design. Thoughtful development. A website that feels like your business—and helps it move forward."
                : "We build distinctive websites and digital experiences for businesses ready for their next chapter."}
          </p>
          <div className="hero-actions">
            <Link className="button" href="#start" data-cta="hero">
              Let’s build something <ArrowUpRight size={18} />
            </Link>
            <a className="text-link" href="#design-lab">
              Explore the possibilities <ArrowDown size={15} />
            </a>
          </div>
          <div className="hero-assurance">
            <span>Custom design</span>
            <i />
            <span>Clear scope</span>
            <i />
            <span>Built around you</span>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-orbit-label">
            <span>INDEPENDENT BY DESIGN</span>
            <span>↗</span>
          </div>
          <InlandSculpture />
          <div className="art-caption">
            <span>Ideas taking shape.</span>
            <span className="art-coordinate">
              33.9806° N<br />
              117.3755° W
            </span>
          </div>
          <span className="art-cross cross-one">+</span>
          <span className="art-cross cross-two">+</span>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>
          {paid
            ? "Built for your business. Focused on your next customer."
            : "DESIGN WITH CHARACTER. DEVELOPMENT WITH PURPOSE."}
        </span>
        <MotionToggle />
      </div>
    </section>
  );
}

export function CapabilitiesStrip() {
  return (
    <div className="capabilities-strip">
      <div className="container">
        <span>
          Good looks.
          <br />
          <strong>Great foundations.</strong>
        </span>
        <span>
          <Layers3 /> Custom design
        </span>
        <span>
          <Code2 /> Next.js development
        </span>
        <span>
          <Search /> Search-ready structure
        </span>
        <span>
          <Target /> Conversion-focused
        </span>
      </div>
    </div>
  );
}

export function Intro() {
  return (
    <section className="section intro-section" id="approach">
      <div className="container intro-grid">
        <p className="eyebrow">01 / A little more ambition</p>
        <div>
          <h2>
            <TextReveal text="Your business isn’t ordinary. Your website shouldn’t be either." />
          </h2>
          <div className="intro-bottom">
            <span className="asterisk" aria-hidden="true">
              ✳
            </span>
            <p>
              We bring strategy, design, and development into one thoughtful process. The result is
              an experience that captures who you are, makes your offer clear, and gives people a
              reason to take the next step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectPreview({
  project,
  large = false,
}: {
  project: (typeof projects)[number];
  large?: boolean;
}) {
  return (
    <div
      className={`project-preview ${project.style} ${large ? "preview-large" : ""}`}
      aria-label={`${project.name} concept website preview`}
      role="img"
    >
      <div className="browser-bar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>{project.name.toLowerCase()}.studio</span>
        <span>↗</span>
      </div>
      <div className="mockup-content">
        <div className="mockup-nav">
          <strong>
            {project.name}
            {project.style === "goodkind" ? "✳" : "."}
          </strong>
          <span>Discover &nbsp; About &nbsp; ↗</span>
        </div>
        <div className="mockup-main">
          <span className="mockup-kicker">{project.category}</span>
          <div className="mockup-title">{project.title}</div>
          <span className="mockup-button">
            Explore the{" "}
            {project.style === "forma"
              ? "spaces"
              : project.style === "ridge"
                ? "collection"
                : "feeling"}{" "}
            ↗
          </span>
        </div>
        <div className="mockup-art">
          <div className="art-sun" />
          <div className="art-shape a" />
          <div className="art-shape b" />
          <div className="art-shape c" />
          <div className="art-ground" />
        </div>
        <div className="mockup-bottom">
          <span>
            {project.style === "forma"
              ? "CONSIDERED LIVING / 01"
              : project.style === "ridge"
                ? "GO WHERE YOU FEEL ALIVE"
                : "GOOD FOR YOUR EVERYDAY"}
          </span>
          <span>↓</span>
        </div>
      </div>
    </div>
  );
}

export function DesignLab({ stacked = false }: { stacked?: boolean }) {
  return (
    <section className={`section design-lab ${stacked ? "stacked-lab" : ""}`} id="design-lab">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">02 / The design lab</p>
            <h2>
              A different kind of
              <br />
              <em>first impression.</em>
            </h2>
          </div>
          <div>
            <p>
              Three original directions. A glimpse of what happens when a business gets a website
              with character.
            </p>
            <span className="concept-label">Exploratory concepts · Not client projects</span>
          </div>
        </Reveal>
        <div className={stacked ? "project-stack" : "project-grid"}>
          {projects.map((project, index) => (
            <Reveal className={`project-item project-${index}`} key={project.slug}>
              <Link className="project-card" href={`/work/${project.slug}`}>
                <div className="project-stage">
                  <span className="project-number">0{index + 1} / CONCEPT</span>
                  <ProjectPreview project={project} />
                  <span className="project-open" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="project-caption">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.category}</p>
                  </div>
                  <ArrowUpRight size={22} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / Built to work together</p>
            <h2>
              Stand out.
              <br />
              Then <em>move forward.</em>
            </h2>
          </div>
          <p>
            A great website is the foundation. The right digital strategy helps the right people
            find it.
          </p>
        </div>
        <div className="service-list">
          <Link className="service-row featured-service" href="/web-design">
            <span className="service-index">01</span>
            <div>
              <h3>Web design & development</h3>
              <p>
                Your identity, brought to life. Beautifully built for the way people browse, search,
                and choose.
              </p>
              <div className="tags">
                <span>Strategy</span>
                <span>Design</span>
                <span>Development</span>
              </div>
            </div>
            <span className="service-icon">
              <ArrowUpRight />
            </span>
          </Link>
          {services.map((service, i) => (
            <Link className="service-row" key={service.slug} href={`/services/${service.slug}`}>
              <span className="service-index">0{i + 2}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <span className="service-icon">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BuildDetails() {
  const features = [
    [
      <Compass key="c" />,
      "A direction that’s yours.",
      "We define the story, structure, and visual direction around your business and your customers.",
    ],
    [
      <Layers3 key="l" />,
      "Every screen considered.",
      "Responsive layouts, readable content, and interactions that feel right from phone to desktop.",
    ],
    [
      <Code2 key="co" />,
      "Built with care.",
      "Modern development, an accessible foundation, and clear documentation for what comes next.",
    ],
    [
      <Target key="t" />,
      "A purpose for every page.",
      "Clear services, useful answers, and a focused next step. Good design has a job to do.",
    ],
  ];
  return (
    <section className="section build-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The details make the difference</p>
            <h2>
              Beauty with
              <br />
              <em>a business plan.</em>
            </h2>
          </div>
          <p>We think about the first impression and everything that follows it.</p>
        </div>
        <div className="features-grid">
          {features.map(([icon, title, text], i) => (
            <Reveal key={i} className="feature">
              <span className="feature-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process-section">
      <div className="container process-grid">
        <div>
          <p className="eyebrow">04 / From idea to out there</p>
          <h2>
            Big ideas.
            <br />
            <em>Clear next steps.</em>
          </h2>
          <p>One connected process, with room to think and a plan to move.</p>
          <a href="#start" className="text-link" data-cta="process">
            Talk through your project <ArrowUpRight size={16} />
          </a>
          <div className="process-art">
            <KineticGrid />
            <span aria-hidden="true">↗</span>
          </div>
        </div>
        <ol className="process-steps">
          {[
            [
              "Find the direction.",
              "We get to know your business, audience, and goals. Then we agree on the scope, content needs, and priorities.",
            ],
            [
              "Make it distinctive.",
              "We explore a visual direction and shape the pages around your story. You review the work as it develops.",
            ],
            [
              "Build the experience.",
              "We turn the design into a responsive website, connect the agreed tools, and test the customer journey.",
            ],
            [
              "Launch with a plan.",
              "We check the details, document the setup, and agree on the handoff and any ongoing support.",
            ],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LocalSection({ city }: { city?: City }) {
  return (
    <section className="section local-section">
      <div className="container local-grid">
        <div className="local-art" aria-hidden="true">
          <div className="local-sun" />
          <svg viewBox="0 0 600 400">
            <path
              d="M0 280 90 200 140 226 248 93 288 170 355 128 470 255 528 221 600 300V400H0Z"
              fill="#bb775e"
            />
            <path d="m0 310 156-90 80 75 125-102 90 118 83-43 66 34V400H0Z" fill="#875442" />
            <path d="m0 374 120-56 100 24 146-78 138 75 96-18V400H0Z" fill="#3f4840" />
            <path d="M0 389Q230 319 600 365V400H0Z" fill="#202a28" />
          </svg>
          <span className="local-art-label">
            SOUTHERN CALIFORNIA
            <br />A DIFFERENT PERSPECTIVE.
          </span>
          <span className="local-stamp">
            INLAND
            <br />& BEYOND ↗
          </span>
        </div>
        <div>
          <p className="eyebrow">
            {city ? `${city.region} / Southern California` : "05 / Rooted here. Looking ahead."}
          </p>
          <h2>
            {city ? (
              city.line
            ) : (
              <>
                Inland ambition.
                <br />
                <em>Wider horizons.</em>
              </>
            )}
          </h2>
          <p>
            {city
              ? city.context
              : "There’s a particular energy here. Independent businesses. New ideas. People building something of their own. We’re here to help that ambition show up online."}
          </p>
          {city ? (
            <>
              <h3 className="local-subhead">{city.angle}</h3>
              <p>{city.focus}</p>
              <div className="tags">
                {city.audience.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </>
          ) : (
            <div className="city-links">
              {cities.slice(0, 4).map((c) => (
                <Link key={c.slug} href={`/web-design/${c.slug}`}>
                  {c.name.replace(/^the /, "")} <ArrowUpRight size={15} />
                </Link>
              ))}
              <Link href="/service-areas">
                Explore all service areas <ArrowUpRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Your next chapter starts here</p>
          <h2>
            Something
            <br />
            good is
            <br />
            <em>taking shape.</em>
            <span className="contact-arrow" aria-hidden="true">
              <MoveUpRight />
            </span>
          </h2>
          <p>
            A new website. A fresh direction. A bigger idea.
            <br />
            Tell us what you have in mind.
          </p>
          <div className="contact-expectations">
            <span>
              <Check size={16} /> A conversation about your goals
            </span>
            <span>
              <Check size={16} /> Clear scope before any commitment
            </span>
            <span>
              <Check size={16} /> A plan for what comes next
            </span>
          </div>
          {site.email && (
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email} <ArrowUpRight size={15} />
            </a>
          )}
          {site.phone && (
            <a className="text-link" href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>
              {site.phone}
            </a>
          )}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section faq-section" id="questions">
      <div className="container faq-grid">
        <div>
          <p className="eyebrow">A few things you might be wondering</p>
          <h2>
            Good
            <br />
            <em>questions.</em>
          </h2>
        </div>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageIntro({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent?: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">
          <span className="status-dot" />
          {label}
        </p>
        <h1>
          {title}
          {accent && (
            <>
              <br />
              <em>{accent}</em>
            </>
          )}
        </h1>
        <p>{description}</p>
      </div>
      <BackgroundBeams />
    </section>
  );
}
