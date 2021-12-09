import React, { useEffect, useState } from "react";
import { irregulars } from "../utils/data";
import Button from "./Button";

const raffleFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

export default function Form({ onMistake, setPoints }) {
  const [answer, setAnswer] = useState("");
  const [verb, setVerb] = useState(null);
  const [tense, setTense] = useState("");
  const [hintTense, setHintTense] = useState("");

  const makeQuestion = () => {
    const verbPick = raffleFromArray(irregulars);
    const tenses = Object.keys(verbPick);
    const tenseToGuess = raffleFromArray(tenses);
    const availableTenses = tenses.filter((tense) => tense !== tenseToGuess);
    setHintTense(raffleFromArray(availableTenses));
    setVerb(verbPick);
    setTense(tenseToGuess);

    console.log(verb);
  };

  useEffect(() => {
    makeQuestion();
  }, []);

  const submitAnswer = () => {
    if (new RegExp(verb[tense]).test(answer)) {
      setPoints((prevPoints) => prevPoints + 5);
    } else {
      onMistake();
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
      <label for="answer">
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
        <Button onClick={submitAnswer}>Answer</Button>
      </div>
    </form>
  );
}
