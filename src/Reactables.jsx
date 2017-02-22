import React from 'react'
import ReactDOM from 'react-dom'
import Editor from './components/Editor.js'
import classNames from 'classnames/bind';
import styles from './css/styles.css'
// import addons from "react/addons";
// let {addons: {cloneWithProps}} = addons;

class Reactables extends React.Component {

  constructor(props)
  {
    super(props);
    props = {
      tableElements: this.props.children
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
      // let thead = this.props.children.querySelector('thead').setAttribute('className', 'styles.gt_head');

      var inputReactObject = React.Children.only(this.props.children[0]);
      var clonnedChild = React.cloneElement(inputReactObject, {
        className: "input-element test"
      });
      let tableClass = classNames({
        'gt_container': true,
        'gt_body': true,
        'gt_page': false
      });
      return (
        <div>
          <table>
            {clonnedChild}
            <tbody className={tableClass}>
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
