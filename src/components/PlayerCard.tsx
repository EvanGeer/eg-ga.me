import { useState } from "react";
import { Player } from "../interfaces/Player";

export function PlayerCard({playerName, initialScore, onPointsChange} 
    : {playerName: string, initialScore: number, onPointsChange: (newScore:number) => void}) {

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
        <button type='button' onClick={() => add(-1)}>-</button>
        &nbsp;{initialScore}&nbsp;
        <button type='button' onClick={() => add(1)}>+</button>
    </div>
}