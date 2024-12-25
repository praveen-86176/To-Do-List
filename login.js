
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

const signUpForm = document.querySelector(".sign-up-container form");
const signInForm = document.querySelector(".sign-in-container form");

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signUpForm.querySelector("input[placeholder='Name']").value;
    const email = signUpForm.querySelector("input[placeholder='Email']").value;
    const password = signUpForm.querySelector("input[placeholder='Password']").value;

    if (!name || !email || !password) {
        alert("All fields are required for sign up!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("Email is already registered. Please use a different email or sign in.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign-up successful! You can now log in.");
    
    signUpForm.reset();
    container.classList.remove("right-panel-active");
});

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signInForm.querySelector("input[placeholder='Email']").value;
    const password = signInForm.querySelector("input[placeholder='Password']").value;

    if (!email || !password) {
        alert("Both email and password are required to log in!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        const loginData = JSON.parse(localStorage.getItem("logins")) || [];
        const loginTime = new Date().toLocaleString();
        loginData.push({ name: user.name, email: user.email, time: loginTime });
        localStorage.setItem("logins", JSON.stringify(loginData));

        sessionStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));

        alert(`Welcome back, ${user.name}!\nLogin recorded at: ${loginTime}`);
        
        signInForm.reset();
        window.location.href = "Dashboard.html"; 
    } else {
        alert("Invalid email or password. Please try again.");
    }

});

localStorage.getItem("isLoggedIn") === "true"
  window.location.href = "dashboard.html";

// Check if sessionStorage is empty
if (!sessionStorage.length) {
    // Listen for the back button event
    window.addEventListener('popstate', function (event) {
      // Push the current state back to the history stack
      history.pushState(null, null, window.location.href);
      alert("Session storage is empty, back navigation is disabled!");
    });
  
    // Push a dummy state to the history stack
    history.pushState(null, null, window.location.href);
  }