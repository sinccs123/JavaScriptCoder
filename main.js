alert("Bienvenido a la Categoría de Tattoos");

let listado = true;
let inicio = true;
let continuar = true;
let identificador = true;

function Login() {
    let intentos = 3;
    let usuario;

    while (intentos > 0) {
        usuario = prompt("Ingrese su nombre (tienes " + intentos + " intentos):").toLowerCase();

        if (usuario == "") {
            alert("Nombre inválido. Vuelva a intentarlo.");
            intentos--;
        } else {
            alert("Bienvenido " + usuario + " ¿Qué tal si empezamos con una búsqueda rápida?");
            return usuario;
        }
    }

    alert("Superaste los 3 intentos.");
    return null;
}

function paso2() {
    alert("Buscando tatuadores disponibles")
    const tatuadores = ["Marcos", "Raul", "Marina", "Eduardo", "Miguel"]
    const tatuadordispo = tatuadores[Math.floor(Math.random()*tatuadores.length)]
    alert("Tenés disponibilidad con "+tatuadordispo)
    return tatuadordispo
}

function paso3(tatuadordispo) {
    alert("Te otorgaremos un horario disponible")
    
    class Horarios{
        constructor(hora) {
            this.hora = hora;
        }
    }

    let hora1 = new Horarios("14:30 hs")
    let hora2 = new Horarios("16:30 hs")
    let hora3 = new Horarios("21:00 hs")
    let hora4 = new Horarios("22:30 hs")

    let listaHorarios = [hora1, hora2, hora3, hora4]
    
    const horarioDisponible = listaHorarios [Math.floor( Math.random() * listaHorarios.length)].hora

    alert("Felicidades, tu turno con "+tatuadordispo+" a las "+horarioDisponible+ " ha sido reservado")
    alert("Ante cualquier duda, llamá al 0800-444-7878")
}

function listadoTattoos() {
    console.log("Opciones de estilos disponibles:");
    console.log("1. Minimalistas - Desde $500 USD");
    console.log("2. American Old School - Desde $650 USD");
    console.log("3. Tradicionales - Desde $700 USD");
    console.log("4. Personalizado - $1200 USD (más impuesto)");
}

const usuario = Login();
if (usuario) {
    listadoTattoos();

    do {
        let buscar = prompt(
            "Selecciona un estilo en particular que te interese\n" +
            "(Escribe un número del 1 al 4)\n\n" +
            "1. Minimalistas - Desde $500 USD\n" +
            "2. American Old School - Desde $650 USD\n" +
            "3. Tradicionales - Desde $700 USD\n" +
            "4. Personalizado - $1200 USD (más impuesto)"
        );

        switch (buscar) {
            case "1":
                manejarMonto(500, "Minimalistas");
                break;
            case "2":
                manejarMonto(650, "American Old School");
                break;
            case "3":
                manejarMonto(700, "Tradicionales");
                break;
            case "4":
                manejarMonto(1200, "Personalizado", 150);
                break;
            default:
                alert("Opción no válida. Por favor, selecciona una opción del 1 al 4.");
        }
    } while (continuar);
} else {
    alert("No se pudo iniciar el proceso debido a intentos fallidos.");
}

function manejarMonto(minimo, estilo, impuesto = 0) {
    let monto = parseFloat(prompt(`Seleccionaste ${estilo}: Escribe un monto superior a ${minimo} USD.`));
    if (isNaN(monto) || monto < minimo) {
        alert(`Monto inválido. Debe ser un número superior a ${minimo} USD.`);
    } else {
        let total = monto + impuesto;
        alert(`Excelente, con ${total} USD tienes disponibilidad para el estilo ${estilo}.`);
        const tatuadorSeleccionado = paso2();
        paso3(tatuadorSeleccionado);
        continuar = false
    }
}


