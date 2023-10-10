// const loginButton = document.querySelector('#loginButton')
const loginFunc = async (event) => {
    event.preventDefault()
    let userEmail = document.querySelector('#loginEmail')
    let userPassword = document.querySelector('#loginPassword')
    if (userEmail && userPassword) {
        console.log('@@@@@@@@@@@consoletest@@@@@@@@@@')
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userEmail, userPassword }),
            headers: {'Content-type': 'application/json'}
        })
        if (response.ok) {
            document.location.replace('/home')
        } else {
            console.log('error in submission')
        }
    }
}

document.querySelector('#loginButton').addEventListener('click', loginFunc)