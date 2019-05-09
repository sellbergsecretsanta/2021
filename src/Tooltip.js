import React, { Component } from 'react';
import ItemTooltip from './ItemTooltip';
import DropTooltip from './DropTooltip';
import Loading from './Loading';

class Tooltip extends Component {

  render() {
    return (
      <div className="tooltipWrapper">
        <ItemTooltip tooltip={this.props.tooltip} />
        { this.props.info ? <DropTooltip info={this.props.info} /> : null }
        { this.props.isLoading ? <Loading /> : null }
      </div>
    );
  }
}

export default Tooltip;
