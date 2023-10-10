const loginFunc = async (event) => {
    event.preventDefault()
    let userEmail = document.querySelector('#loginEmail')
    let userPassword = document.querySelector('#loginPassword')
    const loginButton = document.querySelector('#loginButton')
    if (userEmail && userPassword) {
        console.log('@@@@@@@@@@@@@@@@@@@@@')
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userEmail, userPassword }),
            headers: {'Content-type': 'application/json'}
        })
        if (response.ok) {
            document.location.replace('/userprofile')
        } else {
            console.log('error in submission')
        }
    }
    loginButton.addEventListener('click', loginFunc)
}
