import React from 'react';
import PropTypes from 'prop-types';
import Main from './components/Main.js';
import Tools from './components/tools/Tools.js';
import Editor from './components/form/Editor.js';
import Pagination from './components/tools/Pagination.js';
import styles from './css/styles.css';
import {DataException} from './components/Exceptions';
import TBody from "./components/table/TBody";
import TFoot from "./components/table/TFoot";
import THead from "./components/table/THead";

const CommonConstants = require('./components/CommonConstants');
const loAssign = require('lodash/assign');

class Reactables extends Main {
    constructor(props) {
        super(props);
        this.defaultSettings = {
            struct: {
                search: ['top', 'bottom'],
                rowsSelector: ['asc', 'top', 'bottom'],
                pagination: ['bottom'], // pagination and infiniteScroll are mutually exclusive
                infiniteScroll: false,
                editableCells: false,
                aggregateFooter: false,
                download: {
                    csv: false,
                },
            },
            lang: 'en',
            perPageRows: [25, 50, 100, 200, 500],
            defaultPerPage: 50,
            columns: [],
            columnOpts: [],
            tableOpts: {
                buttons: [],
                theme: 'std'
            }
        };

        this.state = {
            dataRows: null,
            countRows: 0,
            perPage: (typeof props.settings.defaultPerPage !== CommonConstants.UNDEFINED) ? props.settings.defaultPerPage : this.defaultSettings.defaultPerPage,
            page: 1,
            fromRow: 0,
            dataSearch: null,
            sortButtons: [],
            action: 'create', // optimized - not importing EditorConstants
            active: false,
            selectedRows: [],
            selectedIds: [],
            ctrlDown: false,
            shiftDown: false,
            arrowDown: false,
            arrowUp: false,
            arrowLeft: false,
            arrowRight: false,
            minRow: 0,
            maxRow: 0,
            opacity: 0,
            search: '',
            fieldsEdit: {},
            columnsSearch: {},
            discreteFocus: false,
            scrolledDown: false,
            editedCell: '',
            footerCounted: false,
            footerSum: 0,
            footerAvg: 0,
            footerMinLength: 0,
            footerMaxLength: 0,
            footerFrequency: '',
        };
        // cols opts
        this.searchableCols = [];
        this.searchableCase = [];
        this.discreteSearchableCase = [];
        this.visibleCols = [];
        this.sortableCols = [];
        this.customColumns = [];
        this.progressBars = [];
        this.lastTimeKeyup = (new Date()).getTime(), this.nowMillis = 0;
        // these default sets will merge with users sets
        this.build();
    }

    build() {
        this.settings = loAssign({}, this.defaultSettings, this.props.settings);
        const {columns, columnOpts} = this.settings;
        columns.forEach((object, index) => {
            this.setSearchableCols(object);
            this.setSearchableCase(object);
            this.setSortableCols(object);
            // visibility must be the last - it unsets search & sort if false
            this.setVisibleCols(object);
            this.setProgressBars(object);
        });
        if (typeof columnOpts !== CommonConstants.UNDEFINED) {
            columnOpts.forEach((object, index) => {
                this.setCustomColumns(object);
            });
        }

        let colsLen = columns.length;
        let destination = this.settings.ajax;
        this.resolvePromiseUrl(destination, colsLen);
        // only set interval if both properties set and period >= 5 sec
        if (typeof this.settings.ajaxAutoloadData !== CommonConstants.UNDEFINED
            && typeof this.settings.ajaxAutoloadPeriod !== CommonConstants.UNDEFINED
            && this.settings.ajaxAutoloadData === true
            && parseInt(this.settings.ajaxAutoloadPeriod) >= CommonConstants.MIN_AUTOLOAD_PERIOD
            && parseInt(this.settings.ajaxAutoloadPeriod) <= CommonConstants.MAX_AUTOLOAD_PERIOD) {
            setInterval(() => {
                this.resolvePromiseUrl(destination, colsLen);
            }, parseInt(this.settings.ajaxAutoloadPeriod) * 1000);
        }
    }

    resolvePromiseUrl(destination, colsLen) {
        if (typeof destination.then === CommonConstants.FUNCTION) {
            destination.then((url) => {
                this.setData(url, colsLen);
            });
        } else {
            this.setData(destination, colsLen);
        }
    }

    setData(url, colsLen) {
        fetch(url).then((response) => {// set ajax loader fo BD
            this.setLoader(colsLen);
            return response.json();
        }).then((data) => {
            let jsonData = data['rows'] ? data['rows'] : data['row']; // one row or several
            if (typeof jsonData === CommonConstants.UNDEFINED) {
                throw new DataException('JSON must contain "rows" field.');
            }
            this.jsonData = jsonData;
            this.createTable(jsonData);
            this.setTableSort();
        });
    }

