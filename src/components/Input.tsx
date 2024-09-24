import React, { useState } from "react";

interface Props {
  index: number;
  setGuesses: (guesses: string[]) => void;
  guesses: string[];
  usableWords: string[];
  solution: string;
}

const Input: React.FC<Props> = ({
  index,
  setGuesses,
  guesses,
  usableWords,
  solution,
}: Props): JSX.Element => {
  const [currentGuess, setCurrentGuess] = useState<string[]>([...Array(5)]);

  const autoTab = (inputIndex: number, guessIndex: number): void => {
    document.getElementById(`${inputIndex}${guessIndex}`)?.focus();
  };

  const handleKeyUp = (e: React.KeyboardEvent, i: number): void => {
    let isCurrentGuessFull: boolean =
      currentGuess.filter((letter: string): string => letter && letter)
        .length === 5
        ? true
        : false;
    if (e.key === "Backspace") {
      let inputToGoToIndex: number = i - 1 >= 0 ? i - 1 : i;
      autoTab(inputToGoToIndex, index);
    } else if (i === 4 && e.key === "Enter" && isCurrentGuessFull) {
      handleSubmit();
      autoTab(0, index + 1);
    } else {
      let inputToGoToIndex: number = i + 1;
      autoTab(inputToGoToIndex, index);
    }
  };
  const handleSubmit = (): void => {
    let word: string = currentGuess.join("");
    if (usableWords.includes(word) && !guesses.includes(word)) {
      currentGuess.map((letter: string, i: number): void => {
        let input: HTMLElement | null = document.getElementById(`${i}${index}`);
        let letterElement: HTMLElement | null = document.getElementById(letter);
        if (letter == solution[i]) {
          if (input) input.style.backgroundColor = "green";
          if (letterElement) letterElement.style.backgroundClip = "green";
        } else if (solution.includes(letter)) {
          if (input) input.style.backgroundColor = "yellow";
          if (letterElement) letterElement.style.backgroundClip = "yellow";
        } else {
          if (input) input.style.backgroundColor = "gray";
          if (letterElement) letterElement.style.backgroundClip = "gray";
        }
        let newGuesses: string[] = [...guesses];
        newGuesses[index] = word;
        setGuesses(newGuesses);
      });
    } else {
      alert("Not a word.");
    }
  };
  return (
    <div>
      {currentGuess.map(
        (letter: string, i: number): JSX.Element => (
          <input
            key={i}
            type="text"
            id={`${i}${index}`}
            value={currentGuess[i]}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>): void => {
              let newCurrentGuess: string[] = currentGuess;
              newCurrentGuess[i] = value;
              setCurrentGuess(newCurrentGuess);
            }}
            onKeyUp={(e: React.KeyboardEvent) => handleKeyUp(e, i)}
            maxLength={1}
            minLength={1}
            required
          />
        )
      )}
    </div>
  );
};

export default Input;
