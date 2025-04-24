import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// ✅ Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAKhSgYstwtUd7UWUUjjX4AgzQ-SwLgBY",
    authDomain: "automatedvalunerbilityscanner.firebaseapp.com",
    projectId: "automatedvalunerbilityscanner",
    storageBucket: "automatedvalunerbilityscanner.appspot.com", // ✅ Fixed
    messagingSenderId: "157917726185",
    appId: "1:157917726185:web:732954aba38d42867cb778",
    measurementId: "G-NNPW54BY1F"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

// ✅ Google Sign-In Function
function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('Google Sign-In Success:', user);
            alert(`Welcome ${user.displayName}`);
            if (user.email === "admin@gmail.com") {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "home.html";
            }
        })
        .catch((error) => {
            console.error('Google Sign-In Error:', error);
            alert("Google Sign-In Failed: " + error.message);
        });
}

// ✅ Forgot Password
function forget() {
    const email = document.getElementById("forgot-email").value;
    if (!email) return alert("Please enter your email address.");

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
            document.querySelector('.form-wrapper.active').classList.remove('active');
            document.getElementById('login-form').classList.add('active');
        })
        .catch((error) => {
            console.error('Reset Password Error:', error);
            alert(error.message);
        });
}

// ✅ Sign Up
function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!email || !password) return alert("Please fill all fields");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Account created: " + user.email);
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error('SignUp Error:', error);
            alert(error.message);
        });
}

// ✅ Sign In
function signin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) return alert("Please fill all fields");

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Login Success:', user);
            if (email === "admin@gmail.com") {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "home.html";
            }
        })
        .catch((error) => {
            console.error('Login Error:', error);
            alert("Login Failed: " + error.message);
        });
}

// ✅ Form Navigation and Event Binding
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotForm = document.getElementById('forgot-form');

    const toggleLinks = document.querySelectorAll('.toggle-form');
    const forgotPasswordLink = document.querySelector('.forgot-password');

    // Toggle forms
    function showForm(formToShow) {
        [loginForm, signupForm, forgotForm].forEach(form => form.classList.remove('active'));
        formToShow.classList.add('active');
    }

    toggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('data-target');
            showForm(document.getElementById(`${target}-form`));
        });
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        showForm(forgotForm);
    });

    // Form submissions
    document.getElementById('login').addEventListener('submit', (e) => {
        e.preventDefault();
        signin();
    });

    document.getElementById('signup').addEventListener('submit', (e) => {
        e.preventDefault();
        signup();
    });

    document.getElementById('forgot').addEventListener('submit', (e) => {
        e.preventDefault();
        forget();
    });

    // Google Sign-in buttons
    document.getElementById('google-login').addEventListener('click', googleSignIn);
    document.getElementById('google-signup').addEventListener('click', googleSignIn);
});
