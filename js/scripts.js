// Variaveis e Seletor de Elementos
const apiKey = "4aa264495ee7a4f65c7c9a68f6f91454";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

//Elementos de Pesquisa
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityBtn = document.querySelectorAll("#container-select button");

//Seleção de Containers
const weatherData = document.querySelector("#weather-data");
const error = document.querySelector("#error");
const loading = document.querySelector("#loading");
const citySelect = document.querySelector("#container-select");

//Elementos de Dados do Tempo
const cityElement = document.querySelector("#city");
const flagElement = document.querySelector("#flag-country");
// https://countryflagsapi.com/png/br
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIcon = document.querySelector("#weather-icon");
// http://openweathermap.org/img/wn/04n.png
const umidElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

// Tratamento de erro
const showErrorMessage = () => {
	error.classList.remove("hide");
};

// Funcoes
const toggleLoader = () => {
	loading.classList.toggle("hide");
};

const hideInformation = () => {
	error.classList.add("hide");
	weatherData.classList.add("hide");
	citySelect.classList.add("hide");
};

const getWeatherData = async (city) => {
	toggleLoader();

	const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

	const res = await fetch(apiWeatherURL);
	const data = await res.json();

	toggleLoader();

	return data;
};

const showWeatherData = async (city) => {
	hideInformation();

	const data = await getWeatherData(city);

	console.log(data);

	if (data.cod === "404") {
		showErrorMessage();
		return;
	}

	cityElement.textContent = data.name;
	flagElement.setAttribute("src", apiCountryURL + data.sys.country);
	tempElement.textContent = parseInt(data.main.temp);
	descElement.textContent = data.weather[0].description;
	weatherIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
	);
	umidElement.textContent = data.main.humidity;
	windElement.textContent = data.wind.speed;

	weatherData.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", async (e) => {
	e.preventDefault();

	const city = cityInput.value;

	showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
	if (e.code === "Enter") {
		const city = e.target.value;

		showWeatherData(city);
	}
});

// Botões de Sugestão de Cidade
cityBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		const city = btn.innerHTML;

		showWeatherData(city);
	});
});
