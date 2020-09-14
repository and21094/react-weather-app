import React from 'react';

import '../css/WeatherDisplay.css';
import Sunny from '../img/weather/sunny.png';
import Cloudy from '../img/weather/cloudy.png';
import Rain from '../img/weather/rain.png';
import Snow from '../img/weather/snow.png';
import weatherIcon from '../img/weather-icon.png';

class HourlyWeather extends React.Component {

    state = {hourWeather: []}

    async componentDidMount () {
        //used the same api endpoint because the hourly one was for pro members only
        await fetch(`https://api.openweathermap.org/data/2.5/forecast/?id=${this.props.match.params.city}&appid=838a7cdcd7acfe2dc628dff774acf9d7`)  
        .then( (res) => { return res.json() })
        .then( (data) => {
            var tempWeather = [];
            data.list.forEach(weather => {
                if (weather.dt_txt.startsWith(this.props.match.params.date)) {
                    tempWeather.push(weather);
                }
            });

            this.setState({
                hourWeather: tempWeather
            })

        })
        .catch((err) => {
            console.log(err);
        });
    }

    renderWeatherImg = (weather) => {
        switch (weather) {
            case 'Clear':
                return <img src={Sunny} alt="sunny weather"></img>
            case 'Clouds':
                return <img src={Cloudy} alt="cloudy weather"></img>
            case 'Rain':
                return <img src={Rain} alt="rainy weather"></img>
            case 'Snow':
                return <img src={Snow} alt="snowy weather"></img>
            default:
                return (
                    <div>
                        <p><strong>{weather}</strong> <br/>
                            ups whe don't have an image for this weather <br/>
                            this one is just to fill space :)
                        </p>
                        <img src={weatherIcon} style={{width: '49.4%'}} alt="snowy weather"></img>
                    </div>
                ); 
        }
    }

    renderDayInfo = (dayWeather) => {
        var day = new Date(dayWeather.dt_txt).toLocaleString('en-us', {weekday:'long'});
        var hour = dayWeather.dt_txt.split(' ')[1];
        return (
            <div className="col-12 day-container">
                <span>{day} - {hour}</span>
            </div>
        );
    }

    render () {
        return this.state.hourWeather.map((dayWeather) => {
            return (
                <div className="col-xl-2 col-lg-3 col-12 col-md-6 col-sm-6 col-xs-12 m-xl-1 m-lg-1 mt-1 card weather-container" key={dayWeather.dt}>
                    <div className="row">
                        {this.renderDayInfo(dayWeather)}
                        <div className="col-12 weather">
                            {this.renderWeatherImg(dayWeather.weather[0].main)}
                        </div>
                        <div className="col-12 temp-container">
                            <span><i className="fas fa-temperature-high"></i> {dayWeather.main.temp_max} - <i className="fas fa-temperature-low"></i> {dayWeather.main.temp_min} </span>
                        </div>
                    </div>
                </div>
            );
        });
    };

}

export default HourlyWeather;