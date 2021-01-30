$(document).ready( ()=> {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e) => {
        try {
            e.preventDefault();
            var username = e.target.elements.username.value;
            const password = e.target.elements.password.value;

            //USER LOGIN REQUEST
            const loginHeaders = new Headers();
            loginHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ username, password });
            var requestOptions = {
                method: 'POST',
                headers: loginHeaders,
                body: raw,
                redirect: 'follow'
            };

            const loginResponse = await fetch("/api/user/login", requestOptions)
                .then(response => response.json());


            const { token } = loginResponse;

            if (token) {
                localStorage.setItem("token", token) 
                location.href="./profilePage.html"           
                
            }

        }
        catch (err) {
            console.error(err)
        }


    });
});
