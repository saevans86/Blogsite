const loginFunc = async (event) => {
    event.preventDefault();
    let email = document.querySelector('#loginEmail').value.trim();
    let password = document.querySelector('#loginPassword').value.trim();
    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': 'application/json' },
            });
            console.log(password);
            if (response.ok) {
                document.location.replace('/home');
            } else {
                console.log('Error in submission');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}


//todo build in for signup
document.querySelector('#loginButton').addEventListener('click', loginFunc)
