

/*const val1=parseInt(prompt('valor producto 1 que desea comprar'))
const val2= parseInt(prompt('valor producto 2 que desea comprar'))
const val3 = parseInt(prompt( 'valor producto 2 que desea comprar'))
const val4 = parseInt(prompt( 'valor producto 4 que desea comprar'))


function SumarCarro(valor1,valor2,valor3,valor4,){

    while(sumarproducto==true){

        let total= valor1+valor2+valor3+valor4
        let subtotal = total/1.21;
        let iva= total*0.21
        let envio
        if (total<20000){
            envio=4000
        }else(envio=0)
        let total_compra=envio+total

  
        console.log(envio)

    }

}


SumarCarro(val1,val2,val3,val4)*/





function Calcular_interes(){

    let producto= prompt('Nombre Producto')
    let valor=parseInt(prompt('valor producto'))
    let cuotas=parseInt(prompt('cantidad de cuotas: \n elija entre 1-2-3-4-5-6 y 12 cuotas' ))
    


    function establecer_valor(valor1,cuotas1)  {
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
            default: return valor1                     

        }
    }
    
    let precio_final = establecer_valor(valor,cuotas)
    let interes=precio_final-valor
    
    alert("el precio te queda en $" + precio_final + " Sumaste un interes de $" + interes + " abonando en " + cuotas + " cuotas " + "para el producto " + producto)
    
}    

Calcular_interes()