import { useState } from "react"

function Input({sendMessage}) {
  const [text,setText]=useState("")

  const handleSend=()=>{
    sendMessage(text)
    setText("")
  };

  return (
    <div className="input">
      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Type message..."
        onKeyDown={(e)=>e.key==="Enter"&&handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Input