import React from 'react';
import ItemRow from './ItemRow.js';

class Boss extends React.Component {
  render() {
    const boss = (
      this.props.boss.items.map(item => (
        <ItemRow key={item.itemId} item={item} />
      ))
    );

    return (
      <li>{this.props.boss.name}
        <ul>
          { boss }
        </ul>
      </li>
    );
  }
}

export default Boss;
