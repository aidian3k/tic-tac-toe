import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch();
  const boardState = useSelector((state: any) => state.board);
  const moveState = useSelector((state: any) => state.move);
  const winner = useSelector((state: any) => state.winner);
  const timerState = useSelector((state: any) => state.timer);

  const getWinnerTsxElement = () => {
      if(winner === 'draw') {
          return (
              <p className={'text-xl text-center font-bold'}>The game ended in draw</p>
          )
      }

      return (
          <p className={'text-xl text-center font-bold'}>The winner is {winner}</p>
      )
  }

  useEffect(() => {
      const timerInterval = setTimeout(() => {
          dispatch({type: 'timer'})
      }, 1000);

      return () => {
          clearInterval(timerInterval)
      }
    }, [timerState]);

  return (
    <div className={'h-screen bg-gray-200 flex justify-center items-center flex-col'}>
        <div className={'mb-2 flex flex-col gap-2'}>
            <p className={'text-4xl font-bold text-center'}>Tic tac toe</p>
            <p className={'text-xl text-center'}>Next move: <span className={'font-bold'}>{moveState} ( {15 - timerState} [s] )</span></p>
            <button onClick={() => dispatch({type: 'restart'})} className={'bg-purple-400 rounded-full p-1 transition-all hover:scale-105 font-bold'}>Restart game</button>
            {winner && getWinnerTsxElement()}
        </div>
        <div className={'grid grid-cols-3 gap-1'}>
            {boardState.map((row: number[], rowIndex: number) => row.map((element, columnIndex: number) => {
                return (
                    <div onClick={() => dispatch({type: 'pressed', payload: {rowIndex: rowIndex, columnIndex: columnIndex}})} className={'bg-purple-400 rounded-2xl px-8 py-2 cursor-pointer hover:scale-110 transition-all'}>
                        <p className={'font-bold text-3xl'}>{element ?? '...'}</p>
                    </div>
                )
            }))}
        </div>
    </div>
  );
}

export default App;
