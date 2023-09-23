import { useEffect, useReducer } from "react";
import "./App.css";
import axios from "axios";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";

let initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED":
      return { ...state, questions: action.payload, status: "ready" };
    case "DATA_FAILED":
      return { ...state, status: "error" };
    case "START":
      return { ...state, status: "active" };
    case "NEW_ANSWER":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NEXT":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "FINISH":
      return {
        ...state,
        status: "finish",
      };
    case "RESET":
      return {
        ...initialState,
        question: state.questions,
        status: "ready",
      };
    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { status, questions, index, answer, points } = state;

  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  const getData = async () => {
    try {
      const data = await axios.get("http://localhost:8000/questions");
      dispatch({ type: "DATA_RECEIVED", payload: data.data });
    } catch (error) {
      dispatch({ type: "DATA_FAILED" });
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const noOfQuestions = questions?.length;

  return (
    <div>
      <Main>
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Something went wrong !</p>}
        {status === "ready" && (
          <StartScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              noOfQuestions={noOfQuestions}
              points={points}
              totalPoints={totalPoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              noOfQuestions={noOfQuestions}
            />
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            noOfQuestions={noOfQuestions}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
