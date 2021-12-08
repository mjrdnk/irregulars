import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-full">
      <Head>
        <title>Learn irregular English verbs</title>
        <meta name="description" content="Learn irregular English verbs" />
      </Head>

      <main className="">
        <h1 className="text-4xl">Welcome to Irregulars!</h1>
        <button
          className=""
          onClick={() => {
            router.push("game");
          }}
        >
          Press to play
        </button>
      </main>
      <footer className="">
        <a href="mailto:maciej.jordanek@gmail.com">Contact developer</a>
      </footer>
    </div>
  );
}
