import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../redux/actions";
import '../../src/index.css';


const FinalScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { score } = useSelector((state) => state);

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(10));
    history("/");
  };

    return (
      <div className="container">
        <h1 className="final-title">Final Score: {score} pts</h1>
        <button className="back" onClick={handleBackToSettings}>Back to Settings!</button>
      </div>
    );
  };
  
  export default FinalScreen;