import React from 'react';
import WowClass from './WowClass.js';

class WowClasses extends React.Component {
  render() {
    const classes = (
      this.props.classes.map(c => (
        <WowClass key={c.id} wowClass={c} handleSelectClass={this.props.handleSelectClass} selectedClass={this.props.selectedClass} />
    )));

    return (
     <div>{ classes }</div>
    );
  }
}

export default WowClasses;
