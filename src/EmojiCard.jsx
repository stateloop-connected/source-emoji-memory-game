import React from 'react'

function EmojiCard({ emoji, id, handleClick }) {
  return (
    <div className="emoji-card" onClick={() => handleClick(id)}>
      <span className="emoji">{emoji}</span>
    </div>
  );
}

export default EmojiCard