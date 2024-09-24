import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Input from "./Input";

const WordleBoard: React.FC = (): JSX.Element => {
  const [guesses, setGuesses] = useState<string[]>([...Array(6)]);
  const [solution, setSolution] = useState<string>("");
  const [usableWords, setUsableWords] = useState<string[]>([]);
  useEffect((): void => {
    let words: string[] = require("an-array-of-english-words");
    let fiveLettersWords: string[] = words.filter(
      (word: string) => word.length === 5
    );
    setUsableWords(fiveLettersWords);
    let randomNumber: number = Math.floor(
      Math.random() * fiveLettersWords.length - 1
    );
    alert(fiveLettersWords[randomNumber]);
    setSolution(fiveLettersWords[randomNumber]);
  }, []);
  useEffect((): void => {
    alert(solution);
    let hasWon: boolean =
      guesses.filter((guess: string): boolean => guess == solution).length > 0
        ? true
        : false;
    let realGuesses: string[] = guesses.filter(
      (guess: string): string => guess && guess
    );
    if (hasWon) {
      alert("Congrats.");
      window.location.reload();
    } else if (realGuesses.length >= 6) {
      alert("You lost.");
      window.location.reload();
    }
  }, [solution, guesses]);
  return (
    <div>
      {guesses.map(
        (guess: string, i: number): JSX.Element => (
          <Input
            index={i}
            key={i}
            setGuesses={setGuesses}
            guesses={guesses}
            usableWords={usableWords}
            solution={solution}
          />
        )
      )}
      <Keyboard />
    </div>
  );
};

export default WordleBoard;
