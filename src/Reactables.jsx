import React from 'react'

class Reactables extends React.Component {

  constructor()
  {
    super();
    this.state = {
      editor: ''
    };
  }

  init() {

  }

  render() {
    // console.log('hi');
    // console.log(this.props.settings);
    console.log(this.props.children);
      return (
        <div>vsdf</div>
      )

  }

}

Reactables.defaultProps = {
  editor:null
}

export default Reactables
