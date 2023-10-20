const loginFunc = async (event) => {
    event.preventDefault();
    let email = document.querySelector('#loginEmail').value.trim();
    let password = document.querySelector('#loginPassword').value.trim();
    if (email && password) {
        console.log(password);
        console.log(email)
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': 'application/json' },
            });
            console.log('response')
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

const singUpFunction = async (event) => {
    event.preventDefault();

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    const userName = document.querySelector('#userName').value.trim();
    const newEmail = document.querySelector('#signUpEmail').value.trim();
    const newPassword = document.querySelector('#signUpPass').value.trim();
    if (userName && newEmail && newPassword) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ userName, newEmail, newPassword }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(newEmail)
        if (response.ok) {
            document.location.replace('/home');
        } else {
            console.log('error occured')
        }
    }
};



document.querySelector('#signUpButton').addEventListener('click', singUpFunction);

document.querySelector('#loginButton').addEventListener('click', loginFunc)
