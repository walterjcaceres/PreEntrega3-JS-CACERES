let producto,precio;  //declaro variables

//--------------------------------LISTA-----------------------------//
       
let productos = []

productos = JSON.parse(localStorage.getItem("array")) || [];

//--------------------------------FUNCIONES-----------------------------//



function agregarProducto(producto,valor){
  productos.push({nombre:producto,precio:valor});  //agrega el producto al final del array
  localStorage.setItem("array",JSON.stringify(productos))
}

function eliminarProducto(producto){
  let arrayDeNombres=productos.map(el=>el.nombre) //creo un array solo con los nombres, para buscarlo con indexOF
  let posicion=arrayDeNombres.indexOf(producto) //retorna -1 si no lo encuentra, por eso ponemos un IF a continuacion
  if(posicion>=0){
    productos.splice(posicion,1);
  } else {
    eliminado.classList.remove("noVisible")
    setTimeout(() => {
      eliminado.classList.add("noVisible")
    }, 3000);
    
  }
  localStorage.setItem("array",JSON.stringify(productos))
}

function buscarProducto(producto){
  let resultado=productos.find(el=>el.nombre===producto)
  resultadoBusqueda.classList.remove("noVisible")
  resultadoBusqueda.innerText=(resultado ? "El producto es: "+resultado.nombre+" y su precio es de: $"+resultado.precio :"El producto no se encuentra disponible")
  setTimeout(() => {
    resultadoBusqueda.classList.add("noVisible")
  }, 5000);
}



function ordenarPorPrecio(opcion){
  let menu;
  do {
    menu = opcion
    
      switch(menu){
        case 1:                              //ordena ascendente
          productos.sort((a,b)=>{    
            if(a.precio>b.precio){
              return 1
            }

            if(a.precio<b.precio){
              return -1
            }

            if(a.precio=b.precio){
              return 0
            }
          })
        break;
        case 2:                               //ordena descendente
          productos.sort((a,b)=>{           
            if(a.precio<b.precio){
              return 1
            }

            if(a.precio>b.precio){
              return -1
            }

            if(a.precio=b.precio){
              return 0
            }
          })
          
        break;
        case 3:
        break;
    }
    
  } while((menu<1||menu>3)||isNaN(menu));    //si la opcion es distinta a 1,2 o 3 se repite el do-while 
}

function filtrarPorPrecio(min,max){
  const filtro = productos.filter(el=>el.precio<max&&el.precio>min)
  imprimirProductos(filtro)
}

function imprimirProductos(array){   
  // Eliminamos todos los elementos hijos de la lista
  while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
  }

  for(let i=0;i<array.length;i++){  
    const li = document.createElement("li");
    li.innerText=("Producto: "+array[i].nombre+" Precio: $"+array[i].precio)
    lista.append(li)
  }
   //imprimo respuesta
}

function modificarProducto(producto){
  let resultado=productos.find(el=>el.nombre===producto)     //busca el producto en el array
  if(resultado==undefined){ 
    eliminado2.classList.remove("noVisible")
    setTimeout(() => {
      eliminado2.classList.add("noVisible")
    }, 3000);          
  } else {
    
  eliminarProducto(producto);
  agregarProducto(productoNuevo.value,parseInt(precioNuevo.value));
  }

}

//Programa principal:

//----------------------------------Nombre----------------------------//



let lista = document.querySelector("#lista")
let text1 = document.querySelector("#producto")
let text2 = document.querySelector("#precio")
let btnAgregar=document.querySelector("#agregar")
let btnEliminar=document.querySelector("#eliminar")
let eliminado=document.querySelector("#eliminado")
let productoViejo = document.querySelector("#productoViejo")
let productoNuevo = document.querySelector("#producto2")
let precioNuevo = document.querySelector("#precio2")
let btnModificar=document.querySelector("#modificar")
let eliminado2=document.querySelector("#eliminado2")
let productoBusqueda = document.querySelector("#productoBusqueda")
let btnBuscar=document.querySelector("#buscar")
let resultadoBusqueda=document.querySelector("#resultadoBusqueda")
let Ordenar=document.querySelector("#orden")
let btnFiltrar=document.querySelector("#filtrar")
let textMin = document.querySelector("#min")
let textMax = document.querySelector("#max")
        

       
productos && imprimirProductos(productos)
       

btnAgregar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=text1.value
  precio=parseInt(text2.value)
  agregarProducto(producto,precio)
  imprimirProductos(productos)

})

btnEliminar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=text1.value
  eliminarProducto(producto);
  imprimirProductos(productos)
          
})

btnModificar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=productoViejo.value
  modificarProducto(producto)
  imprimirProductos(productos)
          
})

btnBuscar.addEventListener("click",(e)=>{
  e.preventDefault()
  producto=productoBusqueda.value
  buscarProducto(producto);
  imprimirProductos(productos)
          
})

Ordenar.addEventListener("click",(e)=>{
  e.preventDefault()
  let aux=parseInt(Ordenar.value)
  console.log(aux)
  ordenarPorPrecio(aux)
          
  imprimirProductos(productos)
          
})
      
btnFiltrar.addEventListener("click",(e)=>{
  e.preventDefault()
  filtrarPorPrecio(textMin.value,textMax.value);
          
})