alert("Bienvenido a la Categoría de Tattoos")

let listado = true
let inicio = true
let continuar = true

    
    do{
        let usuario = prompt("Ingrese el Nombre") .toLowerCase()
        if(usuario == "" || usuario == null || /\d/.test(usuario)){
            alert("No ha ingresado ningun nombre")
            inicio = confirm("¿Deseas volver a intentarlo?")
            if(!inicio){
                alert("Lo vas a reintentar igual")
                inicio = true
            }
        }
        else{
            alert("Bienvenido "+usuario+" ¿Qué tal si empezamos con una búsqueda rápida?")
            inicio = false
        }
    }
    while(inicio)

    function ListadoTattoos() {
        console.log("Opciones de estilos disponibles:")
        console.log("1. Minimalistas - Desde $500 USD")
        console.log("2. American Old School - Desde $650 USD")
        console.log("3. Tradicionales - Desde 700 USD")
        console.log("4. Personalizado - $1200 USD")
    }

    ListadoTattoos()

    function reiniciarProceso(){ 
        alert("Volviendo al inicio...")
        location.reload()}

    do{let buscar = prompt("Selecciona un estilo en particular que te interese\n"+"(Escribe un numero del 1 al 4)\n"+"\n"+
                            "1. Minimalistas - Desde $500 USD\n"+
                            "2. American Old School - Desde $650 USD\n"+
                            "3. Tradicionales - Desde 700 USD\n"+
                            "4. Personalizado - $1200 USD")

        switch (buscar){
            case "1":
                let monto = prompt("Seleccionaste Minimalistas: Escribe un monto superior a los 500 USD.")
                monto = parseFloat(monto)
                    if(monto >= 500){
                        alert("Excelente con "+monto+" tenes disponibilidad.")
                        alert("Comunicate al 011-424 5944")
                        reiniciarProceso();
                        
                    }
                    else{
                        alert("Ingresaste un monto bajo, debe superar los 500Usd")
                    }
                break
        
            case "2":
                let monto2 = prompt("Seleccionaste American Old School: Escribe un monto superior a los 650 USD.")
                monto2 = parseFloat(monto2)
                    if(monto2 >= 650){
                        alert("Excelente con "+monto2+" tenes disponibilidad. Contactate con nosotros")
                        alert("Comunicate al 011-424 5944")
                        reiniciarProceso();
                    }
                    else{
                        alert("Ingresaste un monto bajo, debe superar los 650Usd")
                    }
                break

            case "3":
                let monto3 = prompt("Seleccionaste Tradicionales: Escribe un monto superior a los 750 USD.")
                monto3 = parseFloat(monto3)
                    if(monto3 >= 700){
                        alert("Excelente con "+monto3+" tenes disponibilidad. Contactate con nosotros")
                        alert("Comunicate al 011-424 5944")
                        reiniciarProceso();
                    }
                    else{
                        alert("Ingresaste un monto bajo, debe superar los 700Usd")
                    }
                break

            case "4":
                let monto4 = prompt("Seleccionaste Personalizado: Escribe un monto superior a los 1200 USD.")
                monto4 = parseFloat(monto4)
                    if(monto4 >= 1200){
                        alert("Excelente con "+monto4+" tenes disponibilidad. Contactate con nosotros")
                        alert("Comunicate al 011-424 5944")
                        reiniciarProceso();
                    }
                    else{
                        alert("Ingresaste un monto bajo, debe superar los 1200Usd")
                    }
                break

            default: alert("Opción no válida. Por favor, selecciona una opción del 1 al 4.")
            break
        }
    }
    while (continuar)

