import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Score() {
  const router = useRouter();
  const [isHighScore, setIsHighScore] = useState(false);
  const { points } = router.query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const oldHighScore = window.localStorage.getItem("irregulars_game_score");
      window.localStorage.setItem("irregulars_game_score", points);
      setIsHighScore(points ? points > oldHighScore : false);
    }
  }, [points]);

  return (
    <main className="h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center space-y-6">
        {isHighScore ? (
          <>
            <p className="text-4xl font-bold">YOUR NEW HIGH SCORE!!!</p>
            {points && <p className="text-4xl font-bold">{points} points 🎉</p>}
          </>
        ) : (
          <>
            <p className="text-6xl font-bold">Game over 😭</p>
            {points && (
              <p className="text-2xl font-bold">Your score: {points}</p>
            )}
          </>
        )}

        <Button
          onClick={() => {
            if (typeof window !== "undefined") {
              router.push("game");
              mixpanel.track("start again");
            }
          }}
        >
          Start again
        </Button>
      </div>
    </main>
  );
}
