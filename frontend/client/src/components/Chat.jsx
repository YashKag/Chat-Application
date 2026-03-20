import { useEffect,useState,useRef } from "react"
import io from "socket.io-client"
import Message from "./Message.jsx"
import Input from "./Input.jsx"
import "./chat.css"

const socket=io("https://chat-application-fjtx.onrender.com")
function Chat() {
  const [messages,setMessages]=useState([])
  const [user,setUser]=useState("")
  const bottomRef=useRef(null)
  useEffect(()=>{
    const username= prompt("(Backend deploy on render intial start may take some time 50 sec to 1 min)Enter your name:")
    setUser(username||"Anonymous")

    socket.on("messageHistory",(data)=>{
      setMessages(data)
    })
    socket.on("receiveMessage",(msg)=>{
      setMessages((prev)=>[...prev, msg])
    })
    return ()=>socket.off()
  },[])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior:"smooth"})
  }, [messages]);

  const sendMessage=(text)=>{
    if (!text.trim()) return

    socket.emit("sendMessage",{
      text,
      user,
    });
  };

  return (
    <div className="chat">
      (Backend deploy on render intial start may take some time 50 sec to 1 min)
      <div className="header">💬 Chat </div>
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} isOwn={msg.user === user} />
        ))}
        <div ref={bottomRef} />
      </div>
      <Input sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;