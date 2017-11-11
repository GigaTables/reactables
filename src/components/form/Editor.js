"use strict";

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EditorException} from '../Exceptions';
import editorStyles from '../../css/editor.css';
import classNames from 'classnames/bind';
import superagent from 'superagent';
import Input from "./fields/Input";
import HTML5Input from "./fields/HTML5Input";
import TextArea from "./fields/TextArea";
import Select from "./fields/Select";
import CheckRadio from "./fields/CheckRadio";
import TextEditor from "./fields/TextEditor";

const CommonConstants = require('../CommonConstants');
const EditorConstants = require('../EditorConstants');
const Lang = require('../Lang');
const loAssign = require('lodash/assign');

class Editor extends Component {
    constructor(props) {
        super(props);
        if (typeof props.editor.fields === CommonConstants.UNDEFINED) {
            throw new EditorException('You should define "fields" option.');
        }
        if (props.editor.fields.length === 0) {
            throw new EditorException('You should define at least one field in "fields" option.');
        }
        this.lang = Lang[props.lang];
        this.state = {
            dataIndices: {},
            popup_title: this.lang.gte_editor_popupheader_create,
            popup_button: this.lang.gte_editor_sendbtn_create,
            setMultipleText: 0,
            isTextArea: false,
        };
        this.setFields(props);
        this.setDataIndices(props);
        this.fieldsetOpen = 0;
        this.fieldsetClose = 0;
        this.fieldsetLegend = '';
    }

    setDataIndices(props) {
        let cols = props.columns;
        this.dataIndices = [];
        cols.forEach((column, index) => {
            this.dataIndices[column.name] = '';
        });
    }

