import React from "react";

class ItemSuggest extends React.Component {
  render() {
    return (
      <div {...this.props} className="row">
        {this.props.name}
      </div>
    );
  }
}

export default ItemSuggest;
