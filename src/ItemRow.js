import React from 'react';

class ItemRow extends React.Component {
  render() {
    return (
      <div>
        <div className="icon medium inline" style={{backgroundImage: "url(" + this.props.item.specIcon + ")"}}></div>
        <div className="icon medium inline qe3" style={{backgroundImage: "url(https://classicdb.ch/images/icons/medium/" + this.props.item.icon + ".jpg)"}}></div>
        <div className="inline" style={{verticalAlign: "top"}}>
          <div className={"q"+ this.props.item.quality}>{this.props.item.itemName}</div>
          <div>{this.props.item.dropRate}</div>
        </div>
      </div>
    );
  }
}

export default ItemRow;
