const Producto = function(nombre, precio, stock, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
};

let producto1 = new Producto("Rammstein: Mutter", 74000, 15, "imagenes/rammstein.jpg");
let producto2 = new Producto("Green day: American Idiot", 52000, 12, "imagenes/greenday.jpg");
let producto3 = new Producto("Iron Maiden: The Trooper", 180000, 4, "imagenes/ironmaiden.jpg");
let producto4 = new Producto("RATM: Freedom", 62200, 22, "imagenes/ratm.jpg");
let producto5 = new Producto("Millencolin: Life On a Plate", 55500, 2, "imagenes/millencolin.jpg");
let producto6 = new Producto("Gorillaz: Plastic Beach", 85500, 5, "imagenes/gorillaz.jpg");

let lista = [producto1, producto2, producto3, producto4, producto5, producto6];

if (localStorage.getItem("productos")) {
    lista = JSON.parse(localStorage.getItem("productos"));
}

function fetchExchangeRate() {
    return fetch("https://v6.exchangerate-api.com/v6/78db91e865e675263116e49d/latest/USD")
        .then(response => response.json())
        .then(data => data.conversion_rates.ARS)
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            Swal.fire({
                title: "Error fetching exchange rate",
                icon: "error",
                confirmButtonText: "OK",
            });
            return null;
        });
}

function convertToUSD(amount, exchangeRate) {
    return (amount / exchangeRate).toFixed(2);
}

function filtrarVinilo() {
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
        if (result.isConfirmed && result.value) {
            let palabraClave = result.value.trim().toUpperCase();

            let resultado = lista.filter((producto) =>
                producto.nombre.toUpperCase().includes(palabraClave)
            );

            fetchExchangeRate().then(exchangeRate => {
                if (exchangeRate !== null && resultado.length > 0) {
                    let htmlContent = resultado.map((producto) => `
                    <ul class="custom-list">
                        <li class="left-column"><strong>Producto:</strong> ${producto.nombre}</li>
                        <li class="left-column"><strong>Precio:</strong> $${producto.precio} (ARS) / $${convertToUSD(producto.precio, exchangeRate)} (USD)</li>
                        <li class="left-column"><strong>Stock:</strong> ${producto.stock}</li>
                        <li class="right-column"><img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 200px;"></li>
                    </ul><hr>
                    `).join("");

                    Swal.fire({
                        title: "Resultados encontrados",
                        confirmButtonText: "Comprar",
                        html: htmlContent,
                        customClass: {
                            popup: "custom-popup",
                            confirmButton: "custom-confirm-btn",
                            cancelButton: "custom-cancel-btn",
                            title: "custom-title"
                        }
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
            });
        }
    });
}

function agregarVinilo() {
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
    }).then((result) => {
        if (result.isConfirmed) {
            let nombre = document.getElementById("nombre-input").value.trim();
            let precio = document.getElementById("precio-input").value.trim();
            let stock = document.getElementById("stock-input").value.trim();

            if (isNaN(precio) || isNaN(stock) || nombre === "") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Por favor ingresa valores válidos",
                });
                return;
            }

            let producto = new Producto(nombre, precio, stock);

            if (lista.some((elemento) => elemento.nombre === producto.nombre)) {
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
