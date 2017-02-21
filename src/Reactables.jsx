import React from 'react'
import ReactDOM from 'react-dom'

class Reactables extends React.Component {

  constructor(props)
  {
    super(props);
    var tableElements = this.props.children;
    props = {
      tableElements: tableElements
    };
    this.build();
  }

  build()
  {
    fetch(this.props.settings.ajax).then(response => response.json())
    .then((data) => {
      console.log(data);
    });
  }

  componentDidUpdate(prevProps, prevState)
  {
    console.log(prevProps);
  }

  componentWillReceiveProps(nextProps)
  {
    console.log(nextProps);
  }

  render() {
    // console.log(this.props.tableElements);
    // this.props.children.map((val, index) => {
    //   console.log(val);
    // });
    // var newPre = document.createElement('pre');
    // newPre.setAttribute("contentEditable", "true");
    // newPre.innerHTML = "boom";
    // this.props.children[0].parentNode.insertBefore(newPre, this.props.children[1]);
    // console.log(ReactDOM.findDOMNode(this.props.children[0]));
      return (
        <div>
          <table>
            {this.props.children[0]}
            <tbody>
              <tr>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
              </tr>
            </tbody>
            {this.props.children[1]}
          </table>
        </div>
      )
  }
}

export default Reactables
