// components/MessageInput.tsx
import { useState } from 'react';

type MessageInputProps = {
  onSend: (content: string) => void;
};

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    onSend(content);
    setContent('');
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
