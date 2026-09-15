import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ContactSection, PageIntro, ProjectPreview } from "@/components/sections";
import { pageMeta } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ project: string }> }) {
  const slug = (await params).project;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return pageMeta(`${project.name} — Design Concept`, project.brief, `/work/${slug}`);
}
export default async function Page({ params }: { params: Promise<{ project: string }> }) {
  const slug = (await params).project;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <main id="main">
      <PageIntro
        label={`${project.category} / Original concept`}
        title={project.name}
        accent={project.title}
        description={project.brief}
      />
      <section className="section project-detail">
        <div className="container">
          <ProjectPreview project={project} large />
          <div className="editorial-grid">
            <div>
              <p className="eyebrow">The thinking behind it</p>
              <h2>
                A distinct
                <br />
                <em>point of view.</em>
              </h2>
              <p>{project.brief}</p>
              <p className="concept-label">
                Exploratory design. This is not a live client website.
              </p>
            </div>
            <div className="scope-list">
              {project.details.map((item) => (
                <h3 key={item}>{item}</h3>
              ))}
              <Link href="/work" className="text-link">
                Back to the design lab <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
