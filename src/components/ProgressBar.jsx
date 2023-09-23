import React from "react";

const ProgressBar = ({ index, noOfQuestions, points, totalPoints }) => {
  console.log(noOfQuestions);
  return (
    <div>
      <header className="progress">
        <progress min={0} max={noOfQuestions} value={index} />
        <p>
          Question <strong>{index + 1}</strong>/{noOfQuestions}
        </p>
        <p>
          Points : {points} / {totalPoints}
        </p>
      </header>
    </div>
  );
};

export default ProgressBar;
