import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchNavigation, fetchGlobals, fetchFormByKey, fetchCtaButtons } from "@/lib/directus";

function generateColorScale(hexColor) {
  if (!hexColor) return {};
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const lighten = (color, amount) => Math.min(255, Math.round(color + (255 - color) * amount));
  const darken = (color, amount) => Math.max(0, Math.round(color * (1 - amount)));
  
  const toHex = (r, g, b) => `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  
  return {
    50: toHex(lighten(r, 0.95), lighten(g, 0.95), lighten(b, 0.95)),
    100: toHex(lighten(r, 0.9), lighten(g, 0.9), lighten(b, 0.9)),
    200: toHex(lighten(r, 0.8), lighten(g, 0.8), lighten(b, 0.8)),
    300: toHex(lighten(r, 0.6), lighten(g, 0.6), lighten(b, 0.6)),
    400: toHex(lighten(r, 0.4), lighten(g, 0.4), lighten(b, 0.4)),
    500: hexColor,
    600: toHex(darken(r, 0.1), darken(g, 0.1), darken(b, 0.1)),
    700: toHex(darken(r, 0.25), darken(g, 0.25), darken(b, 0.25)),
    800: toHex(darken(r, 0.4), darken(g, 0.4), darken(b, 0.4)),
    900: toHex(darken(r, 0.55), darken(g, 0.55), darken(b, 0.55)),
  };
}

function App({ Component, pageProps, mainNav, footerNav, globals, ctaButtons, newsletterForm }) {
  const primaryColor = globals?.primary_color || globals?.theme?.primary_color;
  const colorScale = primaryColor ? generateColorScale(primaryColor) : null;
  
  return (
    <>
      {colorScale && (
        <style jsx global>{`
          :root {
            --primary-50: ${colorScale[50]};
            --primary-100: ${colorScale[100]};
            --primary-200: ${colorScale[200]};
            --primary-300: ${colorScale[300]};
            --primary-400: ${colorScale[400]};
            --primary-500: ${colorScale[500]};
            --primary-600: ${colorScale[600]};
            --primary-700: ${colorScale[700]};
            --primary-800: ${colorScale[800]};
            --primary-900: ${colorScale[900]};
          }
        `}</style>
      )}
      <Navbar navigation={mainNav} globals={globals} ctaButtons={ctaButtons} />
      <Component {...pageProps} />
      <Footer navigation={footerNav} globals={globals} newsletterForm={newsletterForm} />
    </>
  );
}

App.getInitialProps = async () => {
  const [mainNav, footerNav, globals, ctaButtons, newsletterForm] = await Promise.all([
    fetchNavigation("main"),
    fetchNavigation("footer"),
    fetchGlobals(),
    fetchCtaButtons(),
    fetchFormByKey("newsletter"),
  ]);

  return {
    mainNav,
    footerNav,
    globals,
    ctaButtons,
    newsletterForm,
  };
};

export default App;
