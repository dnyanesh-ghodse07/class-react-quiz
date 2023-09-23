import React from "react";

const NextButton = ({ dispatch, answer, noOfQuestions, index }) => {
  if (answer === null) {
    return;
  }

  if (index < noOfQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "NEXT" })}>
        Next
      </button>
    );
  }

  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "FINISH" })}
      >
        Finish
      </button>
    </div>
  );
};

export default NextButton;
