const message = document.getElementById("message");
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const isSignup = submitBtn.innerHTML === "Signup";
  if (isSignup) {
    signupFunction();
  } else {
    loginFunction();
  }
});

function signupFunction() {
  localStorage.clear();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const username = document.getElementById("username").value.trim();

  if (email === "" || password === "" || username === "") {
    message.innerHTML = "Please fill all fields";
    message.style.color = "red";
    return;
  }

  fetch("http://127.0.0.1:8000/create_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        message.innerHTML = data.message;
        message.style.color = "green";
        loginFunction()
      } else {
        var error = data.error;
        if (error.hasOwnProperty("email")) {
          message.innerHTML = error.email[0];
        } else if (error.hasOwnProperty("username")) {
          message.innerHTML = error.username[0];
        } else if (error.hasOwnProperty("password")) {
          message.innerHTML = error.password[0];
        }
        message.style.color = "red";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function loginFunction() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  localStorage.clear();
  fetch("http://127.0.0.1:8000/signin_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.hasOwnProperty("detail")) {
        message.innerHTML = "Invalid username or password";
        message.style.color = "red";
      }else{
        message.innerHTML = 'Login successful, redirecting...';
        message.style.color = "green";
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        window.location.href = "landingpage.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
