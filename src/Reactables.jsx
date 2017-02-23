import React from 'react'
import ReactDOM from 'react-dom'
import Editor from './components/Editor.js'
import Row from './components/Row.js'
import Column from './components/Column.js'
import classNames from 'classnames/bind';
import styles from './css/styles.css'

export const Header = (props) => <th>{props.children}</th>;

class Reactables extends React.Component {

  constructor(props)
  {
    super(props);
    props = {
    };

    this.build();
  }

  build()
  {
    fetch(this.props.settings.ajax).then(response => response.json())
    .then((data) => {
      // console.log(data['rows']);
      data['rows'].map((object, objectIndex) => {
        this.props.settings.columns.map((column, index) => {
          console.log(column);
        });
        console.log(object);
      });
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
      // var tHead = React.Children.only(this.props.children[0]);
      // var clonnedTHead = React.cloneElement(tHead, {
      //   className: "input-element test"
      // });
      // var tFoot = React.Children.only(this.props.children[1]);
      // var clonedTFoot = React.cloneElement(tFoot, {
      //   className: "some_class"
      // });
      let tableClass = classNames({
        'gt_container': true,
        'gt_body': true,
        'gt_page': false
      });
      return (
        <div>
          <table>
            <thead>
              <tr>
                {this.props.children}
              </tr>
            </thead>
            <tbody className={tableClass}>
              <Row>
                {}<Column />
              </Row>
            </tbody>
            <tfoot>
              <tr>
                {this.props.children}
              </tr>
            </tfoot>
          </table>
        </div>
      )
  }
}

Reactables.propTypes = {
  editor: React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
}

export default Reactables
