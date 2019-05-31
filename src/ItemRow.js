import React from 'react';

class ItemRow extends React.Component {
  render() {
    return (
      <div className="cursor" onClick={() => this.props.handleSelectItem(this.props.item)}>
        {this.props.item.specIcon && <div className="icon medium inline" style={{backgroundImage: "url(" + this.props.item.specIcon + ")"}}></div>}
        {this.props.item.craftIcon && <div className="icon medium inline qe3" style={{backgroundImage: "url(https://classicdb.ch/images/icons/medium/trade_" + this.props.item.craftIcon + ".jpg)"}}></div>}
        <div
          className={this.props.selectedItem === this.props.item.itemId ? "icon medium inline selected" : (this.props.item.stage1 ? "icon medium inline" : "icon medium inline unavailable")}
          style={{backgroundImage: "url(https://classicdb.ch/images/icons/medium/" + this.props.item.icon + ".jpg)"}}>
        </div>
        <div className="inline" style={{verticalAlign: "top"}}>
          <div className={"q"+ this.props.item.quality}>{this.props.item.itemName}</div>
          <div>{this.props.item.dropRate}</div>
        </div>
      </div>
    );
  }
}

export default ItemRow;
