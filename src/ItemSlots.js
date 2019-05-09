import React from 'react';
import ItemSlotsColumn from './ItemSlotsColumn.js';

class ItemSlots extends React.Component {
  render() {
    var slotsLeft = [];
    var slotsRight = [];

    this.props.slots.map(slot => (
      slot.id < 9 ? slotsLeft.push(slot) : slotsRight.push(slot)
    ));

    return (
     <div className="flexBoxInner">
       <ItemSlotsColumn slots={slotsLeft} items={this.props.items} selectedItem={this.props.selectedItem} handleSelectItem={this.props.handleSelectItem} />
       <div className="separator"></div>
       <ItemSlotsColumn slots={slotsRight} items={this.props.items} selectedItem={this.props.selectedItem} handleSelectItem={this.props.handleSelectItem} />
     </div>
    );
  }
}

export default ItemSlots;
