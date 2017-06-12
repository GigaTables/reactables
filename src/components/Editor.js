import React, { Component, PropTypes } from 'react';
import { EditorException } from './Exceptions';
import editorStyles from '../css/editor.css';
import classNames from 'classnames/bind';
import superagent from 'superagent';

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class Editor extends Component {
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
    cols.forEach((column, index) => {
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
    editorFields.forEach((object, index) => {
      fields[index] = this.getFieldByType(index, object);
    });
    return fields;
  }

  setEditFields(editorFields)
  {
    let fields = [];
    editorFields.forEach((object, index) => {
      fields[index] = this.getFieldByType(index, object);
    });
    return fields;
  }

  setDeleteFields(items)
  {
    let fields = [], lastId = 0;
    this.state.dataIndices = this.props.selectedIds;
    this.props.selectedIds.forEach((object, index) => {
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

  fileUpload()
  {
    if (this.filesInput.files !== CommonConstants.UNDEFINED) {
      const { ajaxFiles } = this.props.editor;
      let formData = new FormData();
      const files = this.filesInput.files;
      for (var key in files) {
        // check if this is a file:
        if (files.hasOwnProperty(key) && files[key] instanceof File) {
            formData.append(key, files[key]);
        }
      }

      superagent.post(ajaxFiles)
      .send(formData)
      .end((err, response) => {
        if(err) {
            console.log('Error has accured while uploading files: ');
            console.log(err);
        } else if(response.ok) {
            //this was successful, handle it here
        }
      });
    }
  }

  getFieldByType(index, object)
  {
    const { dataIndices } = this.state;
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
      if (typeof dataIndices[fieldName] !== CommonConstants.UNDEFINED) {
        fieldValue = dataIndices[fieldName];
      } else {
        fieldValue = this.props.fieldsEdit[fieldName];
      }
    } else if (action === EditorConstants.ACTION_CREATE && typeof dataIndices[fieldName] !== CommonConstants.UNDEFINED) {
      fieldValue = dataIndices[fieldName];
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
        htmlFields[i] = <div className="gte_editor_fields"><label className="gte_label" htmlFor={fieldName}>{fieldLabel}</label><div className={editorStyles.gte_field}><input onChange={this.onChange.bind(this)} {...attributes} id={fieldName} type={fieldType} name={fieldName} /></div><div className="clear"></div></div>;
        break;
      case EditorConstants.TYPE_FILE:
        htmlFields[i] = <div className="gte_editor_fields">
          <label className="gte_label" htmlFor={fieldName}>{fieldLabel}</label>
            <div className={editorStyles.gte_field}>
              <input ref={(input) => { this.filesInput = input; }} {...attributes} id={fieldName} type={fieldType} name={fieldName} />
            </div>
            <div className="clear"></div>
          </div>;
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
              <input defaultChecked={(val === fieldValue) ? 1 : 0 } onClick={this.onChange.bind(this)} {...attributes} id={id} type={fieldType} name={fieldName} data-value={val.toLowerCase()} value={key}/>{val}</label>;
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
    const { action, editorUpdate, selectedIds } = this.props;
    let ajaxUrl = this.props.editor.ajax, that = this;
    var dataResp = that.state.dataIndices;
    if (action === EditorConstants.ACTION_CREATE) {
      this.triggerBefore(EditorConstants.EDITOR_CREATE);
      this.fileUpload();
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
      this.fileUpload();
      // fill-in id
      let payload = Object.assign({}, this.state.dataIndices, {
          ['id']: selectedIds[0]
      });
      fetch(ajaxUrl, {
      method: EditorConstants.HTTP_METHOD_PUT,
      body: JSON.stringify(payload)
      }).then(response => response.json()).then((data) => {
        editorUpdate(e, dataResp);
        this.triggerAfter(EditorConstants.EDITOR_EDIT);
      });
    } else if (action === EditorConstants.ACTION_DELETE) {
      this.triggerBefore(EditorConstants.EDITOR_REMOVE);
      fetch(ajaxUrl, {
        method: EditorConstants.HTTP_METHOD_DELETE,
        body: JSON.stringify(this.props.dataIndices) // prop ids are passed from Reactables
      }).then(response => response.json()).then((data) => {
        // call editorUpdate method with passing all user-input values
        editorUpdate(e, dataResp);
        this.triggerAfter(EditorConstants.EDITOR_REMOVE);
      });
    }
  }

  stopPropagation(e)
  {
    e.stopPropagation();
  }

  btnClickedEnter(e)
  {
    if(e.keyCode === CommonConstants.ENTER_KEY) {
      document.getElementById('gte_sent_btn').click();
    }
  }

  render()
  {
    const {
      hidePopup,
      opacity,
      popupTitle,
      action,
      popupButton,
      active,
    } = this.props;
    this.setFields(this.props);
    let editorClasses = classNames({
      gte_editor_popup: true,
      fade_in: active,
      fade_out: !active
    }),
    backgroundClasses = classNames({
      gte_popup_background:true,
      fade_in: active,
      fade_out: !active
    });
    return (
      <div>
      <div onClick={hidePopup} className={editorClasses}>
        <div className="gte_popup_container">
          <div className="gte_popup_container_wrapper">
            <div onKeyUp={this.btnClickedEnter.bind(this)} onClick={this.stopPropagation.bind(this)} className="gte_form_border_box">
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

Editor.PropTYpes = {
  active: PropTypes.bool.isRequired,
  editor: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  popupTitle: PropTypes.string.isRequired,
  popupButton: PropTypes.string.isRequired,
}

export default Editor
