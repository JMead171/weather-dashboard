const apiUrlAddress = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = ",US&appid=93da93c3fcfd7a2c52246c945a8f72df";
const apiUVlat = "http://api.openweathermap.org/data/2.5/uvi?appid=93da93c3fcfd7a2c52246c945a8f72df&lat=";
const apiUVlon = "&lon=";
const apiIcon = "http://openweathermap.org/img/wn/" 
const apiIcode = ".png";
const api5day = "http://api.openweathermap.org/data/2.5/forecast?lat=";
const api5daylon = "&lon=";
const api5daykey = "&appid=93da93c3fcfd7a2c52246c945a8f72df";



let city = "Brielle";

// Get the current day using moment and display on scheduler
//let today = moment().format("M/D/YYYY");
//    console.log(today);
//
//let todayUnix = moment().unix();
//    console.log(todayUnix);

let getWeather = function(city) {
    let apiUrl = apiUrlAddress + city + apiKey;
    console.log(apiUrl);
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {    
                // get current date from fetch api
                let dateToday = data.dt;
                console.log(dateToday);
                let displayDate = moment.unix(dateToday).format("M/D/YYYY");
                console.log(displayDate);
                // weather icon
                let icode = data.weather[0].icon;
                console.log(icode);
                //getWeatherIcon(icode);
                // temp
                let fahrtemp = Math.floor((((data.main.temp - 273.15) * 1.8000) + 32));
                console.log(fahrtemp);
                //humidity
                let humidity = data.main.humidity;
                console.log(humidity);
                // wind
                let windSpeed = data.wind.speed;
                console.log(windSpeed);
                // UV index
                let lat = data.coord.lat;
                let lon = data.coord.lon;
                console.log(lat, lon);
                getUVindex(lat, lon);
                get5day(lat, lon, dateToday);
                });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("unable to connect to GitHub");
    });
};

let getWeatherIcon = function(icode) {
    let apiIconUrl = apiIcon + icode + apiIcode;
    console.log(apiIconUrl);
    fetch(apiIconUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(icon) {    
            console.log(icon);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("unable to connect to GitHub");
    });
} 

let getUVindex = function(lat, lon) {
    let apiUrluv = apiUVlat + lat + apiUVlon + lon;
    console.log(apiUrluv);
    fetch(apiUrluv).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {    
                let uvIndex =  data.value;
                console.log(uvIndex);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("unable to connect to GitHub");
    });
}; 

let get5day = function(lat, lon, dateToday) {
    let apiUrl5day = api5day + lat + api5daylon + lon + api5daykey;
    console.log(apiUrl5day);
    fetch(apiUrl5day).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {    
                let datePlus1 = (dateToday + (60 * 60 * 24));
                let datePlus2 = (datePlus1 + (60 * 60 * 24));
                let datePlus3 = (datePlus2 + (60 * 60 * 24));
                let datePlus4 = (datePlus3 + (60 * 60 * 24));
                let datePlus5 = (datePlus4 + (60 * 60 * 24));
                console.log(dateToday, " : ", datePlus2,datePlus3, datePlus4, datePlus5);
                
                //initialize
                let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0;
                let day5 = data.list.length - 1;
                let date5 =  data.list[day5].dt;
                let temp5 =  data.list[day5].main.temp;
                let humd5 =  data.list[day5].main.humidity;
                let icon5 =  data.list[day5].weather[i].icon;
                console.log("INT: ", day5, date5, temp5, humd5, icon5);

                for (let i = 0; i < data.list.length; i++) { 
                    if (d1 = 0) {
                        if (datePlus1 > data.list[i].dt) {
                            d1++;
                            let date1 =  data.list[i].dt;
                            let temp1 =  data.list[i].main.temp;
                            let humd1 =  data.list[i].main.humidity;
                            let icon1 =  data.list[i].weather[i].icon;
                            console.log("1: ", i, date1, temp1, humd1, icon1);
                        }
                    }
                    if (d2 = 0) {
                        if (datePlus2 > data.list[i].dt) {
                            d2++;
                            let date2 =  data.list[i].dt;
                            let temp2 =  data.list[i].main.temp;
                            let humd2 =  data.list[i].main.humidity;
                            let icon2 =  data.list[i].weather[i].icon;
                            console.log("2: ", i, date2, temp2, humd2, icon2);
                        }
                    }
                    if (d3 = 0) {
                        if (datePlus3 > data.list[i].dt) {
                            d3++;
                            let date3 =  data.list[i].dt;
                            let temp3 =  data.list[i].main.temp;
                            let humd3 =  data.list[i].main.humidity;
                            let icon3 =  data.list[i].weather[i].icon;
                            console.log("3: ", i, date3, temp3, humd3, icon3);
                        }
                    }
                    if (d4 = 0) {
                        if (datePlus4 > data.list[i].dt) {
                            d4++;
                            let date4 =  data.list[i].dt;
                            let temp4 =  data.list[i].main.temp;
                            let humd4 =  data.list[i].main.humidity;
                            let icon4 =  data.list[i].weather[i].icon;
                            console.log("4: ", i, date4, temp4, humd4, icon4);
                        }
                    }
                    if (d5 = 0) {
                        if (datePlus5 > data.list[i].dt) {
                            d5++;
                            let date5 =  data.list[i].dt;
                            let temp5 =  data.list[i].main.temp;
                            let humd5 =  data.list[i].main.humidity;
                            let icon5 =  data.list[i].weather[i].icon;
                            console.log("5: ", i, date5, temp5, humd5, icon5);
                        }
                    }                
                }
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("unable to connect to GitHub");
    });
}; 


getWeather(city);