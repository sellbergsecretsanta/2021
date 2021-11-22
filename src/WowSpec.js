import React from 'react';

class WowSpec extends React.Component {
  render() {
    return (
      <div
        className={this.props.selectedSpec === this.props.spec.id ? "icon medium inline selected" : "icon medium inline"}
        onClick={() => this.props.handleSelectSpec(this.props.spec)}
        style={{backgroundImage: "url(" + this.props.spec.img + ")"}}>
      </div>
    );
  }
}

export default WowSpec;
