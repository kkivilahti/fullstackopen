import axios from 'axios';

const key = import.meta.env.VITE_API_KEY;

const getWeather = (city) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`);
    return request.then(response => response.data);
};

export default { getWeather };

// note! if you cloned the repo, you need your own api key for this to work