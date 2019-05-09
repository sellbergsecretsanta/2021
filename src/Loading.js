import React, { Component } from 'react';

class Loading extends Component {

  render() {
    return (
    <div className="tooltip">
      <table className="shrink">
      <tbody>
        <tr>
          <td className="info">
            Loading...
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

export default Loading;
