import React from "react";

interface Props{
  key: number,
  name: string,
  onClick: any
}
interface State{}

class ItemSuggest extends React.Component<Props,State> {
  render() {
    return (
      <div {...this.props} className="row">
        {this.props.name}
      </div>
    );
  }
}

export default ItemSuggest;
