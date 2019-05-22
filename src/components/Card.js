import React from "react";
import "./../assets/css/Card.css";
import "./../assets/picture/wall.jpg";

class Card extends React.Component {
  render() {
    let {
      nameCity,
      tempC,
      des,
      tempMin,
      tempMax,
      humidity,
      wind,
      iconWeather
    } = this.props;
    let iconWeatherDay;
    if(iconWeather === "Haze"){
      iconWeatherDay = <div className="iconDes"><i className="fas fa-smog" /></div>
    }else if(iconWeather === "Clouds"){
      iconWeatherDay = <div className="iconDes"><i className="fas fa-cloud-sun" /></div>
    }else{
      iconWeatherDay = <div className="iconDes"><i className="fab fa-mixcloud"></i></div>
    }
    return (
      <div className="Card">
        <div className="nameCity">{nameCity}</div>
          <div>{iconWeatherDay}</div>
          <div>{des}</div>
        <div className="tempC">
          {tempC}<i className="fas fa-temperature-low" />
        </div> 

        <div className="footer-body">
          <div className="lowest">
            <div className="icon"><i className="fas fa-arrow-down"></i></div>
            <div className="lowest-sidebar">
              <div>Lowest</div>
              <div className="tempMaxMin">{tempMin} <i className="fas fa-temperature-low" /></div>
            </div>
          </div>
          <div className="highest">
            <div className="icon"><i className="fas fa-arrow-up"></i></div>
            <div className="highest-sidebar">
              <div>Highest</div>
              <div className="tempMaxMin">{tempMax} <i className="fas fa-temperature-low" /></div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="humidity">
            <div className="icon"><i className="fas fa-tint"></i></div>
            <div className="lowest-sidebar">
              <div>Humidity</div>
              <div>{humidity} %</div>
            </div>
          </div>

          <div className="wind">
            <div className="icon"><i className="fas fa-wind"></i></div>
            <div className="lowest-sidebar">
              <div>Wind</div>
              <div>{wind} kph</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
