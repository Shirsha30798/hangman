import languages from "./languages";
import Header from "./components/Header";
import Main from "./components/Main";
import { words } from "./words";
import { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

const alphabets = "abcdefghijklmnopqrstuvwxyz";

const wordCount = words.length;

function getRandomIndex() {
  return Math.floor(Math.random() * wordCount);
}

function App() {
  const [word, setWord] = useState(() => words[getRandomIndex()]);
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuesses = guessedLetters.filter(
    (letter) => !word.includes(letter),
  );
  const wrongGuessCount = wrongGuesses.length;

  const wordArr = word.split("");

  const allGuessed = wordArr.every((letter) => guessedLetters.includes(letter));

  const isGameWon = allGuessed;
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !word.includes(lastGuessedLetter);
  console.log(isLastGuessIncorrect);

  function onNewGame() {
    setWord(() => words[getRandomIndex()]);
    setGuessedLetters([]);
  }

  const styledLanguages = languages.map((language, index) => (
    <span
      key={language.name}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
      className={index < wrongGuessCount ? "dead" : ""}
    >
      {language.name}
    </span>
  ));

  const keyboardElements = alphabets.split("").map((button) => {
    const isGuessed = guessedLetters.includes(button);
    const isCorrect = isGuessed && word.includes(button);
    return (
      <button
        onClick={() => handleClick(button)}
        key={button}
        className={
          isCorrect
            ? "correct"
            : isGuessed && !word.includes(button)
              ? "wrong"
              : ""
        }
        disabled={isGuessed || isGameWon || isGameLost}
      >
        {button.toUpperCase()}
      </button>
    );
  });

  function handleClick(clickedLetter) {
    if (!guessedLetters.includes(clickedLetter)) {
      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters,
        clickedLetter,
      ]);
    }
  }

  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={400} />}
      <Header />
      <Main
        styledLanguages={styledLanguages}
        wordArr={wordArr}
        keyboardElements={keyboardElements}
        guessedLetters={guessedLetters}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        onNewGame={onNewGame}
        isLastGuessIncorrect={isLastGuessIncorrect}
        languages={languages}
        wrongGuessCount={wrongGuessCount}
      />
    </>
  );
}

export default App;
