import React from 'react'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class Editor extends React.Component {
  constructor(props)
  {
    super(props);
  }

  createFields(fields)
  {
    let fields = [];
    fields.map((object, index) => {
      
    });
    return fields;
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
                </div><div class="clear"></div></div><div class="gte_editor_fields"><label class="gte_label" for="title">Article title:</label><div class="gte_field"><input pattern="^[A-Za-z0-9_]+$" id="title" type="text" name="title" data-value=""></div><div class="clear"></div></div><div class="gte_editor_fields"><label class="gte_label" for="desc">Description:</label><div class="gte_field"><textarea id="desc" name="desc"></textarea></div><div class="clear"></div></div><div class="gte_editor_fields"><label class="gte_label" for="date">Date Time:</label><div class="gte_field"><input id="date" type="date" name="date" data-value=""></div><div class="clear"></div></div><div class="gte_editor_fields"><label class="gte_label" for="image">Image:</label><div class="gte_field"><input id="image" type="file" name="image" data-value=""></div><div class="clear"></div></div></div></form></div></div><div class="gte_footer"><div class="gte_form_err"></div><div class="gte_form_buttons"><button id="gte_sent_btn" class="btn">Create</button>
              </div>
              </div>
              </div>
              </div>
              </div></div></div>
    )
  }
}

export default Editor