    componentDidMount() {
        let that = this;
        // turn on infinite scroll
        if (this.settings.struct.infiniteScroll === true) {
            window.addEventListener('scroll', (e) => {
                this.handleScroll();
            });
        }
        // turn on fixed headers
        if (this.settings.struct.fixedHeader === true) {
            this.fixHeaders();
        }
        // enabling keys
        document.addEventListener('keydown', (e) => {
            // independent keys (ex.: pop-up)
            switch (e.which) {
                case CommonConstants.CTRL_KEY:
                    that.setState({
                        ctrlDown: true
                    });
                    break;
                case CommonConstants.CTRL_KEY_MAC_CHROME:
                    that.setState({
                        ctrlDown: true
                    });
                    break;
                case CommonConstants.CTRL_KEY_MAC_FF:
                    that.setState({
                        ctrlDown: true
                    });
                    break;
            }
            if (this.state.active === false) {// turn off events with active pop-up
                switch (e.which) {
                    case CommonConstants.CTRL_KEY:
                        that.setState({
                            ctrlDown: true
                        });
                        break;
                    case CommonConstants.CTRL_KEY_MAC_CHROME:
                        that.setState({
                            ctrlDown: true
                        });
                        break;
                    case CommonConstants.CTRL_KEY_MAC_FF:
                        that.setState({
                            ctrlDown: true
                        });
                        break;
                    case CommonConstants.SHIFT_KEY:
                        that.setState({
                            shiftDown: true
                        });
                        break;
                    case CommonConstants.ESCAPE_KEY:
                        that.hidePopup();
                        break;
                    case CommonConstants.ARROW_UP:
                        that.setState({
                            arrowUp: true
                        });
                        break;
                    case CommonConstants.ARROW_DOWN:
                        that.setState({
                            arrowDown: true
                        });
                        break;
                    case CommonConstants.ARROW_LEFT:
                        that.setState({
                            arrowLeft: true
                        });
                        break;
                    case CommonConstants.ARROW_RIGHT:
                        that.setState({
                            arrowRight: true
                        });
                        break;
                    case CommonConstants.A_KEY:
                        that.setState({
                            aDown: true
                        });
                        break;
                }
                that.addSelectedRows();
                that.setPagination();
            }
        });

        // disabling keys
        document.addEventListener('keyup', (e) => {
            switch (e.which) {
                case CommonConstants.CTRL_KEY:
                    that.setState({
                        ctrlDown: false
                    });
                    break;
                case CommonConstants.CTRL_KEY_MAC_CHROME:
                    that.setState({
                        ctrlDown: false
                    });
                    break;
                case CommonConstants.CTRL_KEY_MAC_FF:
                    that.setState({
                        ctrlDown: false
                    });
                    break;
                case CommonConstants.ESCAPE_KEY:
                    that.hidePopup();
                    break;
            }
            if (this.state.active === false) {// turn off events with active pop-up
                switch (e.which) {
                    case CommonConstants.CTRL_KEY:
                        that.setState({
                            ctrlDown: false
                        });
                        break;
                    case CommonConstants.CTRL_KEY_MAC_CHROME:
                        that.setState({
                            ctrlDown: false
                        });
                        break;
                    case CommonConstants.CTRL_KEY_MAC_FF:
                        that.setState({
                            ctrlDown: false
                        });
                        break;
                    case CommonConstants.SHIFT_KEY:
                        that.setState({
                            shiftDown: false
                        });
                        break;
                    case CommonConstants.ARROW_UP:
                        that.setState({
                            arrowUp: false
                        });
                        break;
                    case CommonConstants.ARROW_DOWN:
                        that.setState({
                            arrowDown: false
                        });
                        break;
                    case CommonConstants.ARROW_LEFT:
                        that.setState({
                            arrowLeft: false
                        });
                        break;
                    case CommonConstants.ARROW_RIGHT:
                        that.setState({
                            arrowRight: false
                        });
                        break;
                    case CommonConstants.A_KEY:
                        that.setState({
                            aDown: false
                        });
                        break;
                }
            }
        });
    }

