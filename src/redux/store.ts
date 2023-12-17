import {createStore} from "redux";
import {initialTicTacToeState, ticTacToeReducer} from "./reducer";

export const store = createStore(ticTacToeReducer, initialTicTacToeState)