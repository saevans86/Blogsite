const loginFunc = async (event) => {
	event.preventDefault();
	let email = document.querySelector('#loginEmail').value.trim();
	let password = document.querySelector('#loginPassword').value.trim();
	if (email && password) {
		// console.log(password);
		// console.log(email);

		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-type': 'application/json' }
		});
		// console.log('response');
		if (response.ok) {
			document.location.replace('/home');
		} else {
			console.log(response);
		}
	}
};

const singUpFunction = async (event) => {
	event.preventDefault();

	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	const user_name = document.querySelector('#user_name').value.trim();
	const email = document.querySelector('#email').value.trim();
	const password = document.querySelector('#password').value.trim();
	if (user_name && email && password) {
	const response = await fetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({ user_name, email, password }),
		headers: { 'Content-type': 'application/json' }
	});

		console.log({ user_name, email, password });
		if (response.ok) {
			document.location.replace('/');
		} else {
			console.log(response);
		}
	}
};

document
	.querySelector('#signUpButton')
	.addEventListener('click', singUpFunction);

document.querySelector('#loginButton').addEventListener('click', loginFunc);
