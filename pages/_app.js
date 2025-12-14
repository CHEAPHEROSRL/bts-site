import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchNavigation, fetchGlobals, fetchFormByKey, fetchCtaButtons } from "@/lib/directus";

function App({ Component, pageProps, mainNav, footerNav, globals, ctaButtons, newsletterForm }) {
  return (
    <>
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
