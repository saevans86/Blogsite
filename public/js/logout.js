const logoutBtn = document.querySelector('#logoutButton')
const logout = async () => {
 
    const logout = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (logout.ok) {
        document.location.replace('/');
    } else {
        alert(logout.statusText);
    }
};
logoutBtn.addEventListener('click', logout);

