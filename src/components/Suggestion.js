import React from "react";

import Card from "./Card";
import ItemSuggest from "./ItemSuggest";
import "./../assets/css/SuggestionCard.css";

class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weathers: []
    };
  }

  render() {
    const { history, valueInput } = this.props;
    const { weathers } = this.state;
    let showSuggest = [];
    history.map((item, index) => {
      let result = new RegExp(valueInput).test(item.name);
      if (result) {
        showSuggest.push(item.name);
      }
      return null;
    });

    let uniqueSuggest = showSuggest.filter(function(item, pos) {
      return showSuggest.indexOf(item) === pos;
    });

    let weathersSuggest = weathers.map((city, index) => {
      return (
        <Card
          key={index}
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
    });

    return (
      <div className="suggestion">
        {uniqueSuggest.map((item, index) => {
          if (valueInput !== "") {
            return (
              <ItemSuggest
                name={item}
                key={index}
                index={index}
                onClick={()=>this.props.handlerClick(uniqueSuggest[index])}
              />
            );
          }
          return null;
        })}
        {weathersSuggest}
      </div>
    );
  }
}

export default Suggestion;
