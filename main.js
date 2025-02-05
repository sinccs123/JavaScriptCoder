const Producto = function(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

let producto1 = new Producto("Green Day: American Idiot", 74000, 15);
let producto2 = new Producto("Rammstein: Mutter", 52000, 12);
let producto3 = new Producto("Iron Mainden: The trooper", 180000, 4);
let producto4 = new Producto("RATM: Freedom", 62200, 22);
let producto5 = new Producto("Millencolin: Life On a Plate", 55500, 2);

let lista = [producto1, producto2, producto3, producto4, producto5];

if (localStorage.getItem("productos")) {
    lista = JSON.parse(localStorage.getItem("productos"));
}

function filtrarVinilo(){
    Swal.fire({
        title: "Ingresa el vinilo que deseas buscar",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Buscar",
        showLoaderOnConfirm: true,
        customClass: {
            popup: "custom-popup-buscar",
            confirmButton: "custom-confirm-btn",
            cancelButton: "custom-cancel-btn",
            title: "custom-title"
        }
    }).then((result) => {
        if(result.isConfirmed && result.value) {
            let palabraClave = result.value.trim().toUpperCase();

            let resultado = lista.filter((producto) =>
                producto.nombre.toUpperCase().includes(palabraClave)
            );

            if(resultado.length > 0) {

                let producto = resultado[0];

                let partes = producto.nombre.split(":");
                if(partes.length < 2) {
                    return Swal.fire({
                        title: "Error",
                        text: "El formato del nombre es inválido. Ingresa un Artista o Título",
                        icon: "error",
                        customClass: {
                            popup: "custom-popup",
                            confirmButton: "custom-confirm-btn",
                            cancelButton: "custom-cancel-btn",
                            title: "custom-title"
                        }
                    });
                }

                let artista = partes[0].trim();
                let titulo = partes[1].trim();

                const url = `https://private-anon-6777dcb0e1-lyricsovh.apiary-proxy.com/v1/${encodeURIComponent(artista)}/${encodeURIComponent(titulo)}`;

                fetch(url)
                    .then(response => {
                        if(!response.ok) {
                            throw new Error("No se encuentra en nuestro listado");
                        }
                        return response.json();
                    })
                    .then(data => {
                        let lyrics = data.lyrics || "No se encontraron lyrics para esta canción.";

                        let htmlContent = `
                            <table>
                                <tr>
                                    <th>Producto:</th>
                                    <td>${producto.nombre}</td>
                                </tr>
                                <tr>
                                    <th>Precio:</th>
                                    <td>${producto.precio}</td>
                                </tr>
                                <tr>
                                    <th>Stock:</th>
                                    <td>${producto.stock}</td>
                                </tr>
                            </table>
                            <br>
                            <strong>Lyrics:</strong>
                            <p style="white-space: pre-wrap;">${lyrics}</p>
                        `;

                        Swal.fire({
                            title: "Resultado de la búsqueda",
                            html: htmlContent,
                            customClass: {
                                popup: "custom-popup",
                                confirmButton: "custom-confirm-btn",
                                cancelButton: "custom-cancel-btn",
                                title: "custom-title"
                            }
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error al obtener datos sobre el vinilo",
                            text: error.message,
                            icon: "error",
                            customClass: {
                                popup: "custom-popup-failyrics",
                                confirmButton: "custom-confirm-btn",
                                cancelButton: "custom-cancel-btn",
                                title: "custom-title"
                            }
                        });
                    });
            } else {
                Swal.fire({
                    title: "No se encuentra en nuestro stock",
                    icon: "error",
                    confirmButtonText: "OK",
                    customClass: {
                        popup: "custom-popup-failsearch",
                        confirmButton: "custom-confirm-btn",
                        cancelButton: "custom-cancel-btn"
                    }
                });
            }
        }
    });
}

function agregarVinilo(){
    Swal.fire({
        title: "Vender un vinilo",
        html: `<label>Nombre:</label><input id="nombre-input" class="swal2-input" type="text" autofocus>
        <label>Precio:</label><input id="precio-input" class="swal2-input" type="number" step="0.01">
        <label>Stock:</label><input id="stock-input" class="swal2-input" type="number" step="1">`,
        showCancelButton: true,
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
        customClass: {
            popup: "custom-popup-2",
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
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Por favor ingresa valores válidos",
                });
                return;
            }
            
            let producto = new Producto(nombre, precio, stock);

            if(lista.some((elemento)=> elemento.nombre === producto.nombre)){
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "El vinilo ya existe en nuestro stock",
                    customClass: {
                        popup: "custom-popup-venta",
                        confirmButton: "custom-confirm-btn",
                        cancelButton: "custom-cancel-btn",
                        title: "custom-title"
                    }
                });
                return;
            }
            
            lista.push(producto);
            localStorage.setItem("productos", JSON.stringify(lista));

            Swal.fire({
                icon: "success",
                title: "Vinilo en venta",
                text: `Se agregó ${producto.nombre} a nuestro listado`,
                timer: 3000,
                customClass: {
                    popup: "custom-popup-venta",
                    confirmButton: "custom-confirm-btn",
                    cancelButton: "custom-cancel-btn",
                    title: "custom-title"
                }
            });
            console.table(lista);
        }
    });
}

let btnAgregar = document.getElementById("agregar");
btnAgregar.addEventListener("click", agregarVinilo);

let btnFiltrar = document.getElementById("filtrar");
btnFiltrar.addEventListener("click", filtrarVinilo);
