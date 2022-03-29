import { useRouter } from "next/router";
import Button from "../components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <main className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-6xl text-center font-bold">
          Welcome to Irregulars!
        </h1>
        <h2 className="text-xl text-center font-thing">
          Learn English irregular verbs!
        </h2>
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
