import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchNavigation, fetchGlobals } from "@/lib/directus";

function App({ Component, pageProps, mainNav, footerNav, globals }) {
  return (
    <>
      <Navbar navigation={mainNav} globals={globals} />
      <Component {...pageProps} />
      <Footer navigation={footerNav} globals={globals} />
    </>
  );
}

App.getInitialProps = async () => {
  const [mainNav, footerNav, globals] = await Promise.all([
    fetchNavigation("main"),
    fetchNavigation("footer"),
    fetchGlobals(),
  ]);

  return {
    mainNav,
    footerNav,
    globals,
  };
};

export default App;
