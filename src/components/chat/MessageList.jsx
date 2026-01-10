import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

export default function MessageList() {
  const { chats, activeChatId } = useSelector(s => s.chat);
  const chat = chats.find(c => c.id === activeChatId);

  return (
    <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
      {chat.messages.map(msg => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}
