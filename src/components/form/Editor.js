'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DataException, EditorException} from '../Exceptions';
import {t} from '../Helpers';
import '../../css/editor.css';
import classNames from 'classnames/bind';
import superagent from 'superagent';
import HTML5Input from './fields/HTML5Input';
import TextEditor from './fields/TextEditor';
import FormField from './FormField';
import ReactSelect from './fields/ReactSelect';
import HOCEditorButton from "./HOCEditorButton";
import HOCInput from './fields/HOCInput'
import HOCSelect from './fields/HOCSelect'
import HOCCheckRadio from './fields/HOCCheckRadio'
import HOCTextArea from './fields/HOCTextArea'

const CommonConstants = require('../CommonConstants');
const EditorConstants = require('../EditorConstants');
const Lang = require('../Lang');
const loAssign = require('lodash/assign');

class Editor extends Component {

    constructor(props) {
        super(props);

        if (typeof props.editor.fields === CommonConstants.UNDEFINED) {
            throw new EditorException('You should define "fields" option.')
        }
        if (props.editor.fields.length === 0) {
            throw new EditorException('You should define at least one field in "fields" option.')
        }

        this.lang = Lang[props.lang];
        this.state = {
            dataIndices: {},
            popup_title: this.lang.gte_editor_popupheader_create,
            popup_button: this.lang.gte_editor_sendbtn_create,
            setMultipleText: 0,
            isTextArea: false
        };

        this.setFields(props);
        this.setDataIndices(props);

        this.fieldsetOpen = 0;
        this.fieldsetClose = 0;
        this.fieldsetLegend = '';
        this.filesInput = {};
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
        reFields.push(<div key={0} className="gte_editor_fields">
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

        let delMsg = t(this.lang.gte_editor_delete_popup, {'rows': items.length});
        fields.push(<div key={++lastId} className="gte_msg">{delMsg}</div>);
        return fields;
    }

    onFocus(e) {
        const {setMultipleText} = this.state;
        const {tableOpts} = this.props;

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

        // check for material-ui TextField multiple aka textarea
        if (tableOpts.theme === CommonConstants.THEME_MATERIAL_UI && e.target.nodeName === 'TEXTAREA') {
            isTextArea = true;
        }

        this.setState({
            setMultipleText: 1,
            isTextArea: isTextArea
        });
    }

    onChange(e) {
        const {setMultipleText} = this.state;
        let isMultiple = e.target.dataset.multiple;
        let val = (isMultiple && setMultipleText === 0) ? '' : e.target.value;

        console.log(e.target.name, e.target.value, e.target.checked, e.target.type);

        if (e.target.type === EditorConstants.TYPE_CHECKBOX) {
            let newItems = {};
            if (typeof this.state.dataIndices[e.target.name] !== CommonConstants.UNDEFINED) {
                newItems[e.target.name] = {...this.state.dataIndices[e.target.name]};
            } else {
                newItems[e.target.name] = {};
            }

            newItems[e.target.name][e.target.value] = e.target.checked;

            this.setState({
                dataIndices: newItems,
                setMultipleText: 1
            });
        } else {
            this.setState({
                dataIndices: Object.assign({}, this.state.dataIndices, {
                    [e.target.name]: val
                }),
                setMultipleText: 1
            });
        }
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
                    formData.append(key, files[key])
                }
            }

