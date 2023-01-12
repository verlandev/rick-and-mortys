// *1 Conseguir los datos de nuestra api (base de datos).
// *2 Pintar los elementos que queramos en la forma que queramos
// *3 Crear un buscador de personasjes. Es algo que puede estar fuera
// *4 Crea un filtro de especies y otro de vivo o muerto

// ! IMPORTANTE:

// ! Tenemos que tener en cuenta que dentro de la función fetchData vamos a llamar a otras funciones que ya tienen que estar creadas.
// ! Por eso, esta funcion se quedará hacia el final del documento de javascript.
// ! FetchData es la que alimenta la funcionalidad del resto.

// Sabiendo que la base de datos hay que pedirla y que puede "tardar" un poco, vamos a utilizar la asincronía

// Empezamos añadiendo la URL --> nos va a facilitar llamarla cada vez que fuera necesario.

let characters = []; // almacenamos los datos de los pokemons, así la tenemos más a mano

// Creamos el botón de búsqueda

const inputSearch$$ = document.querySelector(".search__input");
const searchButton$$ = document.querySelector(".search__button");

// Creo una función que una vez la llame, ejecutará otra función.
// Primero buscará y luego filtrará
const search = () => {
  const charactersFiltered = characters.filter((character) => {
    // character es un PUTO PARAMETRO Y SE LO PONES TÚ SIN PUTO MIEDO. Como si lo llamas "meCagoEnSusMuertos" que te va a hacer caso
    return character.name
      .toLowerCase()
      .includes(inputSearch$$.value.toLowerCase());
  });
  console.log(charactersFiltered);
  showCharacters(charactersFiltered);
};

inputSearch$$.addEventListener("input", search); // esto para que se impriman bonito mientras escribes.

const showCase$$ = document.createElement("div"); // Y esto tiene que ir PUTO FUERA o en el HTML que si no pierde su funcionalidad.

// Creamos el filtro por status

const selectOptions$$ = document.querySelector("#statusFilter");
const selectType$$ = document.querySelector('#typeFilter')

const statusFilter = () => {
  const characterByStatus = characters.filter((character) => {
    if(selectOptions$$.value === 'Todos' && selectType$$.value === 'Todos'){
        return character
    }else if(selectOptions$$.value === "Todos"){
        return character.specie.includes(selectType$$.value)
    } else if(selectType$$.value === "Todos"){
        return character.status.includes(selectOptions$$.value)
    }else {
    return character.status.includes(selectOptions$$.value) && character.species.includes(selectType$$.value);
    }
  });
  showCharacters(characterByStatus);
};

selectOptions$$.addEventListener("change", statusFilter);
selectType$$.addEventListener("change", statusFilter);

// const selectOptions$$   = document.querySelector('#statusFilter');
// const aliveOption$$     = document.querySelector('#statusFilter').value = 'Alive'
// const deadOption$$      = document.querySelector('#statusFilter').value = 'Dead'
// const unknownOption$$   = document.querySelector('#statusFilter').value = 'Unknown'

// console.log(selectOptions$$.value)
// console.log(aliveOption$$)

// const statusFilter = () => {

//         const characterByStatus = characters.filter((character) => {
//             if(selectOptions$$.value === 'Alive'){
//                 return character.status === selectOptions$$.value

//             }
//         })
//         showCharacters(characterByStatus)
// }
// selectOptions$$.addEventListener('click', statusFilter)

// const selectOptions$$ = document.querySelector('#statusFilter')
//             console.log(selectOptions$$)

// const statusFilter = () => {

//     const characterByStatus = characters.filter((character) =>{
//         if(selectOptions$$.value === 'alive'){
//             return character.status
//             .includes(selectOptions$$.value)

//         }
//     })
//     showCharacters(characterByStatus)
// }

//             const statusFilter = () => {
//                 const aliveOption$$     = document.querySelector('#statusFilter').value = 'Alive'
//                 const deadOption$$      = document.querySelector('#statusFilter').value = 'Dead'
//                 const unknownOption$$   = document.querySelector('#statusFilter').value = 'Unknown'

