import React from 'react'
import {DataException} from './components/Exceptions';

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

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

    let fields = [];
    if (props.action === EditorConstants.ACTION_CREATE) {
      fields = this.setCreateFields(props.editor.fields);
    } else if (props.action === EditorConstants.ACTION_EDIT) {
      fields = this.setEditFields(props.editor.fields);
    } else if (props.action === EditorConstants.ACTION_DELETE) {
      fields = this.setEditFields(props.delItems);
    }
    this.state = {
      fields: fields
    }
  }

  setCreateFields(fields)
  {
    let fields = [];
    fields.map((object, index) => {
      this.getFieldByType(index, object);
    });
    return fields;
  }

  getFieldByType(index, object)
  {
    var fieldType = fields[k].type,
            fieldName = fields[k].name,
            fieldLabel = fields[k].label;

    var attributes = '';
    if (typeof fields[k].attrs !== UNDEFINED) {
      var fieldOpts = fields[k].attrs;
      for (var opt in fieldOpts) {
        for (var attr in fieldOpts[opt]) {
          attributes += attr + '="' + fieldOpts[opt][attr] + '"';
        }
      }
    }

    switch (fieldType) {
      case TYPE_TEXT:
      case TYPE_HIDDEN:
      case TYPE_EMAIL:
      case TYPE_PASSWORD:
      case TYPE_COLOR:
      case TYPE_DATE:
      case TYPE_DATETIME:
      case TYPE_NUMBER:
      case TYPE_RANGE:
      case TYPE_SEARCH:
      case TYPE_TIME:
      case TYPE_TEL:
      case TYPE_URL:
      case TYPE_MONTH:
      case TYPE_WEEK:
      case TYPE_FILE:
        htmlFieldsCreate += '<div class="gte_editor_fields">';
        htmlFieldsEdit += '<div class="gte_editor_fields">';
        if (fieldType !== 'hidden') {
          htmlFieldsCreate += '<label class="gte_label" for="' + fieldName + '">' + fieldLabel + '</label>';
          htmlFieldsEdit += '<label class="gte_label" for="' + fieldName + '">' + fieldLabel + '</label>';
        }
        htmlFieldsCreate += '<div class="gte_field"><input ' + attributes + ' id="' + fieldName + '" type="' + fieldType + '" name="' + fieldName + '" data-value=""/></div><div class="clear"></div></div>';
        htmlFieldsEdit += '<div class="gte_field"><input ' + attributes + ' id="' + fieldName + '" type="' + fieldType + '" name="' + fieldName + '" data-value=""/></div><div class="clear"></div></div>';
        break;
      case TYPE_TEXTAREA:
        htmlFieldsCreate += '<div class="gte_editor_fields"><label class="gte_label" for="' + fieldName + '">' + fieldLabel + '</label><div class="gte_field"><textarea ' + attributes + ' id="' + fieldName + '" name="' + fieldName + '"></textarea></div><div class="clear"></div></div>';
        htmlFieldsEdit += '<div class="gte_editor_fields"><label class="gte_label" for="' + fieldName + '">' + fieldLabel + '</label><div class="gte_field"><textarea ' + attributes + ' id="' + fieldName + '" name="' + fieldName + '"></textarea></div><div class="clear"></div></div>';
        break;
      case TYPE_SELECT:
        var values = fields[k].values;
        var options = '', val = '';
        for (var k in values) {
          for (var key in values[k]) {
            val = values[k][key].trim();
            options += '<option value="' + key + '" data-value="' + val.toLowerCase() + '">' + val + '</option>';
          }
        }
        htmlFieldsCreate += '<div class="gte_editor_fields"><label class="gte_label" for="' + fieldName + '">' + fieldLabel + '</label><div class="gte_field"><select ' + attributes + ' id="' + fieldName + '" name="' + fieldName + '">' +
                options
                + '</select></div><div class="clear"></div></div>';
        htmlFieldsEdit += '<div class="gte_editor_fields"><label class="gte_label" for="' + fieldName + '">' + fieldLabel + '</label><div class="gte_field"><select ' + attributes + ' id="' + fieldName + '" name="' + fieldName + '">' +
                options
                + '</select></div><div class="clear"></div></div>';
        break;
      case TYPE_CHECKBOX:
      case TYPE_RADIO:
        var values = fields[k].values;
        var options = '', val = '',
                //@fixme regexp to remove ex: [3] etc
                id = fieldName.replace('[]', '');
        for (var k in values) {
          for (var key in values[k]) {
            val = values[k][key].trim();
            options += '<label class="gte_label_text"><input ' + attributes + ' id="' + id + '" type="' + fieldType + '" name="' + fieldName + '" data-value="' + val.toLowerCase() + '" value="' + key + '">' + val + '</label>';
          }
        }
        htmlFieldsCreate += '<div class="gte_editor_fields"><label class="gte_label">' + fieldLabel + '</label><div class="gte_field">' +
                options
                + '</div><div class="clear"></div></div>';
        htmlFieldsEdit += '<div class="gte_editor_fields"><label class="gte_label">' + fieldLabel + '</label><div class="gte_field">' +
                options
                + '</div><div class="clear"></div></div>';
        break;
    }
  }

  setEditFields(fields)
  {
    let fields = [];
    fields.map((object, index) => {

    });
    return fields;
  }

  setDeleteFields(items)
  {
    return (<div>Are You sure You wish to delete {items} row(s)?</div>);
  }

  getEditorField(params = [])
  {
    let field = [];

    return (
      <div class="gte_editor_fields">
        <div class="gte_field">
          <input id="id" type="hidden" name="id" data-value=""/>
        </div>
        <div class="clear"></div>
      </div>
    );
  }

  getEditorFields(params = [])
  {

  }

  render()
  {
    return (
      <div class="gte_editor_popup" style="display: block; opacity: 1; top: -20px;">
        <div class="gte_popup_container">
          <div class="gte_popup_container_wrapper">
            <div class="gte_form_border_box">
            <div class="gte_form_fields">
            <div class="gte_header">
              <div class="gte_editor_title">Create row</div>
            </div>
            <div class="gte_form_body">
            <div class="gte_form_body_content">
              <form id="gte_form" action="" method="post">
              <div class="gte_form_content">
              <div><input type="hidden" name="action" value="create"></div>
              <div class="gte_editor_fields">
                <div class="gte_field">
                  <input id="id" type="hidden" name="id" data-value="">
                </div>
                <div class="clear"></div>
              </div>
              <div class="gte_editor_fields">
              <label class="gte_label">Types:</label>
              <div class="gte_field">
                <label class="gte_label_text"><input id="types" type="checkbox" name="types[]" data-value="val1" value="key1">val1</label>
                <label class="gte_label_text"><input id="types" type="checkbox" name="types[]" data-value="val2" value="key2">val2</label>
              </div>
              <div class="clear"></div>
              </div>
              <div class="gte_editor_fields">
                <label class="gte_label" for="title">Article title:</label>
                <div class="gte_field"><input pattern="^[A-Za-z0-9_]+$" id="title" type="text" name="title" data-value=""></div>
                <div class="clear"></div>
              </div>
              <div class="gte_editor_fields"><label class="gte_label" for="desc">Description:</label><div class="gte_field"><textarea id="desc" name="desc"></textarea></div><div class="clear"></div></div><div class="gte_editor_fields"><label class="gte_label" for="date">Date Time:</label><div class="gte_field"><input id="date" type="date" name="date" data-value=""></div><div class="clear"></div></div><div class="gte_editor_fields"><label class="gte_label" for="image">Image:</label><div class="gte_field"><input id="image" type="file" name="image" data-value=""></div><div class="clear"></div></div></div></form></div></div><div class="gte_footer"><div class="gte_form_err"></div><div class="gte_form_buttons"><button id="gte_sent_btn" class="btn">Create</button>
              </div>
              </div>
              </div>
              </div>
              </div></div></div>
    )
  }
}

export default Editor
