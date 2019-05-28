import React from "react";
import "./../assets/css/Card.css";
// import "./../assets/picture/wall.jpg";

interface Props {
  nameCity: string;
  tempC: number;
  des: string;
  tempMin: number;
  tempMax: number;
  humidity: number;
  wind: number;
  iconWeather: string;
}
interface State {}

class Card extends React.Component<Props, State> {
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
    if (iconWeather === "Haze") {
      iconWeatherDay = (
        <div className="iconDes">
          <i className="fas fa-smog" />
        </div>
      );
    } else if (iconWeather === "Clouds") {
      iconWeatherDay = (
        <div className="iconDes">
          <i className="fas fa-cloud-sun" />
        </div>
      );
    } else {
      iconWeatherDay = (
        <div className="iconDes">
          <i className="fab fa-mixcloud" />
        </div>
      );
    }
    return (
      <div className="Card">
        <div className="row itemCenter">
          <span className="title">{nameCity}</span>
        </div>
        <div className="row itemCenter iconDes">{iconWeatherDay}</div>
        <div className="row itemCenter des">{des}</div>
        <div className="row itemCenter">
          <span className="temp">
            {tempC}
            <i className="fas fa-temperature-low" />
          </span>
        </div>

        <div className="row footerBody">
          <div className="cardLeft">
            <i className="fas fa-arrow-down arrow" />
            <div className="wrap-content">
              <div>Lowest</div>
              <div>
                <span>{tempMin}</span>
                <i className="fas fa-temperature-low" />
              </div>
            </div>
          </div>
          <div className="cardRight ml-auto">
            <i className="fas fa-arrow-up arrow" />
            <div className="wrap-content">
              <div>Highest</div>
              <div>
                <span>{tempMax}</span>
                <i className="fas fa-temperature-low" />
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="cardLeft">
            <i className="fas fa-tint col-3" />
            <div className="wrap-content">
              <div>Humidity</div>
              <div>{humidity}%</div>
            </div>
          </div>

          <div className="cardRight">
            <i className="fas fa-wind col-3" />
            <div className="wrap-content">
              <div>Wind</div>
              <div>{wind}kph</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Card;
