/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data
    mostarlasomidasconforeach(comidas)          
    actualizarFiltros()        // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = []

const container = document.getElementById('comidaContainer');

function mostarlasomidasconforeach(lista){
  container.innerHTML = "";

  lista.forEach(comida => {

    console.log(comida.ingredientes)

    let lista = comida.ingredientes
    let listita = ""
    lista.forEach(itemdelista => {
      listita += `<li>${itemdelista}</li>`
    })
    container.innerHTML += 
    ` <article class="card">
     <p class= "categoría">${comida.categoria}</p>
      <h2 class="comida">${comida.nombre}</h2>
      <p>${comida.provincia}</p>
      <ul>
      ${listita}
      </ul>
  </article>`

  })
}

const agregarcomidaform = document.getElementById('agregarcomida');
agregarcomidaform.addEventListener("submit",(event) => {
  //alert("Comida agregada: " + event.target.nombre.value)
  event.preventDefault()
  let listitaingredientes = []
  const ingredientesInputs = document.querySelectorAll(".ingrediente")
  ingredientesInputs.forEach(input => {
    listitaingredientes.push(input.value.trim())
  })
  let comidanueva = {
    nombre: event.target.nombre.value,
    provincia: event.target.provincia.value,
    categoria: event.target.categoria.value,
    ingredientes: listitaingredientes 
  }
  comidas.push(comidanueva)
  mostarlasomidasconforeach(comidas)
  console.log(comidanueva)
  ingredientesContainer.innerHTML = `<input type="text" class="ingrediente" placeholder="Ingredientes">`
  actualizarFiltros()
  event.target.reset()
})


const buscar = document.getElementById("Buscar")
const filtrocategoría = document.getElementById("filtrocategoria")
const filtroprovincia = document.getElementById("filtroprovincia")

function filtrar () {
  const comidasfiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtrocategoría.value)
    && comida.provincia.includes(filtroprovincia.value)
  })


  mostarlasomidasconforeach(comidasfiltradas)
}

function buscamelo(){

  const texto = buscar.value.toLowerCase()
  const comidasfiltradas = comidas.filter(comida => {

    return comida.nombre.toLowerCase().includes(texto) || comida.provincia.toLowerCase().includes(texto) || comida.categoria.toLowerCase().includes(texto)
  })
mostarlasomidasconforeach(comidasfiltradas)

}

filtrocategoría.addEventListener ("change", filtrar)
filtroprovincia.addEventListener ("change", filtrar)
buscar.addEventListener("input", buscamelo)

const agregaringredientesboton = document.getElementById("agregarIngredientes")
const ingredientesContainer = document.querySelector(".contenedorIngredientes")

agregaringredientesboton.addEventListener("click", () => {
ingredientesContainer.innerHTML += `<input type="text" class="ingrediente" placeholder="Ingredientes">`
})

function actualizarFiltros(){
  filtrocategoría.innerHTML = `<option value="">Todas las Categorías</option>`
  filtroprovincia.innerHTML = `<option value="">Todas las Provincias</option>`
  let categorias = []
  let provincias = []
  comidas.forEach(comida => {
    if(!categorias.includes(comida.categoria)){categorias.push(comida.categoria)};
    if(!provincias.includes(comida.provincia)){provincias.push(comida.provincia)}
  })
  categorias.forEach(categoria => {
    filtrocategoría.innerHTML += `<option value="${categoria}">${categoria}</option>`
  })
  provincias.forEach(provincia => {
    filtroprovincia.innerHTML += `<option value="${provincia}">${provincia}</option>`
  })
}
