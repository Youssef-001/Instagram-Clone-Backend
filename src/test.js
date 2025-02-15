async function fetchGoogleProtectedResource() {
    const response = await fetch('http://localhost:3001/auth/protected', {
        method: 'GET',
        credentials: 'include' // Important for cookies to be sent with the request
    });

    const data = await response.text();
    console.log(data); // Should return "You are authenticated with google" if logged in
}