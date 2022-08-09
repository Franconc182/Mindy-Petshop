getData()

// Función para traer los datos de la API
async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then (response => response.json())
    .then (data => {
    dataArray = data.response})
    let productosFarmacia = [];
    let divContenedorFarmacia = document.getElementById("ContenedorFarmacia")
    let contenedorBoton1 = document.getElementById("boton-agregar1")
    
// Función para traer los productos de farmacia       
    function traerProductosFarmacia() {
        
        for (producto of dataArray) {
            if (producto.tipo == "Medicamento") {
                productosFarmacia.push(producto);
            }
        }
        return productosFarmacia;
    }
    traerProductosFarmacia()

// Función para imprimir los productos de farmacia
    function imprimirProductosFarmacia(paramArray){
        if(paramArray.length != 0){
                let nuevoHtml = "";
                paramArray.forEach(
                    producto =>{
                        if (producto.stock < 5){
                        nuevoHtml+=`
                        <div class="product card m-2 d-flex flex-column justify-content-between align-items-center" style="width: 20rem; height: 40rem;">
                            <img src="${producto.imagen}" class="card-img-top" style = "width: 75%;" alt="imagen-farmacia">
                                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50">
                                    <div class="d-flex flex-column justify-content-between align-items-center">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-end align-items-center">
                                        <p class="my-1" style="color: red;">Stock: ${producto.stock}  ULTIMAS UNIDADES!!!!</p>
                                        <p class="fw-bold my-1">Precio: $ ${producto.precio}</p>
                                        <div class="d-flex flex-row justify-content-center my-1">
                                            <label class="me-3">Cantidad:</label>
                                            <input type="number" class="cantidad" min="1" max="${producto.stock}" name="cantidad" value="1">
                                        </div>
                                        <button id="boton-agregar1" class="boton-agregar btn btn-danger mt-2" type="button" data-th="${producto._id}">Agregar al carrito</button>
                                    </div>
                                </div>
                        </div>
                        `
                    } else {
                        nuevoHtml+=`
                        <div class="product card m-2 d-flex flex-column justify-content-between align-items-center" style="width: 20rem; height: 40rem;">
                            <img src="${producto.imagen}" class="card-img-top" style = "width: 75%;" alt="imagen-farmacia">
                                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50">
                                    <div class="d-flex flex-column justify-content-between align-items-center">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-end align-items-center">
                                        <p class="my-1">Stock: ${producto.stock}</p>
                                        <p class="my-1 fw-bold">Precio: $ ${producto.precio}</p>   
                                        <div class="d-flex flex-row justify-content-around my-1"> 
                                            <label class="me-3">Cantidad:</label>
                                            <input type="number" class="cantidad" min="1" max="${producto.stock}"  name="cantidad" value="1">
                                        </div>
                                        <button class="boton-agregar btn btn-danger mt-2" type="button" data-th="${producto._id}">Agregar al carrito</button>
                                    </div>
                                </div>
                        </div>
                        `
                    }
                    })
                    divContenedorFarmacia.innerHTML = nuevoHtml;
        }else{
            divContenedorFarmacia.innerHTML=` <p class="my-4 fs-4">No se han encontrado productos con ese nombre.</p>`;
        }        
    }
    imprimirProductosFarmacia(productosFarmacia)

    let contenidoSearch = document.querySelector("#searchInput");
    contenidoSearch.addEventListener("keyup", filterAndRender);

// Filtra e imprime el nombre del producto puesto en el input search
    function filterAndRender(){
        let palabrasDelBuscador = contenidoSearch.value.toLowerCase();
        let arregloFiltrado = filterName(palabrasDelBuscador)
        imprimirProductosFarmacia(arregloFiltrado)
        document.querySelectorAll('.boton-agregar').forEach(element => {
        element.addEventListener('click', function() {
            this.classList.remove("btn-danger");
            this.classList.add("btn-success")
            this.innerHTML = "¡Agregado!"
            var carrito = [];
            if (localStorage.getItem("carrito")) {  
                carrito = JSON.parse(localStorage.getItem("carrito"));
            }
           var cantidad = this.closest('.product').querySelector('.cantidad').value;
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
    
// Filtra el nombre del producto puesto en el input search
    function filterName(parametro) {
        let arregloFiltrado = productosFarmacia.filter((producto) => {
                return producto.nombre.toLowerCase().includes(parametro)})
        return arregloFiltrado 
    }  
    document.querySelectorAll('.boton-agregar').forEach(element => {
        element.addEventListener('click', function() {
            this.classList.remove("btn-danger");
            this.classList.add("btn-success")
            this.innerHTML = "¡Agregado!"
            var carrito = [];
            if (localStorage.getItem("carrito")) {  
                carrito = JSON.parse(localStorage.getItem("carrito"));
            }
           var cantidad = this.closest('.product').querySelector('.cantidad').value;
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