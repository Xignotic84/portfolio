import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function PageHead() {
  return <head>
    <title>Xignotic</title>
    <meta charSet="utf-8"/>
    <meta property="og:title" content={"Xignotic"} key="title"/>
    <meta name="description" content="Xignotic's portfolio"/>
    <meta property="keywords"
          content="xignotic,development,dev,xig,xiggy,programmer,developer,full-stack,fullstack,frontend,backend,franz herrmann, franz"/>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1HPYCRV7ND"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());

      gtag('config', 'G-1HPYCRV7ND');
    </script>
  </head>
}
