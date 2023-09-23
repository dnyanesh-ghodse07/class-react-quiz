import React from "react";

const FinishScreen = ({ points, totalPoints, dispatch }) => {
  const percentage = (points / totalPoints) * 100;

  return (
    <div className="result">
      <p>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)})
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESET" })}
      >
        Restart
      </button>
    </div>
  );
};

export default FinishScreen;
