const inputCiudades = document.getElementById("inputCiudades")
const formCityList = document.getElementById("form-city-list")
const ingresada = document.querySelector(".Ingresada")
const errorAlert = document.querySelector(".error")
const agregada = document.querySelector(".Agregada")
const claveAPI = '4f787d7cf3b234860000dd287ed2a7c3';



//Ciudades va a ser que si encuentra en el localStorage la array CITIES va a tomar
//ese valor o si no existe o no lo encuentra va a ser un array vacio
let ciudades = JSON.parse(localStorage.getItem("CITIES")) || [];


// Llamada a la API asincrona, busca la ciudad y si la encuentra devuelve .json (data), sino tira error.

const requestWeatherApi = async (cityName) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${claveAPI}`
    const response = await fetch(URL) //devuelve promesa
        .then((result) => {
            if (result.status != 200) {
                console.log("ERR0R promesa")
                errorAlert.classList.remove("alertas");
                return "error"
            }
        //result .status es que si te da 200 salio todo ok y llego toda la data, y sino hubo un error.
            return result.json()
        })

    const data = response;
    //Si arriba tira error aca lo agarra y no hace nada. No lo guarda ni nada. Solo lo retorna.
    try {
        if (data === "error") { return }
        ciudades = [...ciudades, { name: cityName, cityId: ciudades.length + 1 }];

        addNewCityToLocalStorage(ciudades);

        agregada.classList.remove("alertas")

        inputCiudades.value = "";

        return data;
    } catch (error) {
        console.log("ERR0R catch")
        errorAlert.classList.remove("alertas");


    }
}



// guarda la data (ciudades)
function addNewCityToLocalStorage(array) {

    localStorage.setItem("CITIES", JSON.stringify(array));
}

const alertReset = () => {
    agregada.classList.add("alertas")
    ingresada.classList.add("alertas")
    errorAlert.classList.add("alertas")
}
const addCity = async (e) => {
    //Cuando hay un submit, evita la recarga.
    e.preventDefault();
    //newcitys agarra el nombre de la ciudad y 
    const newCitys = inputCiudades.value.trim();

    alertReset();
    if (newCitys.length === 0) {
        alert("No puedes dejar este campo vacio")
    }

    else if (ciudades.some(ciudad => ciudad.name.toUpperCase() === newCitys.toUpperCase())) {
        ingresada.classList.remove("alertas")
        return
    }


    else {

        await requestWeatherApi(newCitys);
        inputCiudades.value = "";
    }
}

const init = () => {

    formCityList.addEventListener("submit", addCity);
}


init()