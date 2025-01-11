let signupBtn = document.getElementById('signup-btn');
        let loginBtn = document.getElementById('login-btn');
        let formHeading = document.getElementById('form-heading');
        let suggestion = document.getElementById('suggestion');
        let loginLink = document.getElementById('login-link');
        let forgotPassword = document.getElementById('forgot-password');

        function showSignupForm() {
            signupBtn.classList.add('active');
            loginBtn.classList.remove('active');
            document.getElementById('email-group').style.display = 'block';
            document.getElementById('submit-btn').innerHTML = 'Signup';
            suggestion.innerHTML = 'Already have an account? <a href="#" class="login-link" id="login-link">Login</a>';
            formHeading.innerHTML = 'Signup Form';
            document.getElementById('login-link').addEventListener('click', showLoginForm);
            forgotPassword.style.display = 'none';
        }

        function showLoginForm() {
            loginBtn.classList.add('active');
            signupBtn.classList.remove('active');
            document.getElementById('email-group').style.display = 'none';
            document.getElementById('submit-btn').innerHTML = 'Login';
            suggestion.innerHTML = 'Don’t have an account? <a href="#" class="signup-link" id="signup-link">Signup</a>';
            formHeading.innerHTML = 'Login Form';
            document.getElementById('signup-link').addEventListener('click', showSignupForm);
            forgotPassword.style.display = 'block';
        }
        signupBtn.addEventListener('click', showSignupForm);
        loginBtn.addEventListener('click', showLoginForm);
        loginLink.addEventListener('click', showLoginForm);