import Head from "next/head";
import "../styles/globals.css";
import mixpanel from "mixpanel-browser";

mixpanel.init("240ff6de12adf500c1d9eddc9770dc30", {
  debug: process.env.NODE_ENV !== "production",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Learn irregular English verbs</title>
        <meta name="description" content="Learn irregular English verbs" />
      </Head>
      <Component {...pageProps} />
      <footer className="fixed inset-x-0 bottom-0 text-center">
        <a
          href="mailto:maciej.jordanek@gmail.com"
          onClick={() => {
            mixpanel.track("contact developer");
          }}
        >
          Contact developer
        </a>
      </footer>
    </>
  );
}

export default MyApp;
