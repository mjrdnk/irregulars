import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Heart from "../components/Heart";
import Form from "../components/Form";
import Button from "../components/Button";

export default function Game() {
  const router = useRouter();
  const [counter, setCounter] = useState(3);
  const [timer, setTimer] = useState(null);
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);

  const isHighScore = () => {
    if (typeof window !== "undefined") {
      const oldHighScore = window.localStorage.getItem("irregulars_game_score");
      return points > oldHighScore;
    }
    return false;
  };

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

  useEffect(() => {
    if (lives === 0 && typeof window !== "undefined") {
      window.localStorage.setItem("irregulars_game_score", points);
    }
  }, [lives]);

  return (
    <>
      {counter <= 0 && (
        <>
          {lives > 0 && (
            <div className="fixed left-0 text-2xl font-bold m-6">
              {points} points
            </div>
          )}
          <div className="fixed right-0 flex space-x-2 m-6">
            <Heart full={lives > 2} />
            <Heart full={lives > 1} />
            <Heart full={lives > 0} />
          </div>
        </>
      )}

      <main className="h-full flex flex-col justify-center items-center">
        {counter > -1 ? (
          <p className="text-6xl font-bold">
            {counter > 0 ? counter : "Let's go!"}
          </p>
        ) : (
          <>
            {lives > 0 ? (
              <Form
                onMistake={() => setLives((prevLives) => --prevLives)}
                setPoints={(newPoints) => {
                  setPoints(newPoints);
                }}
              />
            ) : (
              <div className="flex flex-col justify-center items-center text-center space-y-6">
                {isHighScore() ? (
                  <>
                    <p className="text-4xl font-bold">YOUR NEW HIGH SCORE!!!</p>
                    <p className="text-4xl font-bold">{points} points 🎉</p>
                  </>
                ) : (
                  <>
                    <p className="text-6xl font-bold">Game over 😭</p>
                    <p className="text-2xl font-bold">Your score: {points}</p>
                  </>
                )}
                <Button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      router.reload(window.location.pathname);
                    }
                  }}
                >
                  Start again
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
