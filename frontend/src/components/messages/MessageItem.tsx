// components/MessageItem.tsx
type Message = {
    id: string;
    content: string;
    timestamp: number;
    isMine: boolean;
  };
  
  type MessageItemProps = {
    message: Message;
  };
  
  const MessageItem = ({ message }: MessageItemProps) => {
    return (
      <div className={`message-item ${message.isMine ? 'my-message' : 'their-message'}`}>
        <p>{message.content}</p>
        <small>{new Date(message.timestamp).toLocaleString()}</small>
      </div>
    );
  };
  
  export default MessageItem;
  