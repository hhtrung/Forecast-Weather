import React from "react";
import "./App.css";
import axios from "axios";
import History from "./components/History";
import Card from "./components/Card";
import Suggestion from "./components/Suggestion";

interface Props {}

interface State {
  valueInput: string;
  history: any[];
  cities: any[];
  weathers: any[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      valueInput: "",
      history: [],
      cities: [],
      weathers: []
    };
    // this.inputElement = React.createRef();
  }

  public geoSuccess = (position: any) => {
    const lat = position.coords.latitude.toFixed(2);
    const long = position.coords.longitude.toFixed(2);
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=79e5a60cd7630f97308d4feaa26cf75d`,
      data: null
    }).then(res => {
      this.setState({
        weathers: [res.data, ...this.state.weathers]
      });
    });
  };

  public geoError = () => {
    console.log("you was blocked your location");
  };

  componentDidMount() {
    // focus input
    // this.inputElement.current.focus();

    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);

    // history
    const history = localStorage.getItem("history");
    if (history) {
      let historyParsed = JSON.parse(history);
      this.setState({
        history: historyParsed
      });
    }
  }

  public onClickHistoryTag = (index: number) => {
    let weathers = this.state.history[index].info;
    if (typeof weathers === "object") {
      this.setState({
        weathers: [weathers]
      });
    }
  };

  public onClickSuggest = (city: string) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=79e5a60cd7630f97308d4feaa26cf75d`,
      data: null
    })
      .then(res => {
        let city = res.data;
        this.setState({
          weathers: [...this.state.weathers, city]
        });
      })
      .catch(err => console.log(err));
    this.setState({
      valueInput: ""
    });
  };

  public onChangeInput = (event: any) => {
    this.setState({
      valueInput: event.target.value
    });
  };

  public onKeyUp = (event: { keyCode: any; target: any }) => {
    if (event.keyCode === 13) {
      let city = event.target.value.trim();
      let date = new Date().toDateString();
      if (city) {
        axios({
          method: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=79e5a60cd7630f97308d4feaa26cf75d`,
          data: null
        })
          .then(res => {
            let data = res.data;
            this.setState({
              valueInput: "",
              cities: [...this.state.cities, city],
              weathers: [...this.state.weathers, data],
              history: [...this.state.history, { name: city, info: data, date }]
            });
            localStorage.setItem("history", JSON.stringify(this.state.history));
          })
          .catch(err => {
            this.setState({
              valueInput: "",
              history: [
                ...this.state.history,
                { name: city, info: "wrong name", date }
              ]
            });
            localStorage.setItem("history", JSON.stringify(this.state.history));
          });
      }
    }
  };

  render() {
    let { valueInput, weathers, history } = this.state;
    return (
      <div className="App container">
        <input
          className="row form-control"
          placeholder="the weather of . . ."
          onChange={this.onChangeInput}
          value={valueInput}
          onKeyUp={this.onKeyUp}
          // ref={this.inputElement}
        />
        {valueInput !== "" && (
          <Suggestion
            className="row"
            valueInput={valueInput}
            onClickSuggest={this.onClickSuggest}
          />
        )}

        <div className="body">
          <div className="listCard">
            {weathers.map((city, index) => {
              return (
                <Card
                  key={index}
                  nameCity={city.name}
                  tempC={+(city.main.temp - 273.15).toFixed(0)}
                  des={city.weather[0].description}
                  tempMin={+(city.main.temp_min - 273.15).toFixed(0)}
                  tempMax={+(city.main.temp_max - 273.15).toFixed(0)}
                  humidity={city.main.humidity}
                  wind={city.wind.speed}
                  iconWeather={city.weather[0].main}
                />
              );
            })}
          </div>
          <div className="sidebar">
            <h1>History</h1>
            {history.map((his, index) => {
              return (
                <History
                  his={his.name}
                  key={index}
                  index={index}
                  date={his.date}
                  info={his.info}
                  onClick={() => this.onClickHistoryTag(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
