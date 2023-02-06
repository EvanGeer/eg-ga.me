import React, { useEffect, useState } from "react";
import logo from "./images/logo.svg";
import "./App.css";
import Login from "./firebase/Login";
import { PlayerCard } from "./components/PlayerCard";
import { Player } from "./interfaces/Player";
import { User } from "./interfaces/User";
import { Game } from "./interfaces/Game";
import { useGame } from "./components/useGame";
import { get, onValue, ref, set } from "firebase/database";
import { database } from "./firebase/auth";
// import { randomUUID } from 'crypto';
// import { User } from 'firebase/auth';

function getNewGame(ownerId: string, name: string): Game {
  return {
    id: crypto.randomUUID(),
    name: name,
    // ownerId: ownerId,
    players: [
      {
        name: "Player 1",
        points: 0,
      },
      {
        name: "Player 2",
        points: 0,
      },
    ],
    turn: 0,
    isActive: true,
  };
}

function App() {
  let db = database;
  const [user, setUser] = React.useState<User | null | undefined>();
  const [games, setGames] = useState<any>();
  const [game, setGame] = useState<Game>(); // todo: remove this, since it is not needed and can cause confusion... use curent index/id instead
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(-1);

  // useEffect(() => {
  //   console.log(`game updated to ${game?.id ?? '[null]'}`);
  //   if (!game) return;
  // }, [game]);

  useEffect(() => {
    console.log("user updated...");
    if (!user) return;

    onValue(ref(db, `games/${user?.uid}/`), (snapshot) => {
      const data = snapshot?.val();
      console.log(`game updated from remote`);
      console.log(data);

      setGames(data);
      setLoaded(false);
      setLoaded(true);

    });

    if(!user) setGame(null);
  }, [user]);

  function handlePointsChange(i: number, newScore: number) {
    console.log(`handle points change`)
    const newGame = { ...games[game.id] };
    newGame.players = [...newGame.players];
    newGame.players[i].points = newScore;

    newGame.players.forEach((x,i) => console.log(`${game.players[i].points} =>> ${x.points}`))

    
    setGame(newGame);
    set(ref(db, `games/${user?.uid}/${game.id}`), newGame);
  }

  function handleLogin(user: User | null | undefined) {
    console.log(`user logged in ${user?.displayName ?? "null"}`);
    if (!user) return;

    setUser(user);
  }

  // function handleGameChange(gameId) {
  //   setGame(games[gameId]);
  // }

  function getGames() {
    if (!games) return null;
    const gArr: Game[] = [];
    for (const prop in games) {
      gArr.push(games[prop]);
    }

    return gArr;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Login onLogIn={handleLogin} />
        {loaded ? (
          <div>
            {getGames()?.map((x) => (
              <button key={x.id} onClick={() => setGame(x)} type="button">
                {x.name}
              </button>
            ))}
            <br />
          </div>
        ) : null}

        { game && game?.players ?
        games[game.id].players.map((p: Player, i: number) => {
          console.log(games);
          console.log(`inline render ${p.points}`);
          console.log(p);

          return <PlayerCard
          key={p.name}
          initialScore={p.points}
          playerName={p.name}
          onPointsChange={(points) => handlePointsChange(i, points)}
          />
        }
        ) : null}
      </header>
    </div>
  );
}

export default App;
