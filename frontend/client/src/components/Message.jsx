function Message({ msg, isOwn }) {
  return (
    <div className={`msg-row ${isOwn?"own":""}`}>
      <div className="msg-bubble">
        <div className="msg-user">{msg.user}</div>
        <div>{msg.text}</div>
      </div>
    </div>
  );
}
export default Message