    setFields(props) {
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

    setCreateFields(editorFields) {
        let fields = [];
        editorFields.forEach((object, index) => {
            this.setFieldsets(index, object);
            fields[index] = this.getFieldByType(index, object);
        });
        if (this.fieldsetClose > 0) {
            fields = this.setFieldsetFields(fields);
        }
        return fields;
    }

    setEditFields(editorFields) {
        let fields = [];
        editorFields.forEach((object, index) => {
            this.setFieldsets(index, object);
            fields[index] = this.getFieldByType(index, object);
        });
        if (this.fieldsetClose > 0) {
            fields = this.setFieldsetFields(fields);
        }
        return fields;
    }

    setFieldsets(index, object) {
        if (typeof object.fieldsetOpen !== CommonConstants.UNDEFINED) {
            if (typeof object.legend === CommonConstants.UNDEFINED) {
                throw new EditorException('the "legend" property must be specified within fieldsetOpen');
            }
            this.fieldsetOpen = index;
            this.fieldsetLegend = object.legend;
        }
        if (typeof object.fieldsetClose !== CommonConstants.UNDEFINED) {
            this.fieldsetClose = index;
        }
    }

    setFieldsetFields(fields) {
        let fieldsInSets = [];
        fields.forEach((object, index) => {
            if (index >= this.fieldsetOpen && index <= this.fieldsetClose) {
                fieldsInSets[index] = object;
            }
        });
        let reFields = [];
        reFields.push(fields.slice(0, this.fieldsetOpen));
        reFields.push(<div key={this.fieldsetClose} className="gte_editor_fields">
            <fieldset>
                <legend>{this.fieldsetLegend}</legend>
                {fieldsInSets}
            </fieldset>
        </div>);
        reFields.push(fields.slice(this.fieldsetClose + 1));
        return reFields;
    }

    setDeleteFields(items) {
        let fields = [], lastId = 0;
        this.state.dataIndices = this.props.selectedIds;
        this.props.selectedIds.forEach((object, index) => {
            fields[index] = <input key={index} type="hidden" data-value={object} name="ids[]" value={object}/>;
            lastId = index;
        });
        fields.push(<div key={++lastId} className="gte_msg">Are You sure You wish to delete {items.length}
            row(s)?</div>);
        return fields;
    }

    onFocus(e) {
        const {setMultipleText} = this.state;
        let isTextArea = false;
        if (typeof e.target.dataset.multiple !== CommonConstants.UNDEFINED
            && true === e.target.dataset.multiple && setMultipleText === 0) {
            document.querySelectorAll('input').value = '';
        }
        if ((typeof e.target.dataset.textarea !== CommonConstants.UNDEFINED
            && e.target.dataset.textarea === CommonConstants.STR_TRUE)
                // for RTE focus check
            || (typeof e.target.children[0] !== CommonConstants.UNDEFINED
            && typeof e.target.children[0].getAttribute('data-contents') !== CommonConstants.UNDEFINED
            && e.target.children[0].getAttribute('data-contents') === CommonConstants.STR_TRUE)) {
            isTextArea = true;
        }
        this.setState({
            setMultipleText: 1,
            isTextArea: isTextArea,
        });
    }

    onChange(e) {
        const {setMultipleText} = this.state;
        let isMultiple = e.target.dataset.multiple;
        let val = (isMultiple && setMultipleText === 0) ? '' : e.target.value;

        this.setState({
            dataIndices: Object.assign({}, this.state.dataIndices, {
                [e.target.name]: val
            }),
            setMultipleText: 1,
        });
    }

    /**
     * Uploads files via AJAX with FormData object
     */
    fileUpload() {
        if (typeof this.filesInput.files !== CommonConstants.UNDEFINED) {
            const {ajaxFiles} = this.props.editor;
            let formData = new FormData();
            const files = this.filesInput.files;
            for (let key in files) {
                // check if this is a file:
                if (files.hasOwnProperty(key) && files[key] instanceof File) {
                    formData.append(key, files[key]);
                }
            }

            superagent.post(ajaxFiles)
                .send(formData)
                .end((err, response) => {
                    if (err) {
                        console.log('Error has occurred while uploading files: ');
                        console.log(err);
                    } else if (response.ok) {
                        //this was successful, handle it here
                    }
                });
        }
    }

    onChangeHtml(el, html) {
        this.setState({
            dataIndices: Object.assign({}, this.state.dataIndices, {
                [el.props.name]: html
            })
        });
    }

    getFieldByType(index, object) {
        const {dataIndices, setMultipleText} = this.state;
        const {action, fieldsEdit} = this.props;
        const isMultiple = (Object.keys(fieldsEdit).length > 1);

        let fieldType = object.type,
            fieldName = object.name,
            fieldLabel = object.label,
            fieldValue = '';
        if (true === isMultiple && setMultipleText === 0) {
            fieldValue = 'note: multiple rows mode - changed fields will be sent for selected rows';
        } else {
            if (action === EditorConstants.ACTION_EDIT) {
                if (typeof dataIndices[fieldName] !== CommonConstants.UNDEFINED) {
                    fieldValue = dataIndices[fieldName];
                } else {
                    if (true === isMultiple) {
                        fieldValue = '';
                    } else {
                        fieldValue = fieldsEdit[0][fieldName];
                    }
                }
            } else if (action === EditorConstants.ACTION_CREATE
                && typeof dataIndices[fieldName] !== CommonConstants.UNDEFINED) {
                fieldValue = dataIndices[fieldName];
            }
        }
        // settting attrs
        var attributes = [];
        if (typeof object.attrs !== CommonConstants.UNDEFINED) {
            var fieldOpts = object.attrs;
            for (let opt in fieldOpts) {
                for (let attr in fieldOpts[opt]) {
                    attributes[attr] = fieldOpts[opt][attr];
                }
            }
        }

        let i = 0,
            htmlFields = [];
        switch (fieldType) {
            // uncontrolled input element, so we can put value here
            case EditorConstants.TYPE_TEXT:
            case EditorConstants.TYPE_HIDDEN:
            case EditorConstants.TYPE_EMAIL:
            case EditorConstants.TYPE_PASSWORD:
                htmlFields[i] = <Input
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange.bind(this)}
                    attributes={attributes}
                    id={fieldName}
                    type={fieldType}
                    name={fieldName}
                    label={fieldLabel}
                    value={fieldValue}
                    isMultiple={isMultiple}/>;
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
                htmlFields[i] = <HTML5Input
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange.bind(this)}
                    attributes={attributes}
                    id={fieldName}
                    type={fieldType}
                    name={fieldName}
                    label={fieldLabel}
                />;
                break;
            case EditorConstants.TYPE_FILE:
                // todo: it can't be passed through rfc from File component
                htmlFields[i] = <div className="gte_editor_fields">
                    <label className="gte_label" htmlFor={fieldName}>{fieldLabel}</label>
                    <div className={editorStyles.gte_field}>
                        <input
                            ref={(input) => {
                                this.filesInput = input;
                            }}
                            {...attributes}
                            id={fieldName}
                            type={fieldType}
                            name={fieldName}/>
                    </div>
                    <div className="clear"></div>
                </div>;
                break;
            case EditorConstants.TYPE_TEXTAREA:
                if (typeof object.plugins !== CommonConstants.UNDEFINED
                    && object.plugins.indexOf(EditorConstants.PLUGINS_RTE) !== -1) {
                    htmlFields[i] = <TextEditor
                        onFocus={this.onFocus.bind(this)}
                        onChangeHtml={this.onChangeHtml.bind(this)}
                        id={fieldName}
                        type={fieldType}
                        name={fieldName}
                        label={fieldLabel}
                        value={fieldValue}
                        attributes={attributes}
                        isMultiple={isMultiple}
                        data-textarea={true}
                    />;
                } else {
                    htmlFields[i] = <TextArea
                        onFocus={this.onFocus.bind(this)}
                        onChange={this.onChange.bind(this)}
                        id={fieldName}
                        type={fieldType}
                        name={fieldName}
                        label={fieldLabel}
                        value={fieldValue}
                        attributes={attributes}
                        isMultiple={isMultiple}
                        data-textarea={true}
                    />;
                }
                break;
            case EditorConstants.TYPE_SELECT:
                htmlFields[i] = <Select
                    onChange={this.onChange.bind(this)}
                    id={fieldName}
                    type={fieldType}
                    name={fieldName}
                    label={fieldLabel}
                    value={fieldValue}
                    objectValues={object.values}
                />;
                break;
            case EditorConstants.TYPE_CHECKBOX:
            case EditorConstants.TYPE_RADIO:
                htmlFields[i] = <CheckRadio
                    onChange={this.onChange.bind(this)}
                    id={fieldName}
                    type={fieldType}
                    name={fieldName}
                    label={fieldLabel}
                    value={fieldValue}
                    objectValues={object.values}
                />;
                break;
        }
        return htmlFields;
    }

    triggerBefore(type) {
        const {tableOpts} = this.props;
        // call triggerBefore if it has been set
        tableOpts.buttons.map((obj, idx) => {
            if (obj.extended === type && typeof obj.triggerBefore !== CommonConstants.UNDEFINED) {
                obj.triggerBefore();
            }
        });
    }

    triggerAfter(type) {
        const {tableOpts} = this.props;
        // call triggerAfter if it has been set
        tableOpts.buttons.map((obj, idx) => {
            if (obj.extended === type && typeof obj.triggerAfter !== CommonConstants.UNDEFINED) {
                obj.triggerAfter();
            }
        });
    }

    btnClicked(e) {
        e.persist(); // this is to avoid null values in this.props.editorUpdate(e, dataResp) call
        const {
            action,
            editorUpdate,
            editor,
            fieldsEdit,
        } = this.props;
        const {dataIndices} = this.state;

        let ajaxUrl = editor.ajax;
        let dataResp = dataIndices;
        if (action === EditorConstants.ACTION_CREATE) {
            this.triggerBefore(EditorConstants.EDITOR_CREATE);
            this.fileUpload();
            fetch(ajaxUrl, {
                method: EditorConstants.HTTP_METHOD_POST,
                body: JSON.stringify(dataIndices)
            }).then(response => response.json()).then((data) => {
                dataResp['id'] = data['row']['id'];
                dataResp[CommonConstants.GT_ROW_ID] = data['row']['id'];
                editorUpdate(e, dataResp);
                this.triggerAfter(EditorConstants.EDITOR_CREATE);
            });
        } else if (action === EditorConstants.ACTION_EDIT) {
            this.triggerBefore(EditorConstants.EDITOR_EDIT);
            this.fileUpload();
            let payload = [];
            for (let k in fieldsEdit) {
                payload[k] = loAssign({}, fieldsEdit[k], dataIndices);
            }
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
                body: JSON.stringify(dataIndices) // prop ids are passed from Reactables
            }).then(response => response.json()).then((data) => {
                // call editorUpdate method with passing all user-input values
                editorUpdate(e, dataResp);
                this.triggerAfter(EditorConstants.EDITOR_REMOVE);
            });
        }
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    btnClickedEnter(e) {
        if (e.keyCode === CommonConstants.ENTER_KEY && this.state.isTextArea === false) {
            document.getElementById('gte_sent_btn').click();
        }
    }

    render() {
        const {
            hidePopup,
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
                gte_popup_background: true,
                fade_in: active,
                fade_out: !active
            });
        return (
            <div>
                <div onClick={hidePopup} className={editorClasses}>
                    <div className="gte_popup_container">
                        <div className="gte_popup_container_wrapper">
                            <div
                                onKeyUp={this.btnClickedEnter.bind(this)}
                                onClick={this.stopPropagation.bind(this)}
                                className="gte_form_border_box">
                                <div
                                    className="close_btn"
                                    onClick={hidePopup}></div>
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

Editor.propTYpes = {
    active: PropTypes.bool.isRequired,
    editor: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired,
    popupTitle: PropTypes.string.isRequired,
    popupButton: PropTypes.string.isRequired,
    editorUpdate: PropTypes.func.isRequired,
    selectedIds: PropTypes.array.isRequired,
};

export default Editor
