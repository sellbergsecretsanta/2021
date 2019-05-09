import React, { Component } from 'react';

class DropTooltip extends Component {

  render() {
    console.log("info: ", this.props.info);
    return (
      <div className="tooltip">
        <table className="shrink">
        <tbody>
          <tr>
            <td className="info">
              { this.props.info.location ? this.props.info.location : null }
              { this.props.info.instance ? this.props.info.instance + ' - ' + this.props.info.boss : null }
              <br />
              { this.props.info.dropRate ? this.props.info.dropRate : null }
            </td>
            <th style={{backgroundPosition: 'right top'}}></th>
          </tr>
          <tr>
            <th style={{backgroundPosition: 'left bottom'}}></th>
            <th style={{backgroundPosition: 'right bottom'}}></th>
          </tr>
        </tbody>
        </table>
      </div>
    );
  }
}

export default DropTooltip;
