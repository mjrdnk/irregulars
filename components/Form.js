import React, { useCallback, useEffect, useState } from "react";
import { irregulars } from "../utils/data";
import Button from "./Button";

const raffleFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

export default function Form({ onMistake, setPoints, onCorrect }) {
  const [answer, setAnswer] = useState("");
  const [verb, setVerb] = useState(null);
  const [tense, setTense] = useState("");
  const [hintTense, setHintTense] = useState("");
  const [correct, setCorrect] = useState(false);

  const makeQuestion = useCallback(() => {
    const verbPick = raffleFromArray(
      irregulars.filter(
        (irregularVerb) => irregularVerb["Past-Participle"] !== ""
      )
    );
    const tenses = Object.keys(verbPick);
    const tenseToGuess = raffleFromArray(tenses);
    const availableTenses = tenses.filter((tense) => tense !== tenseToGuess);
    setHintTense(raffleFromArray(availableTenses));
    setVerb(verbPick);
    setTense(tenseToGuess);
  }, [setHintTense, setVerb, setTense]);

  useEffect(() => {
    makeQuestion();
  }, [makeQuestion]);

  const submitAnswer = () => {
    if (new RegExp(verb[tense].toLowerCase()).test(answer.toLowerCase())) {
      new Audio("/correct.mp3").play();
      setPoints((prevPoints) => prevPoints + 5);
      setCorrect(true);
      setTimeout(() => setCorrect(false), 1000);
      onCorrect();
    } else {
      new Audio("/fail.mp3").play();
      onMistake(verb[tense]);
    }
    setAnswer("");
    makeQuestion();
  };

  if (!verb) {
    return null;
  }

  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="answer">
        <p className="mb-4 text-lg">
          Write a <span className="font-bold">{tense}</span> form of{" "}
          <span className="underline">{verb[hintTense]}</span>:
        </p>
      </label>
      <div className="space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex flex-col sm:flex-row justify-center items-center">
        <input
          id="answer"
          className="border-4 border-black px-6 py-4 text-2xl"
          placeholder="Write answer here"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <Button onClick={submitAnswer}>
          <span>Answer</span>
        </Button>
      </div>
    </form>
  );
}
