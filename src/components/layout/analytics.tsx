import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { GOOGLE_ANALYTICS_ID, RYBBIT_PROXY_PATH, RYBBIT_SITE_ID } from "@/lib/analytics";

export function Analytics() {
  return (
    <>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
      <Script src={`${RYBBIT_PROXY_PATH}/script.js?siteId=${RYBBIT_SITE_ID}`} strategy="afterInteractive" />
    </>
  );
}
