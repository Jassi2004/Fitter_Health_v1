const socketIo = require('socket.io')
const initSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  // Add heartbeat to check connection
  io.use(async (socket, next) => {
    const token = socket.handshake.query.token;

    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.user.name);

    // Add room joining for private conversations
    socket.on('joinRoom', (conversationId) => {
      socket.join(conversationId);
    });

    socket.on('sendMessage', (message) => {
      // Emit only to the specific conversation room
      socket.to(message.conversationId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.user.name);
    });
  });
};
module.exports = {initSocket};