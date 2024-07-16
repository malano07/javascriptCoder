
// es una calculadora de intereses para pagos en cuotas en un e-commerce


function Calcular_interes(){ // inicio de funcion principal

    let producto= prompt('Nombre Producto') 
    let valor=parseInt(prompt('valor producto'))
    let cuotas=parseInt(prompt('cantidad de cuotas: \n elija entre 1-2-3-4-5-6 y 12 cuotas' ))
    


    function establecer_valor(valor1,cuotas1)  { // funcion para establecer el interes que corresponda en cada caso
        switch(cuotas1){
            case 1: 
                return valor1
            case 2:
                return valor1*1.12;
            case 3: 
                return valor1*1.24;
            case 4:
                return valor1*1.36;
            case 5:
                return valor1*1.48;
            case 6:
                return valor1*1.60;
            case 12:
                return valor1*2  
            default: return alert("cuotas no aceptadas")                  

        }
    }
    
    let precio_final = establecer_valor(valor,cuotas) // estableciendo el valor final en base a la funcion de las cuotas
    let interes=precio_final-valor // buscando el interes discriminado del precio final
    let valor_cuota= precio_final/cuotas // buscando el valor de cada cuota
    
    alert("el precio te queda en $" + precio_final.toFixed(2) + " Sumaste un interes de $" + interes + " abonando en " + cuotas + " cuotas de $ "+ valor_cuota.toFixed(2)+ " cada una " + "para el producto " + producto)
    
}    

Calcular_interes()