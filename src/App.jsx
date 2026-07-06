import React,{useState,useEffect}from 'react';
import EmojiCard from './EmojiCard';
import "./App.css";
function App() {
  const EmojiList=[
    { id:1,emoji:'🤔'},
    {id:2,emoji:'😀'},
    {id:3,emoji:'😎'},
    {id:4,emoji:'❤️'},
    {id:5,emoji:'😡'},
    {id:6,emoji:'😍'},
    {id:7,emoji:'😴'},
    {id:8,emoji:'🤯'},
    {id:9,emoji:'😇'},
    {id:10,emoji:'🤪'},
    {id:11,emoji:'👻'},
    {id:12,emoji:'😤'},
    {id:13,emoji:'😢'},
    {id:14,emoji:'🤷‍♂️'},
    {id:15,emoji:'😘'},
    {id:16,emoji:'🥰'},
    {id:17,emoji:'😷'},
    {id:18,emoji:'🤒'},
    {id:19,emoji:'🤕'},
    {id:20,emoji:'🤢'},
    {id:21,emoji:'🤮'},
    {id:22,emoji:'🤧'},
    {id:23,emoji:'😵'},
    {id:24,emoji:'🤐'},
    {id:25,emoji:'🤨'},
    {id:26,emoji:'😐'},
    {id:27,emoji:'😑'},
    {id:28,emoji:'😶'},
    {id:29,emoji:'😏'},
    {id:30,emoji:'😒'}
  ];

  const [clickedEmojis, setClickedEmojis] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [emojiList, setEmojiList] = useState(EmojiList);
  const [bestScore, setBestScore] = useState(() => {
    const savedScore = localStorage.getItem('Bestscore');
    return savedScore ? Number(savedScore) : 0;
  });

  useEffect(() => {
    localStorage.setItem('Bestscore', bestScore);
  }, [bestScore]);

  const shuffleEmojis = (list) => {
    return [...list].sort(() => Math.random() - 0.5);
  };

  const handleClick = (id) => {
    if (clickedEmojis.includes(id)) {
      setGameStatus("lost");
      if (score > bestScore) {
        setBestScore(score);
      }
    } else {
      const newScore = score + 1;
      setClickedEmojis([...clickedEmojis, id]);
      setScore(newScore);
      setEmojiList(shuffleEmojis(emojiList));

      if (newScore === EmojiList.length) {
        setGameStatus("Won");
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
      }
    }
  };
  const restartGame = () => {
    setClickedEmojis([]);
    setScore(0);
    setGameStatus('playing');
    setEmojiList(shuffleEmojis(EmojiList));
  };

  return (
    <div className="container">
      <h1> Emoji Memory Game</h1>
      <div className="score-board">
        <p> Score: {score} </p>
        <p> BestScore : {bestScore} </p>
      </div>
      {gameStatus === "playing" && (
        <div className="emoji-grid">
          {emojiList.map((item) => (
            <EmojiCard
              key={item.id}
              emoji={item.emoji}
              id={item.id}
              handleClick={handleClick}
            />
          ))}
        </div>
      )}
      {gameStatus === "Won" && (
        <div className="result">
          <h2>🥳 You Won</h2>
          <button onClick={restartGame}>play Again</button>
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="result">
          <h2>😧 Game Over</h2>
          <button onClick={restartGame}> Try again</button>
        </div>
      )}
                
      

    </div>
  )
}

export default App