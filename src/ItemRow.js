import React from 'react';

class ItemRow extends React.Component {
  render() {
    return (
      <li>
        <div className="icon small inline" style={{backgroundImage: "url(" + this.props.item.specIcon + ")"}}></div>
        {this.props.item.specIcon2 && <div className="icon small inline" style={{backgroundImage: "url(" + this.props.item.specIcon2 + ")"}}></div>}
        <div className="icon small inline" style={{backgroundImage: "url(https://classicdb.ch/images/icons/medium/" + this.props.item.icon + ".jpg)"}}></div>
        <div className="inline" style={{verticalAlign: "top"}}>
          <div className={"q"+ this.props.item.quality}>{this.props.item.itemName}</div>
          <div>{this.props.item.dropRate}</div>
        </div>
      </li>
    );
  }
}

export default ItemRow;
