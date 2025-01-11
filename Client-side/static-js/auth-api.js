const submitBtn = document.getElementById('submit-btn')
submitBtn.addEventListener('click', function () {
    const isSignup = submitBtn.innerHTML === 'Signup'
    if (isSignup){
        signupFunction()
    }else{
        loginFunction()
    }
})

function signupFunction(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const username = document.getElementById('username').value
}

function loginFunction(){
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
}