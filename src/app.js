
const apiKey = '49cc8c821cd2aff9af04c9f98c36eb74';

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude,
            lat = position.coords.latitude;

            const url = `http://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=${apiKey}`;
            //https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        
            fetch(url)
            .then(res => res.json())
            .then((data) =>{
                console.log(data);
                weatherReport(data);
            })
        })
    }
})

function weatherReport(data){
    const urlCast = `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apiKey}`;
    
    fetch(urlCast)
    .then(res => { 
        return res.json()})
    .then((forecast) =>{
        console.log(forecast);
        hourForecast(forecast);
        dayForecast(forecast);

        document.getElementById('city').innerHTML = data.name+ ', ' + data.sys.country;

        document.getElementById('temperature').innerHTML = Math.floor(data.main.temp - 273)+ ' °C';

        document.getElementById('clouds').innerHTML = data.weather[0].description;

        let icon = data.weather[0].icon;
        let iconUrl = "http://api.openweathermap.org/img/w" + icon + '.png';

        document.getElementById('img').src = iconUrl;
    
    })
}

function hourForecast(forecast) {

}

function dayForecast(forecast) {

}