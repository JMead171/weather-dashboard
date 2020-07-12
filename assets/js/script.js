const apiUrlAddress = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = ",US&appid=93da93c3fcfd7a2c52246c945a8f72df";
const apiUVlat = "http://api.openweathermap.org/data/2.5/uvi?appid=93da93c3fcfd7a2c52246c945a8f72df&lat=";
const apiUVlon = "&lon=";
const apiIcon = "http://openweathermap.org/img/wn/" 
const apiIcode = ".png";
const api5day = "http://api.openweathermap.org/data/2.5/forecast?lat=";
const api5daylon = "&lon=";
const api5daykey = "&appid=93da93c3fcfd7a2c52246c945a8f72df";

let cityFormEl = document.querySelector("#city-form");
let searchBtnEl = document.querySelector("#history-container");
let cityInputEl = document.querySelector("#cityname");

let cityNameEl = document.querySelector(".cityName");
let tempEl = document.querySelector(".temp");
let humidEl = document.querySelector(".humid");
let windEl = document.querySelector(".wind");
let uvEl = document.querySelector(".UV");

let cityHistoryArr = [];
let update = 0;

// Get current weather
let getWeather = function(city) {
    let apiUrl = apiUrlAddress + city + apiKey;
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {    
                saveSearchHistory(city);
                update = 1;
                getSearchHistory(update);
                update = 0;

                // get current date from fetch api
                let dateToday = data.dt;
                let displayDate = moment.unix(dateToday).format("M/D/YYYY");
             
                // City, date and weather icon
                let icode = data.weather[0].icon;
                let displayCityName = city.toUpperCase();
                cityNameEl.innerHTML = "";
                cityNameEl.innerHTML = displayCityName + " (" + displayDate + ") " + "<img src=./assets/images/" + icode + ".png>";

                // temp
                let fahrtemp = Math.floor((((data.main.temp - 273.15) * 1.8000) + 32));
                tempEl.innerHTML = "Temperature: " + fahrtemp + " &#8457;";
                //humidity
                let humidity = data.main.humidity;
                humidEl.textContent = "Humidity: " + humidity + "%";
                // wind
                let windSpeed = data.wind.speed;
                windEl.textContent = "Wind Speed: " + windSpeed + " MPH";
                // UV index
                let lat = data.coord.lat;
                let lon = data.coord.lon;
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

// Get UV index
let getUVindex = function(lat, lon) {
    let apiUrluv = apiUVlat + lat + apiUVlon + lon;
    fetch(apiUrluv).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {    
                let uvIndex =  data.value;
                if (uvIndex > 8) {
                    uvEl.innerHTML = "UV Index " + "<span class='danger'>" + uvIndex + "</span>";
                } else {
                    if (uvIndex > 5) {
                        uvEl.innerHTML = "UV Index " + "<span class='warning'>" + uvIndex + "</span>";
                    } else {
                        uvEl.innerHTML = "UV Index" + "<span class='normal'>" + uvIndex + "</span>";
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

//Get 5 day forecast
let get5day = function(lat, lon, dateToday) {
    let apiUrl5day = api5day + lat + api5daylon + lon + api5daykey;
    fetch(apiUrl5day).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {    
                let datePlus1 = (dateToday + (60 * 60 * 24));
                let datePlus2 = (datePlus1 + (60 * 60 * 24));
                let datePlus3 = (datePlus2 + (60 * 60 * 24));
                let datePlus4 = (datePlus3 + (60 * 60 * 24));
                let datePlus5 = (datePlus4 + (60 * 60 * 24));
                
                // initialize
                let forecastEl = document.querySelector(".forecast");
                forecastEl.innerHTML = "5-Day Forecast";                           
                
                let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0;
                
                for (let i = 0; i < data.list.length; i++) { 
                    if (d1 === 0) {
                        if (datePlus1 < data.list[i].dt) {
                            d1++
                            let date1 =  data.list[i].dt;
                            let temp1 = Math.floor((((data.list[i].main.temp - 273.15) * 1.8000) + 32));
                            let humd1 =  data.list[i].main.humidity;
                            let icon1 =  data.list[i].weather[0].icon;
                            
                            let day1divEl = document.querySelector('#day1');
                            day1divEl.innerHTML = '';
                            let day1dte = document.createElement('h4');
                            day1divEl.appendChild(day1dte);
                            let displayDate1 = moment.unix(date1).format("M/D/YYYY");
                            day1dte.textContent  = displayDate1;
                
                            let day1imgEl = document.querySelector('#day1');
                            let day1img = document.createElement('img');
                            day1img.setAttribute("src", "./assets/images/" + icon1 + ".png")
                            day1imgEl.appendChild(day1img);

                            let day1tmpEl = document.querySelector('#day1');
                            let day1tmp = document.createElement('p');
                            day1tmpEl.appendChild(day1tmp);
                            day1tmp.innerHTML = "Temperature: " + temp1 + " &#8457;";
                
                            let day1humEl = document.querySelector('#day1');
                            let day1hum = document.createElement('p');
                            day1humEl.appendChild(day1hum);
                            day1hum.textContent  = "Humidity: " + humd1 + "%";
                        }
                    }
                    if (d2 === 0) {
                        if (datePlus2 < data.list[i].dt) {
                            d2++
                            let date2 =  data.list[i].dt;
                            let temp2 = Math.floor((((data.list[i].main.temp - 273.15) * 1.8000) + 32));
                            let humd2 =  data.list[i].main.humidity;
                            let icon2 =  data.list[i].weather[0].icon;

                            let day2divEl = document.querySelector("#day2");
                            day2divEl.innerHTML = '';
                            let day2dte = document.createElement('h4');
                            day2divEl.appendChild(day2dte);
                            let displayDate2 = moment.unix(date2).format("M/D/YYYY");
                            day2dte.textContent  = displayDate2;
                            
                            let day2imgEl = document.querySelector('#day2');
                            let day2img = document.createElement('img');
                            day2img.setAttribute("src", "./assets/images/" + icon2 + ".png")
                            day2imgEl.appendChild(day2img);

                            let day2tmpEl = document.querySelector('#day2');
                            let day2tmp = document.createElement('p');
                            day2tmpEl.appendChild(day2tmp);
                            day2tmp.innerHTML = "Temperature: " + temp2 + " &#8457;";
                            
                            let day2humEl = document.querySelector('#day2');
                            let day2hum = document.createElement('p');
                            day2humEl.appendChild(day2hum);
                            day2hum.textContent  = "Humidity: " + humd2 + "%";
                        }
                    }
                    if (d3 === 0) {
                        if (datePlus3 < data.list[i].dt) {
                            d3++
                            let date3 =  data.list[i].dt;
                            let temp3 = Math.floor((((data.list[i].main.temp - 273.15) * 1.8000) + 32));
                            let humd3 =  data.list[i].main.humidity;
                            let icon3 =  data.list[i].weather[0].icon;
                          
                            let day3divEl = document.querySelector("#day3");
                            day3divEl.innerHTML = '';
                            let day3dte = document.createElement('h4');
                            day3divEl.appendChild(day3dte);
                            let displayDate3 = moment.unix(date3).format("M/D/YYYY");
                            day3dte.textContent  = displayDate3;
                            
                            let day3imgEl = document.querySelector('#day3');
                            let day3img = document.createElement('img');
                            day3img.setAttribute("src", "./assets/images/" + icon3 + ".png")
                            day3imgEl.appendChild(day3img);

                            let day3tmpEl = document.querySelector('#day3');
                            let day3tmp = document.createElement('p');
                            day3tmpEl.appendChild(day3tmp);
                            day3tmp.innerHTML = "Temperature: " + temp3 + " &#8457;";
                            
                            let day3humEl = document.querySelector('#day3');
                            let day3hum = document.createElement('p');
                            day3humEl.appendChild(day3hum);
                            day3hum.textContent  = "Humidity: " + humd3 + "%";
                        }
                    }
                    if (d4 === 0) {
                        if (datePlus4 < data.list[i].dt) {
                            d4++
                            let date4 =  data.list[i].dt;
                            let temp4 = Math.floor((((data.list[i].main.temp - 273.15) * 1.8000) + 32));
                            let humd4 =  data.list[i].main.humidity;
                            let icon4 =  data.list[i].weather[0].icon;

                            let day4divEl = document.querySelector("#day4");
                            day4divEl.innerHTML = '';
                            let day4dte = document.createElement('h4');
                            day4divEl.appendChild(day4dte);
                            let displayDate4 = moment.unix(date4).format("M/D/YYYY");
                            day4dte.textContent  = displayDate4;
                            
                            let day4imgEl = document.querySelector('#day4');
                            let day4img = document.createElement('img');
                            day4img.setAttribute("src", "./assets/images/" + icon4 + ".png")
                            day4imgEl.appendChild(day4img);
            
                            let day4tmpEl = document.querySelector('#day4');
                            let day4tmp = document.createElement('p');
                            day4tmpEl.appendChild(day4tmp);
                            day4tmp.innerHTML = "Temperature: " + temp4 + " &#8457;";
                            
                            let day4humEl = document.querySelector('#day4');
                            let day4hum = document.createElement('p');
                            day4humEl.appendChild(day4hum);
                            day4hum.textContent  = "Humidity: " + humd4 + "%";
                        }
                    }
                    if (d5 === 0) {
                        if (datePlus5 < data.list[i].dt  || i === data.list.length - 1) {
                            d5++
                            let date5 =  data.list[i].dt;
                            let temp5 = Math.floor((((data.list[i].main.temp - 273.15) * 1.8000) + 32));
                            let humd5 =  data.list[i].main.humidity;
                            let icon5 =  data.list[i].weather[0].icon;
                          
                            let day5divEl = document.querySelector("#day5");
                            day5divEl.innerHTML = '';
                            let day5dte = document.createElement('h4');
                            day5divEl.appendChild(day5dte);
                            let displayDate5 = moment.unix(date5).format("M/D/YYYY");
                            day5dte.textContent  = displayDate5;
                            
                            let day5imgEl = document.querySelector('#day5');
                            let day5img = document.createElement('img');
                            day5img.setAttribute("src", "./assets/images/" + icon5 + ".png")
                            day5imgEl.appendChild(day5img);

                            let day5tmpEl = document.querySelector('#day5');
                            let day5tmp = document.createElement('p');
                            day5tmpEl.appendChild(day5tmp);
                            day5tmp.innerHTML = "Temperature: " + temp5 + " &#8457;";
                            
                            let day5humEl = document.querySelector('#day5');
                            let day5hum = document.createElement('p');
                            day5humEl.appendChild(day5hum);
                            day5hum.textContent  = "Humidity: " + humd5 + "%";
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

// Get city name from input
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var city = cityInputEl.value.trim();
    if (city) {
        getWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
};

// Get city name from search history
var formSubmitHistory = function(event) {
    event.preventDefault();

    var city = event.target.innerHTML;
    if (city) {
        cityInputEl.value = "";
        getWeather(city);
    } else {
        alert("Please enter a City");
    }
};

// Load search history
let getSearchHistory = function(update) {
    if ("WDcitySearch" in localStorage) {
        let retrievedData = localStorage.getItem("WDcitySearch");
        cityHistoryArr = JSON.parse(retrievedData);
        if (update === 1) {
            let parent = document.querySelector('#history-container');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        let i =0;
        while (i < cityHistoryArr.length) {
            let loadcity = cityHistoryArr[i]
            let loadcityEl = document.querySelector('#history-container');
            let cityInput = document.createElement('button');
            cityInput.classList.add('btn-hist');
            loadcityEl.appendChild(cityInput);
            cityInput.innerHTML = loadcity;
            i++;
        }
    } else {
        return;
    }
};

// Save search history
let saveSearchHistory = function(city) {
    if ("WDcitySearch" in localStorage) {
        let retrievedData = localStorage.getItem("WDcitySearch");
        cityHistoryArr = JSON.parse(retrievedData);

        let i =0;
        while (i < cityHistoryArr.length) {
            let cityUP = city.toUpperCase();
            let arrUP = cityHistoryArr[i].toUpperCase();
            if (cityUP === arrUP) {
                return;
            } else {
                i++;
            }
        }
           
        if (cityHistoryArr.length <= 4) {
            cityHistoryArr.unshift(city);
            localStorage.setItem("WDcitySearch", JSON.stringify(cityHistoryArr));
        } else {
            cityHistoryArr.unshift(city);
            cityHistoryArr.pop(city);
            localStorage.setItem("WDcitySearch", JSON.stringify(cityHistoryArr));
        }
    } else {
        cityHistoryArr.push(city);
        localStorage.setItem("WDcitySearch", JSON.stringify(cityHistoryArr));
    }
};

getSearchHistory();
cityFormEl.addEventListener("submit", formSubmitHandler); 
searchBtnEl.addEventListener("click", formSubmitHistory);