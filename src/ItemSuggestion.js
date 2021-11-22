import React from 'react';

class ItemSuggestion extends React.Component {
  render() {
    return (
      <div
        className={this.props.selectedItem === this.props.item.itemId ? "icon inline selected" : (this.props.item.stage1 ? "icon inline" : "icon inline unavailable")}
        onClick={() => this.props.handleSelectItem(this.props.item)}
        style={{backgroundImage: "url(https://classicdb.ch/images/icons/large/" + this.props.item.icon + ".jpg)"}}>
      </div>
    );
  }
}

export default ItemSuggestion;
