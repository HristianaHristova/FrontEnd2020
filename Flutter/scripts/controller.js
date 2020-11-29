(() => {

    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const errors = document.getElementById('errors');
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("error") === "accessDenied") {
        errors.classList.add('errors-visible');
        errors.innerText = "Access denied. Please login.";
    }

    registerForm && registerForm.addEventListener('submit', event => {
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        if (email.length < 5) {
            errors.innerHTML += "Email field should contain at least 5 characters <br />";
        }
        if (!(email.includes('.') && email.includes('@'))) {
            errors.innerHTML += "Email field should contain '@' and '.' <br />"
        }

        event.preventDefault();

        auth.register(username, email, password, (success, errorCode, errorMessage) => {
            if (success) {
                window.location = 'posts.html';
            } else {
                errors.classList.add('errors-visible');
                errors.innerText = errorMessage;
            }
        });
    });

    loginForm && loginForm.addEventListener('submit', event => {
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');


        event.preventDefault();

        if (password.length < 6) {
            errors.innerHTML += "Password should have at least 6 symbols"
        }
        if (!password.match(/[0-9]/g)) {
            errors.innerHTML += "Password should contain at least one digit"
        }
        if (!password.match(/[A-Z]/g)) {
            errors.innerHTML += "Password should contain at least one capital letter"
        }
        if (!password.match(/[!@#$%^&]/g)) {
            errors.innerHTML += "Password should contain at least one special character from !@#$%^&"
        }

        auth.login(email, password, (success, errorCode, errorMessage) => {
            if (success) {
                window.location = 'posts.html';
            } else {
                errors.classList.add('errors-visible');
                errors.innerText = errorMessage;
            }
        });

    });

    logoutBtn && logoutBtn.addEventListener('click', event => {
        auth.logout();
        window.location = 'index.html';
        event.preventDefault();
    })

})(this);