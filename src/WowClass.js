import React from 'react';

class WowClass extends React.Component {
  render() {
    return (
      <div
        className={this.props.selectedClass === this.props.wowClass.id ? "icon inline selected" : "icon inline"}
        onClick={() => this.props.handleSelectClass(this.props.wowClass)}
        style={{backgroundImage: "url(" + this.props.wowClass.img + ")"}}>
      </div>
    );
  }
}

export default WowClass;
