$(document).ready(
    () => {
        $("body").append(
            `
                <div class="p-5 m-5 d-flex flex-column justify-content-center align-items-md-center">
                    <button id="displayTodosBTN" type="button" class="btn btn-success">display recent todos</button>
                </div>
                `
        )

        $("#displayTodosBTN").click(
            () => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization",localStorage.getItem("token") );
                myHeaders.append("Content-Type", "application/json");                

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,                    
                    redirect: 'follow'
                };

                fetch("../api/todo", requestOptions)
                    .then(response=>response.json())
                    .then(result=>{
                        if($('#table').length!=0) return
                            $('body').append(
                                `<div class="d-flex justify-content-center"><table id="table">
                                    <th>todo ID</th>
                                    <th>owner</th>
                                    <th>title</th>
                                    <th>body</th>
                                                          
                          ${result.map((element)=>
                              `<tr><td>${element._id}</td>
                              <td>${element.userId.username}</td>                                                            
                              <td>${element.title}</td>                                                            
                              <td>${element.body}</td></tr>                                                            
                              `

                          ).join('')}</table></div>`)
                            
                        })                                     
                    .catch(error => console.log('error', error));
            }
        )
    }
)