import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => _.get(item, column)

  createKey = (item, column) => item._id + column

  render() {
    const { data, columns, keyLabel } = this.props;

    return (
      <tbody>
        {data.map(item => (
          // <tr key={item._id}>
          <tr key={_.get(item, keyLabel)}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
