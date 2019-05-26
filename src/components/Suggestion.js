import React from "react";
import ItemSuggest from "./ItemSuggest";
import "./../assets/css/SuggestionCard.css";
import axios from "axios";
class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCityMatched: []
    };
  }

  componentDidUpdate(prevProps) {
    let city = this.props.valueInput;
    if (prevProps.valueInput !== this.props.valueInput) {
      axios({
        method: "GET",
        url: `https://api.teleport.org/api/cities/?search=${city}&limit=005`,
        data: null
      })
        .then(res => {
          const listCityMatched = res.data._embedded["city:search-results"];
          this.setState({
            listCityMatched
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { listCityMatched } = this.state;
    return (
      <div className="suggestion">
        {listCityMatched.map((itemCityMatched, index) => {
          let name = itemCityMatched.matching_full_name;
          return (
            <ItemSuggest
              key={index}
              name={name}
              onClick={() => this.props.onClickSuggest(name)}
            />
          );
        })}
      </div>
    );
  }
}

export default Suggestion;
