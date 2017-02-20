import React from 'react'
var EditorConstants = require('EditorConstants');

class Reactables extends React.Component {

  constructor(props)
  {
    super(props);
    var tableElements = this.props.children;
    props = {
      tableElements: tableElements
    };
  }

  init() {

  }

  render() {
    // console.log('hi');
    // console.log(this.props.tableElements);
    this.props.children.map((val, index) => {
      console.log(val);
    });
    // console.log(this.props.children);
      return (
        <div>vsdf</div>
      )

  }

}

export default Reactables
