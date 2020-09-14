import React from 'react';
import {Link} from 'react-router-dom'

import '../css/WeatherDisplay.css';
import Sunny from '../img/weather/sunny.png';
import Cloudy from '../img/weather/cloudy.png';
import Rain from '../img/weather/rain.png';
import Snow from '../img/weather/snow.png';
import weatherIcon from '../img/weather-icon.png';


class WeatherDisplay extends React.Component {

    state = {day: '', weather: '', maxTemp: 0, minTemp: 0}

    componentDidMount() {
        this.setState({
            day: new Date(this.props.weatherData.format_dt_txt).toLocaleString('en-us', {weekday:'long'}),
            date: this.props.weatherData.dt_txt.split(' ')[0],
            weather: this.props.weatherData.weather[0].main,
            maxTemp: this.props.weatherData.main.temp_max,
            minTemp: this.props.weatherData.main.temp_min
        })
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

    render () {
        return (
            <Link to={`/hourly-weather/${this.state.date}/${this.props.city}`} className="col-xl col-lg col-12 col-md-6 col-sm-6 col-xs-12 m-xl-1 m-lg-1 mt-1 card weather-container">
                <div className="row">
                    <div className="col-12 day-container">
                        <span>{this.state.day}</span>
                    </div>
                    <div className="col-12 weather">
                        {this.renderWeatherImg(this.state.weather)}
                    </div>
                    <div className="col-12 temp-container">
                        <span><i className="fas fa-temperature-high"></i> {this.state.maxTemp} - <i className="fas fa-temperature-low"></i> {this.state.minTemp} </span>
                    </div>
                </div>
            </Link>
        );
    };

}

export default WeatherDisplay;