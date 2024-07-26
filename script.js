document.addEventListener('DOMContentLoaded', () => {
    // Sign Up Form Handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const birthday = document.getElementById('birthday').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;

            const userData = {
                username,
                password,
                birthday,
                phone,
                address
            };

            localStorage.setItem(username, JSON.stringify(userData));

            alert('Sign Up Successful!');

            window.location.href = 'login.html';
        });
    }

    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const storedUser = localStorage.getItem(username);

            if (storedUser) {
                const userData = JSON.parse(storedUser);
                if (userData.password === password) {
                    alert('Login Successful!');
                    localStorage.setItem('loggedInUser', username);
                    window.location.href = 'index.html';
                } else {
                    alert('Incorrect password. Please try again.');
                }
            } else {
                alert('User not found. Please sign up.');
            }
        });
    }

    // Update Navbar based on Login Status
    const authLinks = document.getElementById('auth-links');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser));
        authLinks.innerHTML = `<li><a href="#">${userData.username}</a></li>`;
    }
    document.addEventListener('DOMContentLoaded', () => {
    const editProfileForm = document.getElementById('editProfileForm');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (editProfileForm && loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser));

        // Populate the form with existing user data
        document.getElementById('username').value = userData.username;
        document.getElementById('password').value = userData.password;
        document.getElementById('birthday').value = userData.birthday;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('address').value = userData.address;

        editProfileForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const updatedData = {
                username: userData.username, // Username remains the same
                password: document.getElementById('password').value,
                birthday: document.getElementById('birthday').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            };

            localStorage.setItem(updatedData.username, JSON.stringify(updatedData));
            alert('Profile updated successfully!');
        });
    }
});

});
