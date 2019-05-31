import React from 'react';
import Instance from './Instance.js';

class Instances extends React.Component {
  render() {
    const instances = (
      this.props.instances.map(instance => (
        <Instance key={instance.id} instance={instance} selectedItem={this.props.selectedItem} handleSelectItem={this.props.handleSelectItem} />
    )));

    return (
      <div>
        { instances }
      </div>
    );
  }
}

export default Instances;
