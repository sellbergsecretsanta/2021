import React from 'react';
import WowSpec from './WowSpec.js';

class WowSpecs extends React.Component {
  render() {
    const specs = (
      this.props.specs.map(s => (
        <WowSpec key={s.id} spec={s} handleSelectSpec={this.props.handleSelectSpec} selectedSpec={this.props.selectedSpec} />
    )));

    return (
     <div className="menu">{ specs }</div>
    );
  }
}

export default WowSpecs;
