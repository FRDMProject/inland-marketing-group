"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
const analyticsId = process.env.NEXT_PUBLIC_GA_ID;
function getConsent() {
  try {
    return localStorage.getItem("idg-analytics") === "yes";
  } catch {
    return false;
  }
}
export function track(event: string, detail: Record<string, string> = {}) {
  // Never pass name, email, phone, message, URL queries, or user-entered text.
  if (getConsent() && analyticsId) window.gtag?.("event", event, detail);
}
export function PrivacySettings() {
  if (!analyticsId) return null;
  return (
    <button
      className="privacy-settings"
      onClick={() => window.dispatchEvent(new Event("idg:privacy"))}
    >
      Cookie choices
    </button>
  );
}
export function Tracking() {
  const path = usePathname();
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState(false);
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    try {
      setConsent(getConsent());
      setBanner(!!analyticsId && localStorage.getItem("idg-analytics") === null);
    } catch {
      /* no storage: no analytics */
    }
    const show = () => setBanner(true);
    const click = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[data-cta]");
      if (element)
        track("cta_click", { placement: element.dataset.cta || "site", path: location.pathname });
    };
    window.addEventListener("idg:privacy", show);
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("idg:privacy", show);
      document.removeEventListener("click", click);
    };
  }, []);
  useEffect(() => {
    if (consent && ready)
      window.gtag?.("event", "page_view", {
        page_location: `${location.origin}${path}`,
        page_title: document.title,
        page_referrer: document.referrer.split("?")[0],
      });
  }, [consent, ready, path]);
  const choose = (allow: boolean) => {
    try {
      localStorage.setItem("idg-analytics", allow ? "yes" : "no");
    } catch {
      /* preference stays in memory */
    }
    setConsent(allow);
    setBanner(false);
    if (!allow) {
      window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied" });
      location.reload();
    }
  };
  return (
    <>
      {consent && analyticsId && /^G-[A-Z0-9]+$/.test(analyticsId) && (
        <>
          <Script id="analytics-init">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${analyticsId}',{send_page_view:false});`}</Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
            strategy="afterInteractive"
            onReady={() => setReady(true)}
          />
        </>
      )}
      {banner && (
        <aside className="consent-banner" aria-label="Analytics preferences">
          <p>
            May we use optional analytics to understand how this website is used? Your inquiry works
            either way.
          </p>
          <div>
            <button onClick={() => choose(false)}>No thanks</button>
            <button onClick={() => choose(true)}>Allow analytics</button>
          </div>
        </aside>
      )}
    </>
  );
}
