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
      <div style={{paddingLeft: "20px"}}>
        <h4>{this.props.boss.name}</h4>
        { boss }
      </div>
    );
  }
}

export default Boss;
