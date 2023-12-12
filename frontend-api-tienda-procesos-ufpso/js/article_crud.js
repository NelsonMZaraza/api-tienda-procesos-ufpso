//funciones para operaciones crud
const urlApiArticulo = "http://localhost:8088/articulos"; //colocar la url con el puerto
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
  fetch(urlApiArticulo, settings)
    .then((response) => response.json())
    .then(function (articulos) {
      var listarArticulos = "";
      for (const articulo of articulos) {
        listarArticulos += `
                <tr class="text-center">
                    <th scope="row">${articulo.id}</th>
                    <td>${articulo.nombre}</td>
                    <td>${articulo.descripcion}</td>
                    <td>${articulo.precio}</td>
                    <td>${articulo.stock}</td>
                    <td>${articulo.categoria.nombreCategoria}</td>
                    <td>${articulo.fechaIngreso}</td>
                    <td>
                    <a href="#" onclick="verModificarArticulo('${articulo.id}')" class="btn btn-outline-warning">
                        <i class="fa-solid fa-user-pen"></i>
                    </a>
                    <a href="#" onclick="verArticulo('${articulo.id}')" class="btn btn-outline-info">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                    <a href="#" onclick="eliminaArticulo('${articulo.id}')" class="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </a>
                    </td>
                </tr>`;
      }
      document.getElementById("listar").innerHTML = listarArticulos;
    });
}

function verModificarArticulo(id) {
  validaToken();
  var settings = {
    method: "GET",
    headers: headersUser,
  };
  fetch(urlApiArticulo + "/" + id, settings)
    .then((articulo) => articulo.json())
    .then(function (articulo) {
      var cadena = "";
      if (articulo) {
        cadena = `
        <div class="p-3 mb-2  text-dark">
            <h1 class="display-5" style="color:white;"><i class="fa-solid fa-user-pen"></i> Modificar articulo</h1>
        </div>
      
        <form action="" method="post" id="modificarArticulo">
            <input type="hidden" class="form-control styleInput" name="id" id="id" value="${articulo.id}">
    
            <label for="nombre" class="form-label styleLabel">Nombre del articulo</label>
            <input type="text" class="form-control styleInput" name="nombre" id="nombre" required value="${articulo.nombre}"> <br>
    
            <label for="descripcion" class="form-label styleLabel">Descripcion</label>
            <input type="text" class="form-control styleInput" name="descripcion" id="descripcion" required value="${articulo.descripcion}"> <br>
    
            <label for="stock" class="form-label styleLabel">Stock</label>
            <input type="text" class="form-control styleInput" name="stock" id="stock" required value="${articulo.stock}"> 
            
            <br><label for="precio" class="form-label styleLabel">Precio</label>
            <input type="text" class="form-control styleInput" name="precio" id="precio" required value="${articulo.precio}"><br>
    
            <label for="categoria" class="form-label styleLabel">Categoria</label>
            <select class="form-control styleInput" id="categoria" name="categoria" required>
            <option selected value="${articulo.categoria.id}">${articulo.categoria.nombreCategoria}</option>
            </select><br>
            
            <label for="fechaIngreso" class="form-label styleLabel">Fecha</label>
            <input type="text" class="form-control styleInput" name="fechaIngreso" id="fechaIngreso" required value="${articulo.fechaIngreso}"> <br>
    
            <button type="button" class="buttonModal" onclick="modificarArticulo('${articulo.id}')">Modificar</button>
        </form>`;

        // Obtener las categorías y agregarlas al select
        fetch(urlApiCategoria, settings)
          .then((response) => response.json())
          .then(function (categorias) {
            var selectCategoria = document.getElementById("categoria");
            for (const categoria of categorias) {
              var option = document.createElement("option");
              option.value = categoria.id;
              option.text = categoria.nombreCategoria;
              selectCategoria.add(option);
            }
          });
      }

      document.getElementById("contentModal").innerHTML = cadena;
      var myModal = new bootstrap.Modal(
        document.getElementById("modalUsuario")
      );
      myModal.toggle();
    });
}

