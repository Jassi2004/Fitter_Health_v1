
type Participant = {
    name: string;
  };
  
  const ChatHeader = ({ participant }: { participant: Participant }) => {
    return (
      <div className="chat-header">
        <h2>Chat with {participant.name}</h2>
      </div>
    );
  };
  
  export default ChatHeader;
  