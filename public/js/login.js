// const loginButton = document.querySelector('#loginButton')
const loginFunc = async (event) => {
    event.preventDefault()
    let email = document.querySelector('#loginEmail').value.trim();
    let password = document.querySelector('#loginPassword').value.trim();
    if (email && password) {
               const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-type': 'application/json'}
        })
        console.log("login.js endpoint")
        if (response.ok) {
            document.location.replace('/home')
        } else {
            console.log('error in submission')
            
        }
    }
}

//todo build in for signup
document.querySelector('#loginButton').addEventListener('click', loginFunc)
