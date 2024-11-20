const express = require('express');
const http = require('http');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const { initSocket } = require('./config/socket');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const followerRoutes = require("./routes/followerRoutes")
const caloriesRoutes = require("./routes/caloriesRoutes")
const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

initSocket(server);

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/calories', caloriesRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/posts', postRoutes);

app.use('/users', followerRoutes);

connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
