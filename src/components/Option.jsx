import React from "react";

const Option = ({ question, dispatch, answer }) => {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question?.options?.map((item, ind) => {
        return (
          <button
            key={ind}
            onClick={() => dispatch({ type: "NEW_ANSWER", payload: ind })}
            className={`btn btn-option ${ind === answer ? "answer" : ""} ${
              hasAnswer
                ? ind === question?.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hasAnswer}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Option;
