import { CHANGE_AMOUNT, CHANGE_CATEGORY, CHANGE_SCORE } from "./actionsTypes";

const initialState = {
    question_category: "",
    question_difficulty: "medium",
    question_type: "multiple",
    amount_of_question: 10,
    score: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                question_category: action.payload,
            };
        case CHANGE_AMOUNT:
            return {
                ...state,
                amount_of_question: action.payload,
            };
        case CHANGE_SCORE:
            return {
                ...state,
                score: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;