//                     const characterByStatus = characters.filter((character) =>{
//                         if(aliveOption$$){
//                             return card$$.className.includes('alive')
//                         }
//                     })
//             }

//             selectOptions$$[0].addEventListener('click', statusFilter)
//             selectOptions$$[1].addEventListener('click', statusFilter)
//             selectOptions$$[2].addEventListener('click', statusFilter)

const showCharacters = (charactersToPrint) => {
  showCase$$.innerHTML = "";
  // Con esto "borro" el div donde se almacenan los personajes para que el filtro de búsqueda me imprima según el valor que voy marcando en el input. Sin esta PUTA MIERDA se te imprimen abajo del todo y no los ves y piensas que no funciona. PEDAZO DE LOOSER

  for (const character of charactersToPrint) {
    let image = character.image;
    let name = character.name;
    let id = character.id;
    let specie = character.species;
    let status = character.status;

    // Creamos los elementos
    const card$$ = document.createElement("div");
    const image$$ = document.createElement("img");
    const name$$ = document.createElement("h3");
    const id$$ = document.createElement("p");
    const specie$$ = document.createElement("p");
    const status$$ = document.createElement("p");

    // Incluímos lo que van a llevar dentro, peeeeeero llegados a este punto no tenemos sacadas las variables con las que llenar nuestras cartas
    // Por eso hacemos el contenido de las variables [líneas 28 a 31]
    // Ahora sí, incluímos lo que hay dentro

    image$$.src = image;
    name$$.textContent = name;
    id$$.textContent = "#00" + id;
    specie$$.textContent = specie;
    status$$.textContent = status;

    // Y ahora damos clases con las que también podemos jugar luego o añadir según necesitemos en otras funciones

    showCase$$.classList.add("showCase");
    card$$.classList.add("card");
    image$$.classList.add("card__img");
    name$$.classList.add("card__h3");
    id$$.classList.add("card__p");
    specie$$.classList.add("card__p");
    status$$.classList.add("card__p");

    if (character.status === "Alive") {
      card$$.className = "alive";
    }
    if (character.status === "Dead") {
      card$$.className = "dead";
    }
    if (character.status === "unknown") {
      card$$.className = "unknown";
    }

    // y emparentamos

    // ?OJO: Queremos emparentar los elementos de la carta para que estén dentro de ella.
    // ? Cada carta tendrá las mismas clases y los elementos de dentro: img, h3 y p serán los hijos de la carta.
    // ? Pero la carta también tiene que tener un contenedor padre. Por eso, volvemos arriba ANTES DEL BUCLE y creamos un contenedor.
    // ! IMPORTANTE: ese contenedor tiene que estar fuera del bucle porque si no, cada carta tendrá un contenedor padre y no estaríamos haciendo nada realmente.

    document.body.appendChild(showCase$$);
    showCase$$.appendChild(card$$);
    card$$.append(image$$, name$$, id$$, specie$$, status$$);
  }
};

// puedes hacer el fetch: solo, con async/await o en una variable

// fetch()
// function fetch(){}
// const fetchData = function(){}

const fetchData = async () => {
  //Espero a que llegue el camarero para pedir (los 5 minutos de rigor)
  const IWantThis = await fetch("https://rickandmortyapi.com/api/character/"); // Cuando llega el camarero le digo que me traiga algo que combine huevos y patatas
  const IReceiveThis = await IWantThis.json(); // cuando vuelve me trae mis huevos y patatas en forma de tortilla para que me la pueda comer --> el método json()
  console.log(IReceiveThis); // necesitamos el apartado results
  console.log(IReceiveThis.results);
  characters = [...IReceiveThis.results];
  console.log(characters);
  showCharacters(characters); // Esta es la función que llamamos aquí, pero creamos FUERA.
};

fetchData(); // Parece obvio, pero si no pones esto, no vas a ver el resultado del clg de dentro de la función

// 1) Entender que javascript al final es un juego de saber crear y llamar funciones.
// esas funciones van a crear el "círculo o circuito de funcionalidad"
// 2) Saber recorrer los datos de una api (BBDD)
// 3) Bucles y los arrays.
