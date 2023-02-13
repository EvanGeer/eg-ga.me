import { useState } from "react";
import { Player } from "../interfaces/Player";
import "./PlayerCard.css"

export function PlayerCard({ playerName, initialScore, onPointsChange }
    : { playerName: string, initialScore: number, onPointsChange: (newScore: number) => void }) {

    console.log(`PlayerCard rendered ${initialScore}`);

    // const [points, setPoints] = useState(initialScore);
    function add(i: number) {
        // const newPoints = points + i;
        const newPoints = initialScore + i;
        console.log(`${playerName}: ${initialScore}-->${newPoints}`);
        // console.log(`onPointsChange(${i})`);
        onPointsChange(newPoints);
    }

    return <div className="player-card">
        <div>{playerName}</div>
        <div className="point-grid">
            <button type='button'
                className="increment-button minus-1"
                onClick={() => add(-1)}>-</button>
            <div className="score">{initialScore}</div>
            <button type='button'
                className="increment-button plus-1"
                onClick={() => add(1)}>+</button>
            <button type='button'
                className="increment-button plus-10"
                onClick={() => add(10)}>+10</button>
            <button type='button'
                className="increment-button plus-5"
                onClick={() => add(5)}>+5</button>
            <button type='button'
                className="increment-button minus-10"
                onClick={() => add(-10)}>-10</button>
            <button type='button'
                className="increment-button minus-5"
                onClick={() => add(-5)}>-5</button>        </div>
    </div>
}