async function modificarArticulo(id) {
  validaToken();
  var myForm = document.getElementById("modificarArticulo");
  var formData = new FormData(myForm);
  var jsonData = {};
  for (var [k, v] of formData) {
    //convertimos los datos a json
    jsonData[k] = v;
  }
  const request = await fetch(urlApiArticulo + "/" + id, {
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

function verArticulo(id) {
  validaToken();
  var settings = {
    method: "GET",
    headers: headersUser,
  };
  fetch(urlApiArticulo + "/" + id, settings)
    .then((articulo) => articulo.json())
    .then(function (articulo) {
      var cadena = "";
      if (articulo) {
        cadena = `
                <div class="p-3 mb-2  text-dark">
                    <h1 class="display-5" style="color:white;"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                    <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z"/>
                  </svg></i> Visualizar Articulo</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre de la articulo: ${articulo.nombre}</li>
                    <li class="list-group-item">Descripcion: ${articulo.descripcion}</li>
                    <li class="list-group-item">stock: ${articulo.stock}</li>
                    <li class="list-group-item">precio: ${articulo.precio}</li>
                    <li class="list-group-item">Categoria: ${articulo.categoria.nombreCategoria}</li>
                    <li class="list-group-item">categoria: ${articulo.fechaIngreso}</li>
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
  var myForm = document.getElementById("registerArticuloForm");
  var formData = new FormData(myForm);
  var jsonData = {};
  for (var [k, v] of formData) {
    //convertimos los datos a json
    jsonData[k] = v;
  }

  const categoriaId = document.getElementById("categoria").value;
  const request = await fetch(urlApiArticulo + "/" + categoriaId, {
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

function createArticuloForm() {
  validaToken();
  var settings = {
    method: "GET",
    headers: headersUser,
  };
  cadena = `
            <div class="p-3 mb-2  text-dark">
                <h1 class="display-5" style="color:white;"><i class="fa-solid fa-user-pen"></i> Crear Articulo</h1>
            </div>
              
            <form action="" method="post" id="registerArticuloForm">
                <input type="hidden" name="id" id="id">

                <label for="nombre" class="form-label styleLabel">Nombre del articulo</label>
                <input type="text" class="form-control styleInput" name="nombre" id="nombre" required> <br>

                <label for="descripcion" class="form-label styleLabel">Descripcion</label>
                <input type="text" class="form-control styleInput" name="descripcion" id="descripcion" required> <br>

                <label for="stock" class="form-label styleLabel">Stock</label>
                <input type="text" class="form-control styleInput" name="stock" id="stock" required> <br>

                <label for="precio" class="form-label styleLabel">Precio</label>
                <input type="text" class="form-control styleInput" name="precio" id="precio" required> <br>

                <label for="fechaIngreso" class="form-label styleLabel">fecha de ingreso</label>
                <input type="date" class="form-control styleInput" name="fechaIngreso" id="fechaIngreso" required> <br>

                <label for="categoria" class="form-label styleLabel">Categoria</label>
                <select class="form-control styleInput" id="categoria" name="categoria" required>
                <option selected value=""></option>
                </select><br>

                <button type="button" class="buttonModal" onclick="createArticulo()">Register</button>

               </form>`;

  // Obtener las categorías y agregarlas al select
  fetch(urlApiCategoria, settings)
    .then((response) => response.json())
    .then(function (categorias) {
      var selectCategoria = document.getElementById("categoria");
      for (const categoria of categorias) {
        var option = document.createElement("option");
        option.value = categoria.id;
        option.text = categoria.nombreCategoria;
        selectCategoria.add(option);
      }
    });

  document.getElementById("contentModal").innerHTML = cadena;
  var myModal = new bootstrap.Modal(document.getElementById("modalUsuario"));
  myModal.toggle();
}

function eliminaArticulo(id) {
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
    fetch(urlApiArticulo + "/" + id, settings)
      .then((response) => response.json())
      .then(function (data) {
      })
      .finally(function () {
        myModal.hide();
        listar();
      });
  });
}


