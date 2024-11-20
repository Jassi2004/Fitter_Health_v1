const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    workoutLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    workoutHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

    bio: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    dob: {
      type: Date,
    },
    caloriesHistory: [
      {
        date: {
          type: Date,
          required: true,
          default: Date.now, // Default to the current date
        },
        calories: {
          type: Number,
          required: true, // Calories burned on that day
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
