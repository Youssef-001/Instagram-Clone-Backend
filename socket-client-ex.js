const socket = io("http://localhost:3000");

// After login, register the user with their userId
socket.emit("registerUser", userId);

// Listen for notifications
socket.on("notification", (data) => {
    console.log("New notification:", data.message);
    
    // Handle different types of notifications
    switch (data.type) {
        case 'message':
            showMessageNotification(data.message);
            break;
        case 'follow':
            showFollowNotification(data.message);
            break;
        case 'like':
            showLikeNotification(data.message);
            break;
        default:
            showDefaultNotification(data.message);
    }
});

// Function to display message notification
function showMessageNotification(message) {
    console.log("Message Notification:", message);
    // Display it in UI
}

// Function to display follow notification
function showFollowNotification(message) {
    console.log("Follow Notification:", message);
    // Display it in UI
}

// Function to display like notification
function showLikeNotification(message) {
    console.log("Like Notification:", message);
    // Display it in UI
}

// Function to display any other notification
function showDefaultNotification(message) {
    console.log("Other Notification:", message);
    // Display it in UI
}







const sockett = io("http://localhost:3000");  // Initialize socket connection

// After login, register the user with their userId
sockett.emit("registerUser", userId);

// Function to follow a user
function followUser(followerId, followingId) {
    // Step 1: Make API request to persist the follow action
    fetch('/api/follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerId, followingId }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log(`Successfully followed user ${followingId}`);
            
            // Step 2: Trigger the WebSocket event to notify the followed user in real time
            socket.emit('followUser', { followerId, followingId });

        } else {
            console.log('Error following user:', data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Example usage: User with id 1 follows user with id 2
followUser(1, 2);
