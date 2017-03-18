import React from 'react'
import {EditorException} from './Exceptions';
import editorStyles from '../css/editor.css'
import classNames from 'classnames/bind';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class Editor extends React.Component {
  constructor(props)
  {
    super(props);
    if (typeof props.editor.fields === EditorConstants.UNDEFINED) {
      throw new EditorException('You should define "fields" option.');
    }
    if (props.editor.fields.length === 0) {
      throw new EditorException('You should define at least one field in "fields" option.');
    }
    this.lang = Lang[props.lang];
    this.state = {
      dataIndices: {},
      popup_title: this.lang.gte_editor_popupheader_create,
      popup_button: this.lang.gte_editor_sendbtn_create
    }
    this.setFields(props);
    this.setDataIndices(props);
  }

  setDataIndices(props)
  {
    let cols = props.columns;
    this.dataIndices = [];
    cols.map((column, index) => {
      this.dataIndices[column.name] = '';
    });
  }

  setFields(props)
  {
    let fields = [];
    if (props.action === EditorConstants.ACTION_CREATE) {
      fields = this.setCreateFields(props.editor.fields);
    } else if (props.action === EditorConstants.ACTION_EDIT) {
      fields = this.setEditFields(props.editor.fields);
    } else if (props.action === EditorConstants.ACTION_DELETE) {
      fields = this.setDeleteFields(props.selectedRows);
    }
    this.fields = fields;
  }

  setCreateFields(editorFields)
  {
    let fields = [];
    editorFields.map((object, index) => {
      fields[index] = this.getFieldByType(index, object);
    });
    return fields;
  }

  setEditFields(editorFields)
  {
    let fields = [];
    editorFields.map((object, index) => {
      fields[index] = this.getFieldByType(index, object);
    });
    return fields;
  }

  setDeleteFields(items)
  {
    let fields = [], lastId = 0;
    this.state.dataIndices = this.props.selectedIds;
    this.props.selectedIds.map((object, index) => {
      fields[index] = <input key={index} type="hidden" data-value={object} name="ids[]" value={object} />;
      lastId = index;
    });
    fields.push(<div key={++lastId} className="gte_msg">Are You sure You wish to delete {items.length} row(s)?</div>);
    return fields;
  }

  onChange(e)
  {
    this.setState({
      dataIndices: Object.assign({}, this.state.dataIndices, {
        [e.target.name]: e.target.value
      })
    })
  }

  getFieldByType(index, object)
  {
    var fieldType = object.type,
            fieldName = object.name,
            fieldLabel = object.label,
            action = this.props.action,
            fieldValue = '';
    // settting attrs
    var attributes = [];
    if (typeof object.attrs !== CommonConstants.UNDEFINED) {
      var fieldOpts = object.attrs;
      for (var opt in fieldOpts) {
        for (var attr in fieldOpts[opt]) {
          attributes[attr] = fieldOpts[opt][attr];
        }
      }
    }

    if (action === EditorConstants.ACTION_EDIT) {
      if (typeof this.state.dataIndices[fieldName] !== CommonConstants.UNDEFINED) {
        fieldValue = this.state.dataIndices[fieldName];
      } else {
        fieldValue = this.props.fieldsEdit[fieldName];
      }
    } else if (action === EditorConstants.ACTION_CREATE && typeof this.state.dataIndices[fieldName] !== CommonConstants.UNDEFINED) {
      fieldValue = this.state.dataIndices[fieldName];
    }

    let i = 0,
    htmlFields = [];
    switch (fieldType) {
      // uncontrolled input element, so we can put value here
      case EditorConstants.TYPE_TEXT:
      case EditorConstants.TYPE_HIDDEN:
      case EditorConstants.TYPE_EMAIL:
      case EditorConstants.TYPE_PASSWORD:
        htmlFields[i] = <div className="gte_editor_fields">
          <label className="gte_label" htmlFor={fieldName}>{(fieldType !== EditorConstants.TYPE_HIDDEN) ? fieldLabel : null}</label>
          <div className={editorStyles.gte_field}>
            <input onChange={this.onChange.bind(this)} {...attributes} id={fieldName} type={fieldType} name={fieldName}
              value={fieldValue} />
          </div>
          <div className="clear"></div></div>;
        break;
      case EditorConstants.TYPE_COLOR:
      case EditorConstants.TYPE_DATE:
      case EditorConstants.TYPE_DATETIME:
      case EditorConstants.TYPE_NUMBER:
      case EditorConstants.TYPE_RANGE:
      case EditorConstants.TYPE_SEARCH:
      case EditorConstants.TYPE_TIME:
      case EditorConstants.TYPE_TEL:
      case EditorConstants.TYPE_URL:
      case EditorConstants.TYPE_MONTH:
      case EditorConstants.TYPE_WEEK:
      case EditorConstants.TYPE_FILE:
        htmlFields[i] = <div className="gte_editor_fields"><label className="gte_label" htmlFor={fieldName}>{(fieldType !== EditorConstants.TYPE_HIDDEN) ? fieldLabel : null}</label><div className={editorStyles.gte_field}><input onChange={this.onChange.bind(this)} {...attributes} id={fieldName} type={fieldType} name={fieldName} /></div><div className="clear"></div></div>;
        break;
      case EditorConstants.TYPE_TEXTAREA:
        htmlFields[i] = <div className="gte_editor_fields">
          <label className="gte_label" htmlFor={fieldName}>{fieldLabel}</label>
          <div className={editorStyles.gte_field}>
            <textarea onChange={this.onChange.bind(this)} {...attributes} id={fieldName} name={fieldName} value={fieldValue}></textarea>
          </div>
          <div className="clear"></div></div>;
        break;
      case EditorConstants.TYPE_SELECT:
        var values = object.values;
        var options = [], val = '';
        for (var k in values) {
          for (var key in values[k]) {
            val = values[k][key].trim();
            options[k] = <option key={key} value={key} data-value={val.toLowerCase()}>{val}</option>;
          }
        }
        htmlFields[i] = <div className="gte_editor_fields">
          <label className="gte_label" htmlFor={fieldName}>{fieldLabel}</label>
          <div className={editorStyles.gte_field}>
            <select value={fieldValue} onChange={this.onChange.bind(this)} {...attributes} id={fieldName} name={fieldName}>{options}</select>
          </div>
          <div className="clear"></div></div>;
        break;
      case EditorConstants.TYPE_CHECKBOX:
      case EditorConstants.TYPE_RADIO:
        var values = object.values;
        var options = [], val = '',
                //@fixme regexp to remove ex: [3] etc
                id = fieldName.replace('[]', '');
        for (var k in values) {
          for (var key in values[k]) {
            val = values[k][key].trim();
            options[k] = <label key={key} className="gte_label_text">
              <input defaultChecked={(val === fieldValue) ? 1 : 0 } onClick={this.onChange.bind(this)} key={key} {...attributes} id={id} type={fieldType} name={fieldName} data-value={val.toLowerCase()} value={key}/>{val}</label>;
          }
        }
        htmlFields[i] = <div className="gte_editor_fields"><label className="gte_label">{fieldLabel}</label><div className={editorStyles.gte_field}>{options}</div><div className="clear"></div></div>;
        break;
    }
    return htmlFields;
  }

  triggerBefore(type)
  {
    const { tableOpts } = this.props;
    // call triggerBefore if it has been set
    tableOpts.buttons.map((obj, idx) => {
      if (obj.extended === type && typeof obj.triggerBefore !== CommonConstants.UNDEFINED) {
          obj.triggerBefore();
      }
    });
  }

  triggerAfter(type)
  {
    const { tableOpts } = this.props;
    // call triggerAfter if it has been set
    tableOpts.buttons.map((obj, idx) => {
      if (obj.extended === type && typeof obj.triggerAfter !== CommonConstants.UNDEFINED) {
          obj.triggerAfter();
      }
    });
  }

  btnClicked(e)
  {
    e.persist(); // this is to avoid null values in this.props.editorUpdate(e, dataResp) call
    const { action, editorUpdate } = this.props;
    let ajaxUrl = this.props.editor.ajax, that = this;
    var dataResp = that.state.dataIndices;
    if (action === EditorConstants.ACTION_CREATE) {
      this.triggerBefore(EditorConstants.EDITOR_CREATE);

      fetch(ajaxUrl, {
      method: EditorConstants.HTTP_METHOD_POST,
      body: JSON.stringify(this.state.dataIndices)
      }).then(response => response.json()).then((data) => {
        dataResp['id'] = data['row']['id'];
        dataResp[CommonConstants.GT_ROW_ID] = data['row']['id'];
        editorUpdate(e, dataResp);
        this.triggerAfter(EditorConstants.EDITOR_CREATE);
      });
    } else if (action === EditorConstants.ACTION_EDIT) {
      this.triggerBefore(EditorConstants.EDITOR_EDIT);
      fetch(ajaxUrl, {
      method: EditorConstants.HTTP_METHOD_PUT,
      body: JSON.stringify(this.state.dataIndices)
      }).then(response => response.json()).then((data) => {
        editorUpdate(e, dataResp);
        this.triggerAfter(EditorConstants.EDITOR_EDIT);
      });
    } else if (action === EditorConstants.ACTION_DELETE) {
      this.triggerBefore(EditorConstants.EDITOR_REMOVE);
      fetch(ajaxUrl, {
        method: EditorConstants.HTTP_METHOD_DELETE,
        body: JSON.stringify(this.props.dataIndices)
      }).then(response => response.json()).then((data) => {
        // call editorUpdate method with passing all user-input values
        editorUpdate(e, dataResp);
        this.triggerAfter(EditorConstants.EDITOR_REMOVE);
      });
    }
  }

  render()
  {
    const {
      hidePopup,
      opacity,
      popupTitle,
      action,
      popupButton
    } = this.props;
    this.setFields(this.props);
    let editorClasses = classNames({
      gte_editor_popup: true,
      display: this.props.active
    }),
    backgroundClasses = classNames({
      gte_popup_background:true,
      display: this.props.active
    });
    return (
      <div>
      <div className={editorClasses} style={{opacity:opacity, transition: "opacity 1s"}}>
        <div className="gte_popup_container">
          <div className="gte_popup_container_wrapper">
            <div className="gte_form_border_box">
              <div className="gte_form_fields">
                <div className="gte_header">
                  <div className="gte_editor_title">{popupTitle}</div>
                </div>
                <div className="gte_form_body">
                  <div className="gte_form_body_content">
                    <form id="gte_form" action="" method="post">
                      <div className="gte_form_content">
                        <div>
                          <input type="hidden" name="action" value={action}/>
                        </div>
                        <div>
                          {this.fields}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="gte_footer">
                  <div className="gte_form_err"></div>
                  <div className="gte_form_buttons">
                    <button
                      id="gte_sent_btn"
                      className="btn"
                      data-action={action}
                      onClick={this.btnClicked.bind(this)}>{popupButton}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={hidePopup} className={backgroundClasses}></div>
      </div>
    )
  }
}

export default Editor
