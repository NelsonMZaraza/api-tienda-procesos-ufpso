//funciones para operaciones crud
const urlApiCategoria = "http://localhost:8088/categorias"; //colocar la url con el puerto
const headersUser = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.token}`,
};

function listar() {
  validaToken();
  var settings = {
    method: "GET",
    headers: headersUser,
  };
  fetch(urlApiCategoria, settings)
    .then((response) => response.json())
    .then(function (categorias) {
      var listarCategorias = "";
      for (const categoria of categorias) {
        listarCategorias += `
                <tr class="text-center">
                    <th scope="row">${categoria.id}</th>
                    <td>${categoria.nombreCategoria}</td>
                    <td>${categoria.descripcion}</td>
                    <td>
                    <a href="#" onclick="verModificarCategoria('${categoria.id}')" class="btn btn-outline-warning">
                        <i class="fa-solid fa-user-pen"></i>
                    </a>
                    <a href="#" onclick="verCategoria('${categoria.id}')" class="btn btn-outline-info">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                    <a href="#" onclick="eliminaUsuario('${categoria.id}')" class="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </a>
                    </td>
                </tr>`;
      }
      document.getElementById("listar").innerHTML = listarCategorias;
    });
}

function verModificarCategoria(id) {
  validaToken();
  var settings = {
    method: "GET",
    headers: headersUser,
  };
  fetch(urlApiCategoria + "/" + id, settings)
    .then((categoria) => categoria.json())
    .then(function (categoria) {
      var cadena = "";
      if (categoria) {
        cadena = `
                <div class="p-3 mb-2  text-dark">
                    <h1 class="display-5" style="color:white;"><i class="fa-solid fa-user-pen"></i> Modificar categoria</h1>
                </div>
              
                <form action="" method="post" id="modificarCategoria">
                    <input type="hidden" class="form-control styleInput" name="id" id="id" value="${categoria.id}">
                    <label for="nombreCategoria" class="form-label styleLabel">Nombre de la categoria</label>
                    <input type="text" class="form-control styleInput" name="nombreCategoria" id="nombreCategoria" required value="${categoria.nombreCategoria}"> <br>
                    <label for="descripcion" class="form-label styleLabel">Descripcion</label>
                    <input type="text" class="form-control styleInput" name="descripcion" id="descripcion" required value="${categoria.descripcion}"> <br>
                    <button type="button" class="buttonModal" 
                        onclick="modificarCategoria('${categoria.id}')">modificar
                    </button>
                </form>`;
      }
      document.getElementById("contentModal").innerHTML = cadena;
      var myModal = new bootstrap.Modal(
        document.getElementById("modalUsuario")
      );
      myModal.toggle();
    });
}

async function modificarCategoria(id) {
  validaToken();
  var myForm = document.getElementById("modificarCategoria");
  var formData = new FormData(myForm);
  var jsonData = {};
  for (var [k, v] of formData) {
    //convertimos los datos a json
    jsonData[k] = v;
  }
  const request = await fetch(urlApiCategoria + "/" + id, {
    method: "PUT",
    headers: headersUser,
    body: JSON.stringify(jsonData),
  });
  listar();
  alertas("The user has been modified successfully!", 1);
  document.getElementById("contentModal").innerHTML = "";
  var myModalEl = document.getElementById("modalUsuario");
  var modal = bootstrap.Modal.getInstance(myModalEl); // Returns a Bootstrap modal instance
  modal.hide();
}

function verCategoria(id) {
  validaToken();
  var settings = {
    method: "GET",
    headers: headersUser,
  };
  fetch(urlApiCategoria + "/" + id, settings)
    .then((categoria) => categoria.json())
    .then(function (categoria) {
      var cadena = "";
      if (categoria) {
        cadena = `
                <div class="p-3 mb-2  text-dark">
                    <h1 class="display-5" style="color:white;"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                    <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z"/>
                  </svg></i> Visualizar Categoria</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre de la categoria: ${categoria.nombreCategoria}</li>
                    <li class="list-group-item">Descripcion: ${categoria.descripcion}</li>
                </ul>`;
      }
      document.getElementById("contentModal").innerHTML = cadena;
      var myModal = new bootstrap.Modal(
        document.getElementById("modalUsuario")
      );
      myModal.toggle();
    });
}

async function createArticulo() {
  var myForm = document.getElementById("registerCategoriaForm");
  var formData = new FormData(myForm);
  var jsonData = {};
  for (var [k, v] of formData) {
    //convertimos los datos a json
    jsonData[k] = v;
  }

  const request = await fetch(urlApiCategoria, {
    method: "POST",
    headers: headersUser,
    body: JSON.stringify(jsonData),
  });
  if (request.ok) {
    alertas("User created", 1);
    listar();
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

function createCategoriaForm(){
    cadena = `
            <div class="p-3 mb-2  text-dark">
                <h1 class="display-5" style="color:white;"><i class="fa-solid fa-user-pen"></i> Crear Categoria</h1>
            </div>
              
            <form action="" method="post" id="registerCategoriaForm">
                <input type="hidden" class="form-control styleInput" name="id" id="id">
                <label for="nombreCategoria" class="form-label styleLabel">Nombre de la categoria</label>
                <input type="text" class="form-control styleInput" name="nombreCategoria" id="nombreCategoria" required> <br>
                <label for="descripcion" class="form-label styleLabel">Descripcion</label>
                <input type="text" class="form-control styleInput" name="descripcion" id="descripcion" required> <br>
                <button type="button" class="buttonModal" onclick="createArticulo()">Register</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}

function eliminaUsuario(id) {
  document.getElementById("contentModal").innerHTML = "";
  var myModal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
  var confirmar = document.getElementById("confirmar");
  myModal.toggle();
  confirmar.addEventListener("click", function () {
    validaToken();
    var settings = {
      method: "DELETE",
      headers: headersUser,
    };
    fetch(urlApiCategoria + "/" + id, settings)
      .then((response) => response.json())
      .then(function (data) {
      })
      .finally(function () {
        myModal.hide();
        listar();
      });
  });
}