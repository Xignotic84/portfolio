export default function GoogleAnalytics() {
  return <>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1HPYCRV7ND"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());

      gtag('config', 'G-1HPYCRV7ND');
    </script>
  </>
}
