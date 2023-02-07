var API_KEY = "bc72ac26474f4d819f5102726230702"
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const icon = document.getElementById('icon');

window.addEventListener('load', () => {
    let long;
    let lat;    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(possition => {
            long = possition.coords.longitude;
            lat = possition.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${long}&aqi=yes`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => { 
                console.log(data);

                const {temp_c, condition} = data.current;
                const {region, tz_id} = data.location;

                //set DOM from API
                locationTimezone.textContent = tz_id;
                icon.src = condition.icon;
                temperatureDegree.textContent = temp_c;
                temperatureDescription.textContent = `Conditions in ${region} - ${condition.text}`;
                
            });
        });
    }
});