            superagent.post(ajaxFiles).send(formData).end((err, response) => {
                if (err) {
                    console.log('Error has occurred while uploading files: ');
                    console.log(err)
                } else if (response.ok) {
                    //this was successful, handle it here
                }
            })
        }
    }

    onChangeHtml(el, html) {
        this.setState({
            dataIndices: Object.assign({}, this.state.dataIndices, {
                [el.props.name]: html
            })
        })
    }

    getFieldByType(index, object) {
        const {
            dataIndices,
            setMultipleText
        } = this.state;

        const {
            action,
            fieldsEdit,
            tableOpts
        } = this.props;

        const isMultiple = (Object.keys(fieldsEdit).length > 1);

        let fieldType = object.type,
            fieldName = object.name,
            fieldLabel = object.label,
            fieldDefaultValue = object.defaultValue,
            fieldValue = '';

        // attributes for form tags
        let attributes = {};
        if (typeof object.attrs !== CommonConstants.UNDEFINED) {
            attributes = object.attrs;
        }

        if (true === isMultiple && setMultipleText === 0) {
            fieldValue = this.lang.gte_editor_multiple_rows;
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
            } else if (action === EditorConstants.ACTION_CREATE) {
                if (typeof dataIndices[fieldName] !== CommonConstants.UNDEFINED) {
                    fieldValue = dataIndices[fieldName];
                } else if (typeof  fieldDefaultValue !== CommonConstants.UNDEFINED) {
                    fieldValue = fieldDefaultValue;
                }
            }
        }

        // fix warning: value prop on input should not be null
        if (fieldValue === null) {
            fieldValue = '';
        }

        let i = 0,
            htmlFields = {};
        switch (fieldType) {
            // uncontrolled input element, so we can put value here
            case EditorConstants.TYPE_TEXT:
            case EditorConstants.TYPE_HIDDEN:
            case EditorConstants.TYPE_EMAIL:
            case EditorConstants.TYPE_PASSWORD:
                htmlFields = <HOCInput key={i}
                                       onFocus={this.onFocus.bind(this)}
                                       onChange={this.onChange.bind(this)}
                                       attributes={attributes}
                                       id={fieldName}
                                       type={fieldType}
                                       name={fieldName}
                                       value={fieldValue}
                                       isMultiple={isMultiple}
                                       theme={tableOpts.theme}/>;
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
                htmlFields = <HTML5Input
                    key={i}
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange.bind(this)}
                    attributes={attributes}
                    id={fieldName}
                    type={fieldType}
                    name={fieldName}
                    value={fieldValue}
                />;
                break;
            case EditorConstants.TYPE_FILE:
                // todo: it can't be passed through rfc from File component
                htmlFields = <input
                    ref={(input) => {
                        this.filesInput = input
                    }}
                    {...attributes}
                    id={fieldName}
                    type={fieldType}
                    name={fieldName}
                    value={undefined}/>; // fixed React input field value warning
                break;
            case EditorConstants.TYPE_TEXTAREA:
                if (typeof object.plugins !== CommonConstants.UNDEFINED
                    && object.plugins.indexOf(EditorConstants.PLUGINS_RTE) !== -1) {
                    htmlFields =
                        <TextEditor
                            key={i}
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
                    htmlFields = <HOCTextArea
                        key={i}
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
                        theme={tableOpts.theme}
                    />;
                }
                break;
            case EditorConstants.TYPE_SELECT:
                if (typeof object.plugins !== CommonConstants.UNDEFINED
                    && object.plugins.indexOf(EditorConstants.PLUGINS_REACT_SELECT) !== -1) {
                    htmlFields = <ReactSelect
                        key={i}
                        onChange={this.onChange.bind(this)}
                        id={fieldName}
                        type={fieldType}
                        name={fieldName}
                        label={fieldLabel}
                        value={fieldValue}
                        attributes={attributes}
                        pluginProps={object.pluginProps}
                    />;
                } else {
                    htmlFields = <HOCSelect
                        key={i}
                        onChange={this.onChange.bind(this)}
                        id={fieldName}
                        type={fieldType}
                        name={fieldName}
                        label={fieldLabel}
                        value={fieldValue}
                        attributes={attributes}
                        objectValues={object.values}
                        theme={tableOpts.theme}
                    />;
                }
                break;
            case EditorConstants.TYPE_CHECKBOX:
            case EditorConstants.TYPE_RADIO:
                htmlFields = <HOCCheckRadio
                    key={i}
                    onChange={this.onChange.bind(this)}
                    id={fieldName}
                    type={fieldType}
                    name={fieldName}
                    label={fieldLabel}
                    value={fieldValue}
                    attributes={attributes}
                    objectValues={object.values}
                    theme={tableOpts.theme}
                />;
                break;
        }
        return [<FormField key={i} id={fieldName} label={fieldLabel} type={fieldType}>{htmlFields}</FormField>]
    }

    triggerBefore(type) {
        const {tableOpts} = this.props;
        // call triggerBefore if it has been set
        tableOpts.buttons.map((obj) => {
            if (obj.extended === type && typeof obj.triggerBefore !== CommonConstants.UNDEFINED) {
                obj.triggerBefore()
            }
        })
    }

    triggerAfter(type) {
        const {tableOpts} = this.props;
        // call triggerAfter if it has been set
        tableOpts.buttons.map((obj) => {
            if (obj.extended === type && typeof obj.triggerAfter !== CommonConstants.UNDEFINED) {
                obj.triggerAfter()
            }
        })
    }

    btnClicked(e) {
        e.persist(); // this is to avoid null values in this.props.editorUpdate(e, dataResp) call

        const {
            action,
            editorUpdate,
            fieldsEdit,
            editor
        } = this.props;
        const {dataIndices} = this.state;

        let settings = this.getAjaxSettings(action);
        let ajaxUrl = settings.url;
        let dataResp = dataIndices;
        let headers = {};

        headers[CommonConstants.HEADER_CONTENT_TYPE] = CommonConstants.CONTENT_APP_JSON;
        if (action === EditorConstants.ACTION_CREATE) {
            this.triggerBefore(EditorConstants.EDITOR_CREATE);
            this.fileUpload();

            if (typeof dataIndices['id'] !== CommonConstants.UNDEFINED) { // clear the id
                delete dataIndices['id']
            }
            if (typeof dataIndices[CommonConstants.GT_ROW_ID] !== CommonConstants.UNDEFINED) {
                delete dataIndices[CommonConstants.GT_ROW_ID]
            }

            // combine fields with default values + user edited
            let fields = editor.fields, payload = {};
            fields.forEach((object) => {
                if (typeof object.defaultValue !== CommonConstants.UNDEFINED && typeof dataIndices[object.name] === CommonConstants.UNDEFINED) {
                    payload[object.name] = object.defaultValue;
                } else {
                    if (typeof dataIndices[object.name] !== CommonConstants.UNDEFINED) {
                        payload[object.name] = dataIndices[object.name];
                    }
                }
            });

            headers = this.setHeaders(settings, headers);
            fetch(ajaxUrl, {
                method: settings.method,
                body: JSON.stringify(payload),
                headers: headers
            }).then(response => response.json()).then((data) => {
                if (typeof data[CommonConstants.GT_ROW]['id'] === CommonConstants.UNDEFINED) {
                    throw new DataException('The `id` field is required to return in response from server/back-end.')
                }

                // leaving UI fields, prioritizing those from server
                for (let k in data[CommonConstants.GT_ROW]) {
                    if (data[CommonConstants.GT_ROW].hasOwnProperty(k)) {
                        dataResp[k] = data[CommonConstants.GT_ROW][k]
                    }
                }

                dataResp[CommonConstants.GT_ROW_ID] = data[CommonConstants.GT_ROW]['id'];
                editorUpdate(e, dataResp);
                this.triggerAfter(EditorConstants.EDITOR_CREATE)
            }).catch((e) => {
                console.error(e.message)
            });
        } else if (action === EditorConstants.ACTION_EDIT) {
            this.triggerBefore(EditorConstants.EDITOR_EDIT);
            this.fileUpload();

            let payload = [];
            for (let k in fieldsEdit) {
                if (fieldsEdit.hasOwnProperty(k)) {
                    payload[k] = loAssign({}, fieldsEdit[k], dataIndices)
                }
            }

            headers = this.setHeaders(settings, headers);
            fetch(ajaxUrl, {
                method: settings.method,
                body: JSON.stringify(payload),
                headers: headers
            }).then(response => response.json()).then((data) => {
                if (typeof data[CommonConstants.GT_ROWS] === CommonConstants.UNDEFINED // check rows object data
                    || typeof data[CommonConstants.GT_ROWS][0] === CommonConstants.UNDEFINED // check at least 1 row/element
                    || typeof data[CommonConstants.GT_ROWS][0]['id'] === CommonConstants.UNDEFINED) {
                    throw new DataException('The `id` field is required to return in response from server/back-end.')
                }

                // leaving UI fields, prioritizing those from server
                editorUpdate(e, data);
                this.triggerAfter(EditorConstants.EDITOR_EDIT)
            }).catch((e) => {
                console.error(e.message)
            });
        } else if (action === EditorConstants.ACTION_DELETE) {
            this.triggerBefore(EditorConstants.EDITOR_REMOVE);
            headers = this.setHeaders(settings, headers);

            fetch(ajaxUrl, {
                method: settings.method,
                body: JSON.stringify(dataIndices), // prop ids are passed from Reactables
                headers: headers
            }).then(response => response.json()).then(() => {
                // call editorUpdate method with passing all user-input values
                editorUpdate(e, dataResp);
                this.triggerAfter(EditorConstants.EDITOR_REMOVE);
            });
        }
    }

    setHeaders(settings, headers) {
        for (let hKey in settings.headers) {
            if (settings.headers.hasOwnProperty(hKey)) {
                headers[hKey] = settings.headers[hKey];
            }
        }

        return headers;
    }

    getAjaxSettings(action) {
        const {
            editor
        } = this.props;

        if (typeof editor.ajax === CommonConstants.STRING) {
            let httpMethod = EditorConstants.HTTP_METHOD_POST; // action - create

            if (action === EditorConstants.ACTION_EDIT) {
                httpMethod = EditorConstants.HTTP_METHOD_PUT
            } else if (action === EditorConstants.ACTION_DELETE) {
                httpMethod = EditorConstants.HTTP_METHOD_DELETE
            }

            return {
                url: editor.ajax,
                method: httpMethod
            }
        }
        if (typeof editor.ajax === CommonConstants.OBJECT
            && typeof editor.ajax[action] !== CommonConstants.UNDEFINED
            && typeof editor.ajax[action].url !== CommonConstants.UNDEFINED) {
            return {
                url: editor.ajax[action].url,
                method: editor.ajax[action].type,
                headers: editor.ajax[action].headers
            }
        } else { // setting error
            throw new EditorException('"ajax" property must be set either as string url ' +
                'or object with "' + action + '" and "url", "type" properties set-up respectively.');
        }
    }

    stopPropagation(e) {
        e.stopPropagation()
    }

    btnClickedEnter(e) {
        if (e.keyCode === CommonConstants.ENTER_KEY && this.state.isTextArea === false) {
            document.getElementById('gte_sent_btn').click();
        }
    }

    resetFields() {
        // set timeout as in fade_out css
        setTimeout(() => {
            this.setState({dataIndices: {}});
            this.setDataIndices(this.props);
        }, 300);
    }

    render() {
        const {
            hidePopup,
            popupTitle,
            action,
            popupButton,
            active,
            tableOpts,
        } = this.props;

        if (active === false) { // clear fields from user-input data
            this.resetFields();
        } else {
            this.setFields(this.props);
        }

        let editorClasses = classNames({
                gte_editor_popup: true,
                fade_in: active,
                fade_out: !active
            }),
            backgroundClasses = classNames({
                gte_popup_background: true,
                fade_in: active,
                fade_out: !active
            }),
            formFieldsClasses = classNames({
                gte_form_fields: true,
                gte_form_fields_delete: (action === EditorConstants.ACTION_DELETE)
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
                                    onClick={() => {
                                        hidePopup();
                                    }}></div>
                                <div className={formFieldsClasses}>
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
                                            <HOCEditorButton
                                                data-action={action}
                                                action={action}
                                                btnClicked={this.btnClicked.bind(this)}
                                                theme={tableOpts.theme}
                                            >
                                                {popupButton}
                                            </HOCEditorButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => {
                    hidePopup();
                }} className={backgroundClasses}></div>
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
    selectedIds: PropTypes.array.isRequired
};

Editor.defaultProps = {
    pluginProps: {}
};

export default Editor
