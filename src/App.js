import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import WeatherDisplay from './components/WeatherDisplay';
import HourlyWeather from './components/HourlyWeather'
import './css/App.css';
import weatherIcon from './img/weather-icon.png';
import logo from './logo.svg';

class App extends React.Component {
  state = {city: 0, daysWeather: [], loading: false, error: false};

  changeCity = async ({ target }) => {

    this.setState({
      city: Number(target.value),
      error: false
    });

    if (Number(target.value)) {
      this.setState({
        loading: true
      });
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${target.value}&appid=838a7cdcd7acfe2dc628dff774acf9d7`)  
      .then( (res) => { return res.json() })
      .then( (data) => {
        var tempWeather = []
        //loop to get just one weather of each day
        for (let i = 0; i < data.list.length; i=i+8) {
          // give formate to date to handle it better
          data.list[i].format_dt_txt = new Date(data.list[i].dt_txt);
          tempWeather.push(data.list[i]);
        }
        this.setState({
          daysWeather: tempWeather,
          loading: false
        });

      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: true
        });
      });
    }

  }

  renderContent = () => {

    if (this.state.loading) {
      return <div className="col-12 text-center">
        <h3> loading... </h3>
      </div>
    } else {
      if (this.state.city && !this.state.error) {
        return this.state.daysWeather.map((dayWeather) => {
          return <WeatherDisplay weatherData={dayWeather} city={this.state.city} key={dayWeather.dt}/>
        });
      } else if (!this.state.error){
        return (
          <div className="col-12 text-center">
            <h2>
              Please select a city to check the weather!
            </h2>
            <img src={weatherIcon} alt=""></img>
          </div>
        );
      } else {
        return <div className="col-12 text-center">
            <h2>
              ups, something went wrong, please try again.
            </h2>
            <img src={weatherIcon} alt=""></img>
        </div>
      }
    }

}
  
  render () {
    return (
      <Router>
        <div className="container">
          <h1 className="app-title">
            <img src={logo} className="App-logo" alt="logo" />
            <br/>
            Rafa's Weather App!
          </h1>
          <div className="row d-flex justify-content-center">
            <Route path="/" exact>
              <div className="col-12 d-flex justify-content-center mb-3">
                <select className="custom-select" value={this.state.city} onChange={this.changeCity}>
                  <option value="0">Choose a City...</option>
                  <option value="3621841">San José, Costa Rica</option>
                  <option value="2643743">London, England</option>
                  <option value="4140963">Washington, United States</option>
                  <option value="3117735">Madrid, Spain</option>
                  <option value="2968815">París, France</option>
                </select>
              </div>
              {this.renderContent()}
            </Route>
            <Route path="/hourly-weather/:date/:city" component={HourlyWeather}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
