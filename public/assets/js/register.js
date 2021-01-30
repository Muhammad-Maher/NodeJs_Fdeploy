$(document).ready(() => {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e) => {
        try {
            e.preventDefault();
            var username = e.target.elements.username.value;
            const password = e.target.elements.password.value;
            const firstName = e.target.elements.firstname.value;            
            let regexUser = new RegExp(/^[\w]{5,50}$/)
            let regexName = new RegExp(/^[\w]{3,50}$/)
            let regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);



            let errArr = [];

            if (!regexUser.test(username)) {
                errArr.push('username must be letters and numbers only, spaces and special charachters aren\'t allowed only underscore is allowed,at least 5 charachters')
            }
            if (!regexPassword.test(password)) {
                errArr.push('password must be Minimum eight characters, at least one letter, one number and one special character')

            }
            if (!regexName.test(firstName)) {
                errArr.push('first name must be letters and numbers only, spaces and special charachters aren\'t allowed only underscore is allowed,at least 3 charachters')
            }



            if (errArr.length != 0) {

                $('body').append(`
                    <div id="myModal" class="modal" tabindex="-1">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Validation error</h5>
                                <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <ol>
                                ${errArr.map(element => `<li style="color:red">${element}</li>`).join("")}                                
                                </ol>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>                               
                            </div>
                            </div>
                        </div>
                        </div>
                        `)

                $("#myModal").modal("show");
                $(".close").click(() => $("#myModal").remove())


                return false;
            }



            //USER REGISTER REQUEST
            const registerHeaders = new Headers();
            registerHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ username, password, firstName });
            var requestOptions = {
                method: 'POST',
                headers: registerHeaders,
                body: raw,
                redirect: 'follow'
            };

            const loginResponse = await fetch("/api/user/register", requestOptions)
                .then(response => {
                    if (response.status === 201) {
                        $('body').html('<div style="text-align:center"><h1>registeration success</h1><br> <h2>you will be redirected to home page<h2><div>');
                        window.setTimeout(function () { location.href = "../"; }, 3000);
                    }
                })
                .catch(error => console.log('error', error));


        }

        catch (err) {
            console.log(err)
        }
    })
})

