import React from 'react'
import ReactDOM from 'react-dom'
import Editor from './components/Editor.js'
import Row from './components/Row.js'
import Column from './components/Column.js'
import classNames from 'classnames/bind';
import styles from './css/styles.css'
var CommonConstants = require('./components/CommonConstants');

export const Header = (props) => <th>{props.children}</th>;

class Reactables extends React.Component {

  constructor(props)
  {
    super(props);
    // props = {
    // };
    this.state = {
      dataRows:null
    }
    this.build();
  }

  build()
  {
    fetch(this.props.settings.ajax).then(response => response.json())
    .then((data) => {
      // console.log(data['rows']);
      if(data['rows'] !== CommonConstants.UNDEFINED) {
        let rows = [];
        data['rows'].map((object, objectIndex) => {
            let cols = [];
            this.props.settings.columns.map((column, index) => {
              console.log(column);
              if(object[column['data']] !== CommonConstants.UNDEFINED)
              {
                cols.push(<Column>{object[column['data']]}</Column>);
              }
            });
            console.log(object);
            rows.push(<Row key={objectIndex} count={objectIndex}>{cols}</Row>);
        });
        this.setState({
          dataRows:rows
        });
      }
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
        <div className="gt_container">
          <div className="gt_head_tools">

          </div>
          <table>
            <thead>
              <tr>
                {this.props.children}
              </tr>
            </thead>
            <tbody className="gt_body">
                {this.state.dataRows}
            </tbody>
            <tfoot>
              <tr>
                {this.props.children}
              </tr>
            </tfoot>
          </table>
          <div className="gt_pagination">
          </div>
          <div className="gt_foot_tools">

          </div>
        </div>
      )
  }
}

Reactables.propTypes = {
  editor: React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
}

export default Reactables
