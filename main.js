/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data; 
    mostrarlasComidaConforeach(comidas)})               // Asignar el JSON a la variable comidas
  
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.log('Error al leer el archivo JSON:', error);
  });

  

let comidas = [];

const container = document.getElementById('comidaContainer');



mostrarComidaConforeach()

const agregarComidaform = document.getElementById("agregarComidaForm")

agregarComidaform.addEventListener("submit", (event) => (

alert("Comida agregada" +  event.target.nombre.value)

))



let nuevacomida = {
  nombre: event.target.nombre.value,
categoria:event.target.categoria.value,
 provincia: event.target.provincia.value,
  ingrediente: event.target.ingredientes.value,
}

comidas.push(nuevacomida)
mostrarComidaConforeach()

const buscador = document.getElementById("buscador")
const filtroCategoria = document.getElementById("filtroCategoria")
const filtroProvincia = document.getElementById("filtroProvincia")

function filtrar() {
  const comidasFiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtroCategoria.value)
    && comida.provincia.includes(filtroProvincia.value)
   })
}

function buscar(){
const texto = buscador.value.toLowerCase()

const comidasFiltradas = comidas.filter( comida => {
  return comida.nombre.toLowerCase().includes(texto)
  ||  comida.provincia.toLowerCase().includes(texto)
  ||  comida.categoria.toLowerCase().includes(texto)
})
mostrarComidas(comidasFiltradas)
}

filtroCategoria.addEventListener ("change", filtrar)
filtroProvincia.addEventListener ("change", filtrar)
buscador.addEventListener("input", buscar)
