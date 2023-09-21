import { useEffect, useReducer } from "react";
import "./App.css";
import axios from "axios";

let initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED":
      return { ...state, questions: action.payload };
    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async () => {
    try {
      const data = await axios.get("http://localhost:8000/questions");
      dispatch({ type: "DATA_RECEIVED", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state);

  useEffect(() => {
    getData();
  }, []);
  return <>React</>;
}

export default App;
