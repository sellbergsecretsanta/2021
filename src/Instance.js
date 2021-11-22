import React from 'react';
import Boss from './Boss.js';

class Instance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleClick(bool) {
    this.setState({
      visible: !bool
    });
  }

  render() {

    const instance = (
      this.props.instance.bosses.map(boss => (
        <Boss key={boss.id} boss={boss} selectedItem={this.props.selectedItem} handleSelectItem={this.props.handleSelectItem} />
      ))
    );

    return (
      this.props.instance.nrOfDrops > 0 && (
        <div>
          <h3 className="cursor" onClick={() => this.handleClick(this.state.visible)}>
            {this.props.instance.name}
            <div className="icon small inline" style={{backgroundImage: "url(https://classicdb.ch/images/icons/small/inv_misc_bag_10.jpg)"}}></div>
            {this.props.instance.nrOfDrops}
          </h3>
          {this.state.visible && instance }
        </div>
      )
    );
  }
}

export default Instance;
