import React from 'react';
import Boss from './Boss.js';

class Instance extends React.Component {
  render() {
    const instance = (
      this.props.instance.bosses.map(boss => (
        <Boss key={boss.id} boss={boss} />
      ))
    );

    return (
      <li>{this.props.instance.name}
        <ul>
          { instance }
        </ul>
      </li>
    );
  }
}

export default Instance;
