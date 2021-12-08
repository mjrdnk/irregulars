import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Heart from "../components/Heart";
import { irregulars } from "../utils/data";

export default function Game() {
  const [counter, setCounter] = useState(3);
  const [timer, setTimer] = useState(null);
  const [lives, setLives] = useState(2);

  useEffect(() => {
    setTimer(setInterval(() => setCounter((prevCount) => --prevCount), 1000));

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (counter < 0) {
      clearInterval(timer);
    }
  }, [counter]);

  return (
    <div className="">
      <Head>
        <title>Learn irregular English verbs</title>
        <meta name="description" content="Learn irregular English verbs" />
      </Head>

      <div className="">
        <Heart />
        <Heart />
        <Heart />
      </div>

      <main className="">
        {counter > -1 && (
          <p className="">{counter > 0 ? counter : "Let's go!"}</p>
        )}
      </main>
      <footer className="">
        <a href="mailto:maciej.jordanek@gmail.com">Contact developer</a>
      </footer>
    </div>
  );
}
