import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/Button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <main className="flex flex-col justify-center items-center space-y-12">
        <h1 className="text-6xl text-center">Welcome to Irregulars!</h1>
        <Button
          onClick={() => {
            router.push("game");
          }}
        >
          Press to play
        </Button>
      </main>
    </div>
  );
}
