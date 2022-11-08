const cityList = JSON.parse(localStorage.getItem("CITIES")) || [];
const selectCityes = document.getElementById("seleccionarCiudades");
const consultarBtn = document.getElementById("consultarBtn");
const CajaRender = document.querySelector(".caja")


const requestWeatherApi = async (cityName) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4f787d7cf3b234860000dd287ed2a7c3`
    const response = await fetch(URL) //devuelve promesa
        .then((result) => {
            if (result.status != 200) {
                console.log("ERR0R promesa")
                return "error"
            }
            return result.json()
        })

    const data = response;

    try {

        if (data === "error") { return }

        return data;
    } catch (error) {

        console.log("ERR0R catch")


    }

}

//el addselector trae todas las ciudades del localStorage y te las renderiza en el selector

const addSelector = () => {
    cityList.map(iterador => {
        const option = document.createElement("option");
        option.value = iterador.cityId - 1;
        option.text = iterador.name;
        selectCityes.appendChild(option);
    })

}
// RenderCity 
const renderCity = async () => {
    const value = selectCityes.selectedIndex - 1;
    const cityApi = await requestWeatherApi(selectCityes[value + 1].outerText)

    CajaRender.innerHTML =
        `<h3>${cityApi.name}</h3>
    <section id="section-weather-result">
        <div class="card">
            <p> <img src="http://openweathermap.org/img/wn/${cityApi.weather[0].icon}@2x.png" alt="">
        </div>
    </section>
    <p>Temperatura: ${(cityApi.main.temp - 273.15).toFixed(2)}°</p>
    <p>Sensacion termica: ${(cityApi.main.feels_like - 273.15).toFixed(2)}°</p>
    <p>Humedad: ${cityApi.main.humidity}%</p>
    <p>Velocidad del viento:${cityApi.wind.speed}km/h</p>
    <p>Presion: ${cityApi.main.pressure}P</p>`

    

}

const init = () => {
    addSelector()
    consultarBtn.addEventListener("click", renderCity)
}
init()