    getTools(display) {
        const {
            selectedRows,
            search,
            perPage,
        } = this.state;

        const {
            tableOpts,
            perPageRows,
            defaultPerPage,
            lang,
            struct,
        } = this.settings;

        let dataToPass = [];
        // prevent big data flow if it needless to pass to Tools for exports
        if (typeof struct.download !== CommonConstants.UNDEFINED && struct.download.csv === true) {
            dataToPass = this.jsonData;
        }
        return (<Tools
            updatePerPage={this.updatePerPage.bind(this)}
            showPopup={this.showPopup.bind(this)}
            doSearch={this.doSearch.bind(this)}
            tableOpts={tableOpts}
            perPageRows={perPageRows}
            perPage={perPage}
            defaultPerPage={defaultPerPage}
            lang={lang}
            selectedRows={selectedRows}
            search={search}
            struct={struct}
            display={display}
            jsonData={dataToPass}
        />)
    }

    getEditor(display) {
        const {editor} = this.props;
        if (typeof editor !== CommonConstants.UNDEFINED) {
            const {
                active,
                action,
                selectedRows,
                selectedIds,
                opacity,
                popup_button,
                popup_title,
                fieldsEdit,
            } = this.state;
            const {
                tableOpts,
                lang,
                struct,
            } = this.settings;

            return (
                <Editor
                    active={active}
                    action={action}
                    editor={editor}
                    columns={editor.fields}
                    editorUpdate={this.editorUpdate.bind(this)}
                    selectedRows={selectedRows}
                    selectedIds={selectedIds}
                    fieldsEdit={fieldsEdit}
                    opacity={opacity}
                    popupButton={popup_button}
                    popupTitle={popup_title}
                    hidePopup={this.hidePopup.bind(this)}
                    lang={lang}
                    struct={struct}
                    display={display}
                    tableOpts={tableOpts}/>
            )
        }
    }

    getPagination(display) {
        const {
            lang,
            struct
        } = this.settings;

        if (struct.pagination.indexOf(display) === -1 || struct.infiniteScroll === true) {
            return '';
        }

        const {
            countRows,
            page,
            perPage,
            fromRow
        } = this.state;

        return (<Pagination
            updatePagination={this.handlePagination.bind(this)}
            countRows={countRows}
            page={page}
            perPage={perPage}
            fromRow={fromRow}
            lang={lang}/>)
    }

    fixHeaders() {
        let h = document.getElementsByTagName("thead")[0], readout = document.getElementsByTagName("tbody")[0];
        let stuck = false, stickPoint = h.offsetTop, tHeadWidth = h.offsetWidth;
        window.onscroll = function (e) {
            let ths = document.getElementsByTagName("tbody")[0].children[0].children;
            let offset = window.pageYOffset;
            let distance = h.offsetTop - offset;

            if ((distance <= 0) && stuck === false) {
                h.style.position = 'fixed';
                h.style.top = '0px';
                h.style.backgroundColor = '#f9f9f9';
                stuck = true;
                let fixedThs = document.getElementsByTagName("thead")[0].childNodes[0].childNodes;

                for (let k in ths) {
                    if (typeof fixedThs[k] !== CommonConstants.UNDEFINED
                        && typeof fixedThs[k].style !== CommonConstants.UNDEFINED) {
                        fixedThs[k].style.width = ths[k].offsetWidth;
                    }
                }
            } else if (stuck === true && (offset <= stickPoint)) {
                h.style.position = 'static';
                h.style.backgroundColor = '#fff';
                stuck = false;
            }
        }
    }

    rerenderTable() {
        this.setState({
            editedCell: '',
        }, () => {
            this.createTable(this.jsonData, this.state.sortButtons, this.state.selectedRows);
        });
    }

    render() {
        let sortedCols = this.setHeads();
        const {
            dataRows,
        } = this.state;
        const {
            struct,
        } = this.settings;
        return (
            <div className={styles.gt_container} style={{width: "1128px"}}>
                <div className={styles.gt_head_tools}>
                    {this.getTools(CommonConstants.DISPLAY_TOP)}
                </div>
                <div className={styles.gt_pagination}>
                    {this.getPagination(CommonConstants.DISPLAY_TOP)}
                </div>
                <table id="gigatable" className={styles.gigatable}>
                    <THead>
                    {sortedCols}
                    </THead>
                    <TBody
                        rerenderTable={this.rerenderTable.bind(this)}
                        struct={struct}>
                    {dataRows}
                    </TBody>
                    <TFoot>
                    {sortedCols}
                    </TFoot>
                </table>
                <div className={styles.gt_pagination}>
                    {this.getPagination(CommonConstants.DISPLAY_BOTTOM)}
                </div>
                <div className={styles.gt_foot_tools}>
                    {this.getTools(CommonConstants.DISPLAY_BOTTOM)}
                </div>
                {this.getEditor()}
            </div>
        )
    }
}

Reactables.propTypes = {
    editor: PropTypes.object,
    settings: PropTypes.object.isRequired
};

export default Reactables