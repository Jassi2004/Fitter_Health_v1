// components/MessageList.tsx
import MessageItem from './MessageItem';

type Message = {
  id: string;
  content: string;
  timestamp: number;
  isMine: boolean;
};

type MessageListProps = {
  messages: Message[];
};

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
