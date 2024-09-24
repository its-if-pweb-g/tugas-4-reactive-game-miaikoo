import React, { useState, useEffect } from "react";
import Input from "./Input";
import words from "./words.json";

const WordleBoard: React.FC = (): JSX.Element => {
  const [guesses, setGuesses] = useState<string[]>([...Array(6).fill("")]);
  const [solution, setSolution] = useState<string>("");
  const [usableWords, _] = useState<string[]>(words);

  useEffect((): void => {
    const fiveLetterWords: string[] = usableWords.filter(
      (word: string) => word.length === 5
    );

    const randomNumber: number = Math.floor(
      Math.random() * fiveLetterWords.length
    );
    setSolution(fiveLetterWords[randomNumber]);
  }, [usableWords]);

  useEffect((): void => {
    if (!solution) return;

    const hasWon: boolean = guesses.some((guess: string) => guess === solution);
    const validGuesses: string[] = guesses.filter((guess: string) => guess);

    if (hasWon) {
      alert("Congrats, you've won!");
      window.location.reload();
    } else if (validGuesses.length >= 6) {
      alert("You lost. The correct word was: " + solution);
      window.location.reload();
    }
  }, [solution, guesses]);

  return (
    <div>
      <h1>Wordle, but fruit ver!</h1>
      {guesses.map(
        (_, i: number): JSX.Element => (
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
    </div>
  );
};

export default WordleBoard;
