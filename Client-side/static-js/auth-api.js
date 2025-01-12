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
      email: email,
      password: password,
      username: username,
    }),
  })
    .then((response) => {
      return response.json(); 
    })
    .then((data) => {
        console.log(data)
      if (data.status === "success") {
        message.innerHTML = data.message;
        message.style.color = "green";
        window.location.href = "landingpage.html"
      } else {
        var error = data.error
        if (error.hasOwnProperty("email")){
            message.innerHTML = error.email[0];
        }else if (error.hasOwnProperty("username")){
            message.innerHTML = error.username[0];
        }else if (error.hasOwnProperty("password")){
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
}


