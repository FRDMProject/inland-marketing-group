import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/content";
import { ContactSection, PageIntro } from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const data = services.find((s) => s.slug === service);
  if (!data) notFound();
  return pageMeta(data.name, data.description, `/services/${data.slug}`);
}
export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const data = services.find((s) => s.slug === service);
  if (!data) notFound();
  return (
    <main id="main">
      <PageIntro
        label={data.name}
        title={data.label}
        accent="With a clear plan."
        description={data.description}
      />
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">The approach</p>
            <h2>
              Built around
              <br />
              <em>your business.</em>
            </h2>
            <p>{data.detail}</p>
            <a href="#start" className="button button-dark" data-cta="service">
              Discuss {data.name.toLowerCase()} <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="scope-list">
            <p className="eyebrow">What we can work on</p>
            {data.deliverables.map((item) => (
              <h3 key={item}>
                <Check size={18} />
                {item}
              </h3>
            ))}
            <p>The final scope, schedule, and investment are agreed in your proposal.</p>
          </div>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
