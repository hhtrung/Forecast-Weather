import React from "react";

class ItemSuggest extends React.Component {
  render() {
    let {name} = this.props;
    return (
      <div {...this.props} className="row">
        {name}
      </div>
    );
  }
}

export default ItemSuggest;
