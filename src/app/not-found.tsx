import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <p className="eyebrow">404 / A slight detour</p>
      <h1>
        Let’s get you
        <br />
        <em>back on track.</em>
      </h1>
      <p>That page isn’t here. There’s plenty more to explore.</p>
      <Link className="button button-dark" href="/">
        Back to Inland <ArrowUpRight size={17} />
      </Link>
    </main>
  );
}
