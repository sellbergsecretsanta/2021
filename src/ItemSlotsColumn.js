import React from 'react';
import ItemSlot from './ItemSlot.js';

class ItemSlotsColumn extends React.Component {
  render() {
    const slots = (
      this.props.slots.map(slot => (
        this.props.items.find(slots => slots.id === slot.id) && (
          <div key={slot.id}>
            <ItemSlot slot={slot} items={this.props.items.find(slots => slots.id === slot.id).items} handleSelectItem={this.props.handleSelectItem} selectedItem={this.props.selectedItem} />
          </div>
        )
    )));

    return (
     <div>{ slots }</div>
    );
  }
}

export default ItemSlotsColumn;
