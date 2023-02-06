import { Player } from "./Player";

export interface Game {
    id: string,
    name: string,
    // ownerId: string,
    /** sorted by player order */
    players: Player[],
    /** index of current player */
    turn: number,
    isActive: boolean,
    winnerIndex?: string,
}

