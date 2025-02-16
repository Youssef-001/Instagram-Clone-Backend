# Instaclone 📸
A social media platform inspired by Instagram. Users can share posts, like, comment, and follow others.

**Link to Design Document** : https://docs.google.com/document/d/1m5-r7Kl_IPv0Pn-jE2xdMstcGhx50hBvOE2cz1NY0TI/edit?usp=sharing

## 🛠 Tech Stack
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend:** React, Tailwind
- **Authentication:** JWT, Google Auth
- **Storage:** Cloudinary  (for images)
- **Realtime Features:** WebSockets (if implementing live chat)

## 🚀 Features

### 🔐 Authentication & Security
- [✅] User signup, login, and logout using JWT-based authentication.
- [✅] OAuth2 social login with Google.
- [✅] Secure password hashing and session management.

### 👥 User Profiles & Social Features
- [ ] User profiles with bio, profile picture, and posts.
- [ ] Follow/unfollow functionality.
- [ ] Follower and following count display.
- [ ] User suggestions based on connections.

### 📸 Posts & Media Uploads
- [ ] Create posts with images and captions.
- [ ] Support for multiple images/videos per post (carousel).
- [ ] Cloudinary integration for media storage and optimization.

### ❤️ Likes, Comments & Engagement
- [ ] Like/unlike posts.
- [ ] Comment on posts, reply to comments, and delete own comments.
- [ ] Threaded comments with parent-child relationships.

### 🎭 Stories (Optional)
- [ ] Temporary 24-hour stories.
- [ ] View counts for stories.

### 💬 Direct Messages
- [ ] Real-time private messaging between users.
- [ ] WebSocket (Socket.io) for instant updates.
- [ ] Message deletion support.

### 🔔 Real-Time Features
- [ ] Live notifications for likes, comments, follows.
- [ ] WebSockets for instant updates.
- [ ] Real-time DMs with instant message delivery.

### ⚡ Performance & Optimization
- [ ] PostgreSQL with indexed queries for fast data retrieval.
- [ ] Redis caching for optimized performance.
- [ ] Cloudinary for efficient media handling.

### 📱 Responsive UI/UX
- [ ] Fully responsive design across all devices.
