// Traigo los datos de la Api
getData()
var datajson = "" 
var juguetes = []
var busqueda =""
var juguetes = []
async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then(response => response.json())
    .then(data => datajson = data)
    var datos = datajson.response
    // Encierro en una variable, solo los juguetes
    function traerJuguetes(){
        for(juguete of datos){
            if (juguete.tipo == "Juguete"){
                juguetes.push(juguete)
            }
        }
    }
    traerJuguetes()
    console.log(juguetes)
    // Funcion para crear las cartas dinamicamente segun la cantidad de juguetes que haya en pantalla
    function crearArticulo(parametro){
        var contenedorJuguetes = document.getElementById("contenedorJuguetes") 
        if(parametro.length!=0){
            var templateHtml = ""    
        parametro.forEach(juguete => {
            if (juguete.stock > 5){
            templateHtml += `<div class="card m-2 d-flex flex-column justify-content-between align-items-center" style="width: 20rem; height: 44rem;">
                                <img src="${juguete.imagen}" alt="Petshop MINDY" class="card-img-top" style = "width: 75%;" >
                                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50">
                                    <div class="d-flex flex-column justify-content-between align-items-center">
                                        <h5 class="card-title">${juguete.nombre}</h5>
                                        <p class="card-text">${juguete.descripcion}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-end align-items-center">
                                        <p class="fw-bold my-1">Precio: $${juguete.precio}</p>
                                        <p class="my-1">Stock: ${juguete.stock}</p>
                                        <div class="d-flex flex-row justify-content-center my-1">
                                            <label class="me-3">Cantidad:</label>
                                            <input type="number" class="cantidad" name="cantidad" value="1" min="1" max="${juguete.stock}">
                                        </div> 
                                        <button class="boton-agregar btn btn-danger mt-2" type="button" data-th="${juguete._id}">Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>`}
        else{
            templateHtml += `<div class="card m-2 d-flex flex-column justify-content-between align-items-center" style="width: 20rem; height: 44rem;">
                                <img src="${juguete.imagen}" alt="Petshop MINDY"class="card-img-top" style = "width: 75%;">
                                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50">
                                    <div class="d-flex flex-column justify-content-between align-items-center">
                                        <h5 class="card-title">${juguete.nombre}</h5>
                                        <p class="card-text">${juguete.descripcion}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-end align-items-center">
                                        <p class="fw-bold my-1">Precio: $${juguete.precio}</p>
                                        <p class="my-1" style="color: red">Stock: ${juguete.stock} ULTIMAS UNIDADES!!</p>
                                        <div class="d-flex flex-row justify-content-center my-1">
                                            <label class="me-3">Cantidad:</label> 
                                            <input type="number" class="cantidad" name="cantidad" value="1" min="1" max="${juguete.stock}">
                                        </div>
                                        <button class="boton-agregar btn btn-danger mt-2" type="button" data-th="${juguete._id}">Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>`
            }
        })
        contenedorJuguetes.innerHTML = templateHtml     
        }else{
            contenedorJuguetes.innerHTML = `<p class="my-4 fs-4">No se han encontrado juguetes con ese nombre.</p>`
            console.log(contenedorJuguetes)
            console.log("")
        }
    }
    // Capturo los datos del search
    var inputsearch = document.getElementById("search")
    inputsearch.addEventListener("keyup", (event) => {
        busqueda = event.target.value;
        filtros();
        document.querySelectorAll('.boton-agregar').forEach(element => {
            element.addEventListener('click', function() {
                this.classList.remove("btn-danger");
                this.classList.add("btn-success")
                this.innerHTML = "Agregado"
                var carrito = [];
                if (localStorage.getItem("carrito")) {  
                    carrito = JSON.parse(localStorage.getItem("carrito"));
                }
    
                var cantidad = this.parentElement.querySelector('.cantidad').value;
                var id = this.getAttribute('data-th');
                var agregoCantidad = false;
                var producto = {
                    id: id,
                    cantidad: cantidad
                }
                if (localStorage.getItem("carrito")) {  
                    for(var i=0; carrito.length > i; i++){
                        if(carrito[i].id == id){
                            carrito[i].cantidad = Number(carrito[i].cantidad) + Number(cantidad); 
                            agregoCantidad = true;
                        }
                    }
                }
    
                if(agregoCantidad === false){
                    carrito.push(producto);
                }
    
    
                localStorage.setItem("carrito", JSON.stringify(carrito));
                
            })
        });
    })
    // 
    // Segun los input, voy filtrando
    function filtros(){
        let filtros = []
        if(busqueda!==""){
            filtros.push(...juguetes.filter(dato => dato.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())))
            console.log(filtros);
        } else {
            filtros.push(...juguetes)
        }
        crearArticulo(filtros)
    }filtros()
    document.querySelectorAll('.boton-agregar').forEach(element => {
        element.addEventListener('click', function() {
            this.classList.remove("btn-danger");
            this.classList.add("btn-success")
            this.innerHTML = "Agregado"
            var carrito = [];
            if (localStorage.getItem("carrito")) {  
                carrito = JSON.parse(localStorage.getItem("carrito"));
            }

            var cantidad = this.parentElement.querySelector('.cantidad').value;
            var id = this.getAttribute('data-th');
            var agregoCantidad = false;
            var producto = {
                id: id,
                cantidad: cantidad
            }
            if (localStorage.getItem("carrito")) {  
                for(var i=0; carrito.length > i; i++){
                    if(carrito[i].id == id){
                        carrito[i].cantidad = Number(carrito[i].cantidad) + Number(cantidad); 
                        agregoCantidad = true;
                    }
                }
            }

            if(agregoCantidad === false){
                carrito.push(producto);
            }


            localStorage.setItem("carrito", JSON.stringify(carrito));
            
        })
    });
}