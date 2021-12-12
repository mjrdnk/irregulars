import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Heart from "../components/Heart";
import Form from "../components/Form";

export default function Game() {
  const router = useRouter();
  const [counter, setCounter] = useState(3);
  const [timer, setTimer] = useState(null);
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState(false);

  const onMistake = (correctAnswer) => {
    setAnswer(correctAnswer);
    setLives((prevLives) => --prevLives);
    setTimeout(() => setAnswer(""), 2000);
  };

  useEffect(() => {
    setTimer(setInterval(() => setCounter((prevCount) => --prevCount), 1000));

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (counter < 0) {
      clearInterval(timer);
    }
  }, [counter, timer]);

  useEffect(() => {
    if (lives === 0) {
      const query = points ? `?points=${points}` : "";
      router.push("score" + query);
    }
  }, [lives, router, points]);

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
            {answer ? (
              <p className="text-6xl font-bold">{answer}</p>
            ) : (
              <>
                {success ? (
                  <p className="text-6xl">
                    &nbsp;&nbsp;&nbsp;🎉&nbsp;&nbsp;&nbsp;
                  </p>
                ) : (
                  <Form
                    onMistake={onMistake}
                    setPoints={(newPoints) => {
                      setPoints(newPoints);
                    }}
                    onCorrect={() => {
                      setSuccess(true);
                      setTimeout(() => setSuccess(false), 1000);
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
