import React from "react";

const StartScreen = ({ noOfQuestions, dispatch }) => {
  return (
    <div className="start">
      <h1>Welcome</h1>
      <h3>{noOfQuestions} no of questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "START" })}
      >
        Start !
      </button>
    </div>
  );
};

export default StartScreen;
