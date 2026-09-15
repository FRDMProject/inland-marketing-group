"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="not-found container">
      <p className="eyebrow">A brief interruption</p>
      <h1>
        Something didn’t
        <br />
        <em>load as expected.</em>
      </h1>
      <p>Please try again. Any unsent inquiry will need to be entered again.</p>
      <button className="button button-dark" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
