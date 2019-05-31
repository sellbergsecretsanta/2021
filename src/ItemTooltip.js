import React, { Component } from 'react';

class ItemTooltip extends Component {
  render() {
    return (
      <div className="tooltip sticky" dangerouslySetInnerHTML={{ __html: this.props.tooltip }}></div>
    );
  }
}

export default ItemTooltip;
