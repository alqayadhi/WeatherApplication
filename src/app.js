
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
        let iconUrl = "http://api.openweathermap.org/img/w/" + icon + '.png';

        document.getElementById('img').src = iconUrl;
        
    
    })
}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const date = new Date(forecast.list[i].dt*1000);

        const hourR = document.createElement('div');
        hourR.setAttribute('class','next');
        
        const div = document.createElement('div');
        const time = document.createElement('p');
        time.setAttribute('class','time');
        time.innerHTML = (date.toLocaleDateString(undefined, 'Europe/Amsterdam'))
        .replace(':00', '');

        const temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273)+ ' °C' + ' / '+ Math.floor(forecast.list[i].main.temp_min - 273)+ ' °C';

        div.appendChild(time);
        div.appendChild(temp);

        const desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);
        
    }
}

function dayForecast(forecast) {
    document.querySelector('.weekF').innerHTML = '';
    for (let i = 8; i < forecast.list.length; i+=8) {
        console.log(forecast.list[i]);
        
        const div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        const day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Europe/Amsterdam');
        div.appendChild(day);   
        
        const temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273)+ ' °C' + ' / '+ Math.floor(forecast.list[i].main.temp_min - 273)+ ' °C'; 
        
        div.appendChild(temp); 
    }
}



