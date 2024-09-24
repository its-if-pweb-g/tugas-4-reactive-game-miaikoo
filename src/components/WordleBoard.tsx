import React, { useState, useEffect } from "react";
import Input from "./Input";

const WordleBoard: React.FC = (): JSX.Element => {
  const [guesses, setGuesses] = useState<string[]>([...Array(6).fill("")]);
  const [solution, setSolution] = useState<string>("");
  const [usableWords, setUsableWords] = useState<string[]>([]);

  useEffect((): void => {
    const fetchWords = async () => {
      const { default: words } = await import("an-array-of-english-words");
      const fiveLetterWords: string[] = words.filter(
        (word: string) => word.length === 5
      );
      setUsableWords(fiveLetterWords);

      const randomNumber: number = Math.floor(
        Math.random() * fiveLetterWords.length
      );
      setSolution(fiveLetterWords[randomNumber]);
    };

    fetchWords();
  }, []);

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
      <h1>Wordle!</h1>
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
