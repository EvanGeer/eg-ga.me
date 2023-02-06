import { useState } from "react";
import { Game } from "../interfaces/Game";
import { User } from "../interfaces/User";

export function useGame(game: Game) {
    const [gameState, setGameState] = useState(game);

    function setPoints(playerIndex: number, points: number) {
        const updatedPlayers = [...gameState.players];
        updatedPlayers[playerIndex].points = points;
        const newGameState = {
            ...gameState,
            players: updatedPlayers,
        };
        setGameState(newGameState);
        console.log(newGameState);
    }

    return {gameState, setPoints, setGameState};
}
