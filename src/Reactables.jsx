import React from 'react'
import ReactDOM from 'react-dom'
import Editor from './components/Editor.js'
import classNames from 'classnames/bind';
import styles from './css/styles.css'

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
      var tHead = React.Children.only(this.props.children[0]);
      var clonnedTHead = React.cloneElement(tHead, {
        className: "input-element test"
      });
      var tFoot = React.Children.only(this.props.children[1]);
      var clonedTFoot = React.cloneElement(tFoot, {
        className: "some_class"
      });    
      let tableClass = classNames({
        'gt_container': true,
        'gt_body': true,
        'gt_page': false
      });
      return (
        <div>
          <table>
            {clonnedTHead}
            <tbody className={tableClass}>
              <tr>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
                <td>vsdfvd</td>
              </tr>
            </tbody>
            {clonedTFoot}
          </table>
        </div>
      )
  }
}

export default Reactables
