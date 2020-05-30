/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let appid = '38e5e984b8eabb2cb1cb59d36adb46e9';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode =  document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeatherData(baseURL, zipCode, appid)
    .then(function(data){
        console.log('weather data')
        postData('http://localhost:8000/add', {temperature: data.main.temp, date: newDate, userResponse: userResponse})
    })
    .then(function(data){
        console.log('update ui', data)
        updateUI()
    })
}


const getWeatherData = async(baseURL, zipCode, appid) => {
    const response = await fetch(baseURL + zipCode + '&appid=' + appid)
    try{
        const data = response.json();
        return data;
    }
    catch(error){
        console.log('error', error);
    }
}


const postData = async(url, data) => {
    console.log('POST request')
    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    }
    catch(error){
        console.log("error", error)
    };
};


const updateUI = async() =>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    }
    catch(error){
        console.log('error', error);
    };
};
