import React from "react";
import "./App.css";
import axios from "axios";
import History from "./components/History";
import Card from "./components/Card";
import Suggestion from "./components/Suggestion";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: "",
      history: [],
      cities: [],
      weathers: []
    };
  }

  componentDidMount() {
    let history = JSON.parse(localStorage.getItem("history"));
    if (history) {
      return this.setState({
        history,
        valueInput: ""
      });
    }
    return this.setState({ history: [], valueInput: "" });
  }

  onClickHistoryTag = index => {
    let weathers = this.state.history[index].info;
    if (typeof weathers === "object") {
      this.setState({
        weathers: [weathers]
      });
    }
  };

  onClickSuggest = cityBefore => {
    console.log("city: ", cityBefore);
    let cityAfter = cityBefore.replace(/\s/g, "");
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityAfter}&APPID=79e5a60cd7630f97308d4feaa26cf75d`,
      data: null
    })
      .then(res => {
        let city = res.data;
        this.setState({
          weathers: [...this.state.weathers, city]
        });
        return (
          <Card
            change="change"
            nameCity={city.name}
            tempC={(city.main.temp - 293.15).toFixed(0)}
            des={city.weather[0].description}
            tempMin={(city.main.temp_min - 293.15).toFixed(0)}
            tempMax={(city.main.temp_max - 293.15).toFixed(0)}
            humidity={city.main.humidity}
            wind={city.wind.speed}
            iconWeather={city.weather[0].main}
          />
        );
      })
      .catch(err => console.log(err));
  };

  onChangeInput = event => {
    this.setState({
      valueInput: event.target.value
    });
  };

  onKeyUp = event => {
    if (event.keyCode === 13) {
      let cityBefore = event.target.value.trim();
      let city = cityBefore.replace(/\s/g, "");
      if (city) {
        axios({
          method: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=79e5a60cd7630f97308d4feaa26cf75d`,
          data: null
        })
          .then(res => {
            let data = res.data;
            let date = new Date().toDateString();
            this.setState({
              valueInput: "",
              cities: [...this.state.cities, city],
              weathers: [...this.state.weathers, data],
              history: [...this.state.history, { name: cityBefore, info: data, date: date }]
            });
            localStorage.setItem("history", JSON.stringify(this.state.history));
          })
          .catch(err => {
            this.setState({
              valueInput: "",
              history: [
                ...this.state.history,
                { name: cityBefore, info: "wrong name" }
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
      <div className="App">
        <div className="content">
          <input
            className="row form-control"
            placeholder="the weather of . . ."
            onChange={this.onChangeInput}
            value={valueInput}
            onKeyUp={this.onKeyUp}
          />
          <Suggestion
            history={history}
            valueInput={valueInput}
            handlerClick={this.onClickSuggest}
          />
          <div className="listCard">
            {weathers.map((city, index) => {
              return (
                <Card
                  key={index}
                  nameCity={city.name}
                  tempC={(city.main.temp - 273.15).toFixed(0)}
                  des={city.weather[0].description}
                  tempMin={(city.main.temp_min - 273.15).toFixed(0)}
                  tempMax={(city.main.temp_max - 273.15).toFixed(0)}
                  humidity={city.main.humidity}
                  wind={city.wind.speed}
                  iconWeather={city.weather[0].main}
                />
              );
            })}
          </div>
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
                onClick={() => this.onClickHistoryTag(index)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
