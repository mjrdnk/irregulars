import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Learn irregular English verbs</title>
        <meta name="description" content="Learn irregular English verbs" />
      </Head>
      <Component {...pageProps} />
      <footer className="fixed inset-x-0 bottom-0 text-center">
        <a href="mailto:maciej.jordanek@gmail.com">Contact developer</a>
      </footer>
    </>
  );
}

export default MyApp;
