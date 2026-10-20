import { getFarewellText } from "../utils";

function Main(props) {
  const isGameOver = props.isGameWon || props.isGameLost;

  const blanks = props.wordArr.map((letter, index) => {
    const isGuessed = props.guessedLetters.includes(letter);
    const isMissed = props.isGameLost && !isGuessed;
    return (
      <span key={index} className={isMissed ? "missed" : ""}>
        {isGuessed ? letter : props.isGameLost ? letter : ""}
      </span>
    );
  });
  const lastWrongGuessIndex = props.wrongGuessCount - 1;

  // console.log(getFarewellText(props.languages[props.wrongGuessCount - 1].name));
  // console.log(props.wrongGuessCount);
  return (
    <main>
      <section
        className={
          isGameOver && props.isGameWon
            ? "game-status won"
            : isGameOver && props.isGameLost
              ? "game-status lost"
              : props.isLastGuessIncorrect
                ? "game-status farewell"
                : ""
        }
      >
        {isGameOver && props.isGameWon ? (
          <>
            <h2>You Win!</h2>
            <p>Well done! 🎉</p>
          </>
        ) : isGameOver && props.isGameLost ? (
          <>
            <h2>You loose!</h2>
            <p>Better start learning Assembly 😭</p>
          </>
        ) : props.isLastGuessIncorrect ? (
          <>{getFarewellText(props.languages[lastWrongGuessIndex].name)}</>
        ) : (
          ""
        )}
      </section>
      <section className="language-section">{props.styledLanguages}</section>
      <section className="blanks-section">{blanks}</section>
      <section className="keyboard-container">{props.keyboardElements}</section>
      {isGameOver && (
        <button onClick={props.onNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}

export default Main;
