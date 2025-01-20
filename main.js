const Producto = function(nombre, precio, stock){
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}

let producto1 = new Producto ("guitarra eléctrica",44000,20)
let producto2 = new Producto ("guitarra criolla",18000,10)
let producto3 = new Producto ("bajo",52000,12)
let producto4 = new Producto ("triangulo eléctrico",6200,22)
let producto5 = new Producto ("flauta dulce",5500,2)

let lista = [producto1, producto2, producto3, producto4, producto5]

    if(localStorage.getItem("productos")){
        lista = JSON.parse(localStorage.getItem("productos"))
    }
    else{
        lista = lista
    }

function filtrarTattoo(){
    Swal.fire({
        title: "Ingresa el instrumento que deseas buscar",
        input: "text",
        showCancelButton: true,
        ConfirmButtonText: "Buscar",
        showLoaderOnConfirm: true,
        
        customClass: {
            popup: "custom-popup",
            confirmButton: "custom-confirm-btn",
            cancelButton: "custom-cancel-btn",
            title: "custom-title"
        },

        preConfirm: (palabraClave)=>{
            palabraClave = palabraClave.trim().toUpperCase()
            let resultado = lista.filter((producto)=>producto.nombre.toUpperCase().includes(palabraClave))  

            if(resultado.length >0){
                Swal.fire({
                    title: "Este es el resultado de tu busqueda",
                    html: "<table><tr> <th>Resultados:</th></table>" + 
                    resultado.map(  (producto)=> `<tr> Producto: <td>${producto.nombre}</td> . Precio: <td>${producto.precio}</td> . Stock: <td>${producto.stock}</td> </tr>`),

                    customClass: {
                        popup: "custom-popup",
                        confirmButton: "custom-confirm-btn",
                        cancelButton: "custom-cancel-btn",
                        title: "custom-title"
                    }
                })
            }
        
            else{
                Swal.fire({
                    title: "No se encuentra coincidencias",
                    icon: "error",
                    ConfirmButtonText: "ok",

                    customClass: {
                        popup: "custom-popup",
                        confirmButton: "custom-confirm-btn",
                        cancelButton: "custom-cancel-btn",
                    }
                })
            }
        } 

    })
}

function agregarTattoo(){
    Swal.fire({
        title: "Agregar instrumento",
        html: `<label>Nombre:</label><input id="nombre-input" class="swal2-input" type="text" autofocus>
        <label>Precio</label><input id="precio-input" class="swal2-input" type="number" step="0.01">
        <label>Stock</label><input id="stock-input" class="swal2-input" type="number" step="1">`,

        showCancelButton: true,
        ConfirmButtonText: "agregar",
        cancelButtonText: "cancelar",
        
        customClass: {
            popup: "custom-popup",
            confirmButton: "custom-confirm-btn",
            cancelButton: "custom-cancel-btn",
            title: "custom-title"
        }

    }).then((result)=>{
        if(result.isConfirmed){
            let nombre = document.getElementById("nombre-input").value.trim();
            let precio = document.getElementById("precio-input").value.trim();
            let stock = document.getElementById("stock-input").value.trim();
            
            if(isNaN(precio) || isNaN(stock) || nombre === ""){
                Swal.fire(
                    {
                        icon: "error",
                        title: "Error",
                        Text: "Por favor ingresa valores validos",
                    }
                ); return
            }
            let producto = new Producto(nombre, precio, stock)

                if(lista.some (   (elemento)=> elemento.nombre === producto.nombre)){
                    Swal.fire({
                        icon: "warning",
                        title: "Advertencia",
                        text: "El instrumento ya existe en el listado",

                        customClass: {
                            popup: "custom-popup",
                            confirmButton: "custom-confirm-btn",
                            cancelButton: "custom-cancel-btn",
                            title: "custom-title"
                        }

                    }); return
                }
                lista.push(producto)

                localStorage.setItem("productos", JSON.stringify(lista))

                Swal.fire({
                    icon: "success",
                    title: "Instrumento Agregado",
                    text: `Se agregó ${producto.nombre} a la lista`,
                    timer: 3000,

                    customClass: {
                        popup: "custom-popup",
                        confirmButton: "custom-confirm-btn",
                        cancelButton: "custom-cancel-btn",
                        title: "custom-title"
                    }
                })
                console.table(lista)
        }
    })
}


/*  BOTONERA  */

let agregar = document.getElementById("agregar")
agregar.addEventListener("click", agregarTattoo)

let filtrar = document.getElementById("filtrar")
filtrar.addEventListener("click", filtrarTattoo)