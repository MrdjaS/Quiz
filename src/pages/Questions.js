import { CircularProgress, } from "@mui/material";
import { Box } from "@mui/system";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../redux/actions";
import { decode } from "html-entities";
import '../../src/index.css';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  console.log(
    question_category,
    question_difficulty,
    question_type,
    amount_of_question
  );

  const history = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 10));
    } else {
      dispatch(handleScoreChange(score - 5));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      history("/score");
    }
  };

  const handleSkip = () => {
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
      dispatch(handleScoreChange(score - 5));
    } else {
      history("/score");
    }
  };

  return (
    <div className="container">
      <div className="score">
        <p>Score: {score} / {amount_of_question * 10} pts</p>
      </div>
      <p>Question {questionIndex + 1} </p>
      <h2>{decode(response.results[questionIndex].question)}</h2>
      <div className="wrapper">
      {options.map((data, id) => (
        <div key={id}>
          <button className="answer" onClick={handleClickAnswer}>{decode(data)}</button>
        </div>
      ))}
      </div>
      <div>
        <button className="skip" onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
};

export default Questions;
