import { useEffect, useReducer } from "react";
import "./App.css";
import axios from "axios";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

let initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
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
      return {
        ...state,
        answer: action.payload,
      };
    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { status, questions, index, answer } = state;
  console.log(answer);
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

  const noOfQuestions = questions.length;
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
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
