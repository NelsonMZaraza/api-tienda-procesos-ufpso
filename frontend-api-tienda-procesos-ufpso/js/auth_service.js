//funciones para la autenticacion y autorizacion
const urlApiAuth = "http://localhost:8088/auth"; //colocar la url con el puerto
const headersAuth = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function login() {
  var myForm = document.getElementById("myForm");
  var formData = new FormData(myForm);
  var jsonData = {};
  for (var [k, v] of formData) {
    //convertimos los datos a json
    jsonData[k] = v;
  }
  var settings = {
    method: "POST",
    headers: headersAuth,
    body: JSON.stringify(jsonData),
  };
  const request = await fetch(urlApiAuth + "/login", settings);
  if (request.ok) {
    const respuesta = await request.json();
    localStorage.token = respuesta.token;
    location.href = "dashboard.html";
  } else {
    const data = await request.json(); // Espera a que la promesa se resuelva
    console.log(data); // Aquí puedes manejar la data de la respuesta
    const dataArray = Object.values(data);
    console.log(dataArray); // Aquí puedes manejar la data de la respuesta
    var dataResponse = "";
    for (var v of dataArray) {
      dataResponse += "<li>" + v + "</li>";
    }

    alertas("Error: <br>" + dataResponse, 2);
  }
}

async function registrarUsuario() {
  var myForm = document.getElementById("registerForm");
  var formData = new FormData(myForm);
  var jsonData = {};
  for (var [k, v] of formData) {
    //convertimos los datos a json
    jsonData[k] = v;
  }
  const request = await fetch(urlApiAuth + "/register", {
    method: "POST",
    headers: headersAuth,
    body: JSON.stringify(jsonData),
  });
  if (request.ok) {
    alertas("User registered", 1);
  } else {
    const data = await request.json(); // Espera a que la promesa se resuelva
    console.log(data); // Aquí puedes manejar la data de la respuesta
    const dataArray = Object.values(data);
    console.log(dataArray); // Aquí puedes manejar la data de la respuesta
    var dataResponse = "";
    for (var v of dataArray) {
      dataResponse += "<li>" + v + "</li>";
    }

    alertas("Error: <br>" + dataResponse, 2);
  }
  document.getElementById("contentModal").innerHTML = "";
  var myModalEl = document.getElementById("modalUsuario");
  var modal = bootstrap.Modal.getInstance(myModalEl); // Returns a Bootstrap modal instance
  modal.hide();
}

function registerForm() {
  cadena = `
    <form action="" method="post" id="registerForm">
    <div class="m-2">
    <input type="hidden" class="modalContainer col-11 col-lg-11" name="id" id="id">
    <label for="firstName" class="modelLabel">First Name</label>
    <input type="text" class="modalContainer col-11 col-lg-11" name="firstName" id="firstName" required> <br>
    <label for="lastName"  class="modelLabel">Last Name</label>
    <input type="text" class="modalContainer col-11 col-lg-11" name="lastName" id="lastName" required> <br>
    <label for="document"  class="modelLabel">Document id</label>
    <input type="text" class="modalContainer col-11 col-lg-11" name="document" id="document" required> <br>
    <label for="email" class="modelLabel">Email</label>
    <input type="email" class="modalContainer col-11 col-lg-11" name="email" id="email" required> <br>
    <label for="password" class="modelLabel">Password</label>
    <input type="password" class="modalContainer col-11 col-lg-11" id="password" name="password" required> <br>
    </div>
    <button type="button" class="buttonSubmit" onclick="registrarUsuario()">Register</button>
</form>`;
  document.getElementById("contentModal").innerHTML = cadena;
  var myModal = new bootstrap.Modal(document.getElementById("modalUsuario"));
  myModal.toggle();
}

function salir() {
  localStorage.clear();
  location.href = "index.html";
}

function article(){
  location.href="articles.html"
}

function category(){
  location.href="category.html"
}

function validaToken() {
  if (localStorage.token == undefined) {
    salir();
  }
}
