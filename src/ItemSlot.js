import React from 'react';
import ItemSuggestion from './ItemSuggestion.js';

class ItemSlot extends React.Component {
  render() {
    return (
    <div className="row">
      <div
        className="icon inline"
        style={{backgroundImage: "url(" + this.props.slot.img + ")"}}>
      </div>
      {
        this.props.items.map((item) => (
          <ItemSuggestion key={item.id} item={item} selectedItem={this.props.selectedItem} handleSelectItem={this.props.handleSelectItem} />
        ))
      }
    </div>
    );
  }
}

export default ItemSlot;
