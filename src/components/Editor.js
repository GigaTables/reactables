import React from 'react'
import {EditorException} from './Exceptions';
import editorStyles from '../css/editor.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class Editor extends React.Component {
  constructor(props)
  {
    super(props);
    if (typeof props.editor.fields === CommonConstants.UNDEFINED) {
      throw new EditorException('You should define "fields" option.');
    }
    if (props.editor.fields.length === 0) {
      throw new EditorException('You should define at least one field in "fields" option.');
    }
    this.lang = Lang[props.lang];
    let fields = [];
    if (props.action === EditorConstants.ACTION_CREATE) {
      fields = this.setCreateFields(props.editor.fields);
    } else if (props.action === EditorConstants.ACTION_EDIT) {
      fields = this.setEditFields(props.editor.fields);
    } else if (props.action === EditorConstants.ACTION_DELETE) {
      fields = this.setEditFields(props.delItems);
    }
    this.state = {
      fields: fields,
      popup_title: this.lang.gte_editor_popupheader_create
    }
  }

  setCreateFields(editorFields)
  {
    let fields = [];
    editorFields.map((object, index) => {
      fields = this.getFieldByType(index, object);
    });
    return fields;
  }

  setEditFields(editorFields)
  {
    let fields = [];
    editorFields.map((object, index) => {
      fields = this.getFieldByType(index, object);
    });
    return fields;
  }

  setDeleteFields(items)
  {
    return (<div>Are You sure You wish to delete {items} row(s)?</div>);
  }

  getFieldByType(index, object)
  {
    var fieldType = object.type,
            fieldName = object.name,
            fieldLabel = object.label,
            action = this.props.action;

    var attributes = '';
    if (typeof object.attrs !== CommonConstants.UNDEFINED) {
      var fieldOpts = object.attrs;
      for (var opt in fieldOpts) {
        for (var attr in fieldOpts[opt]) {
          attributes += attr + '="' + fieldOpts[opt][attr] + '"';
        }
      }
    }

    let i = 0,
    htmlFields = [];
    switch (fieldType) {
      case CommonConstants.TYPE_TEXT:
      case CommonConstants.TYPE_HIDDEN:
      case CommonConstants.TYPE_EMAIL:
      case CommonConstants.TYPE_PASSWORD:
      case CommonConstants.TYPE_COLOR:
      case CommonConstants.TYPE_DATE:
      case CommonConstants.TYPE_DATETIME:
      case CommonConstants.TYPE_NUMBER:
      case CommonConstants.TYPE_RANGE:
      case CommonConstants.TYPE_SEARCH:
      case CommonConstants.TYPE_TIME:
      case CommonConstants.TYPE_TEL:
      case CommonConstants.TYPE_URL:
      case CommonConstants.TYPE_MONTH:
      case CommonConstants.TYPE_WEEK:
      case CommonConstants.TYPE_FILE:
        htmlFields[i] += '<div className="gte_editor_fields">';
        if (fieldType !== 'hidden') {
          htmlFields[i] += '<label className="gte_label" for="' + fieldName + '">' + fieldLabel + '</label>';
        }
        htmlFields[i] += '<div className={editorStyles.gte_field}><input ' + attributes + ' id="' + fieldName + '" type="' + fieldType + '" name="' + fieldName + '" data-value=""/></div><div className="clear"></div></div>';
        break;
      case CommonConstants.TYPE_TEXTAREA:
        htmlFields[i] += '<div className="gte_editor_fields"><label className="gte_label" for="' + fieldName + '">' + fieldLabel + '</label><div className={editorStyles.gte_field}><textarea ' + attributes + ' id="' + fieldName + '" name="' + fieldName + '"></textarea></div><div className="clear"></div></div>';
        break;
      case CommonConstants.TYPE_SELECT:
        var values = object.values;
        var options = '', val = '';
        for (var k in values) {
          for (var key in values[k]) {
            val = values[k][key].trim();
            options += '<option value="' + key + '" data-value="' + val.toLowerCase() + '">' + val + '</option>';
          }
        }
        htmlFields[i] += '<div className="gte_editor_fields"><label className="gte_label" for="' + fieldName + '">' + fieldLabel + '</label><div className={editorStyles.gte_field}><select ' + attributes + ' id="' + fieldName + '" name="' + fieldName + '">' +
                options
                + '</select></div><div className="clear"></div></div>';
        break;
      case CommonConstants.TYPE_CHECKBOX:
      case CommonConstants.TYPE_RADIO:
        var values = object.values;
        var options = '', val = '',
                //@fixme regexp to remove ex: [3] etc
                id = fieldName.replace('[]', '');
        for (var k in values) {
          for (var key in values[k]) {
            val = values[k][key].trim();
            options += '<label className="gte_label_text"><input ' + attributes + ' id="' + id + '" type="' + fieldType + '" name="' + fieldName + '" data-value="' + val.toLowerCase() + '" value="' + key + '"/>' + val + '</label>';
          }
        }
        htmlFields[i] += '<div className="gte_editor_fields"><label className="gte_label">' + fieldLabel + '</label><div className={editorStyles.gte_field}>' +
                options
                + '</div><div className="clear"></div></div>';
        break;
    }
    return htmlFields;
  }

  // getEditorField(params = [])
  // {
  //   let field = [];
  //
  //   return (
  //     <div className="gte_editor_fields">
  //       <label className="gte_label">Types:</label>
  //       <div className="gte_field">
  //         <input id="id" type="hidden" name="id" data-value=""/>
  //       </div>
  //       <div className="clear"></div>
  //     </div>
  //   );
  // }

  render()
  {
    return (
      <div className="gte_editor_popup">
        <div className="gte_popup_container">
          <div className="gte_popup_container_wrapper">
            <div className="gte_form_border_box">
              <div className="gte_form_fields">
                <div className="gte_header">
                  <div className="gte_editor_title">{this.state.popup_title}</div>
                </div>
                <div className="gte_form_body">
                  <div className="gte_form_body_content">
                    <form id="gte_form" action="" method="post">
                      <div className="gte_form_content">
                        <div>
                          <input type="hidden" name="action" value={this.props.action}/>
                        </div>
                      </div>
                      <div>
                        {this.state.fields}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Editor
