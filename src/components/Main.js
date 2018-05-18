import React, {Component} from 'react';
import Row from './table/Row.js';
import Column from './table/Column.js';
import Footer from './table/Footer';
import Editor from './form/Editor';

const CommonConstants = require('./CommonConstants');
const EditorConstants = require('./EditorConstants');
const Lang = require('./Lang');

class Main extends Component {
    constructor(props) {
        super(props);
        // init search flags
        this.tOut = [], this.c = 0;
    }

    setSearchableCols(object) {
        this.searchableCols[object[CommonConstants.DATA]] = false;
        if (typeof object[CommonConstants.SEARCHABLE] === CommonConstants.UNDEFINED
            || object[CommonConstants.SEARCHABLE] === true) {
            this.searchableCols[object[CommonConstants.DATA]] = true;
        }
    }

    setSearchableCase(object) {
        // common search
        this.searchableCase[object[CommonConstants.DATA]] = true; // case sensitive
        if (typeof object[CommonConstants.CASE_INSENSITIVE_SEARCH] !== CommonConstants.UNDEFINED
            && object[CommonConstants.CASE_INSENSITIVE_SEARCH] === true) {
            this.searchableCase[object[CommonConstants.DATA]] = false; // case insensitive
        }
        // discrete search
        this.discreteSearchableCase[object[CommonConstants.DATA]] = true;
        if (typeof object[CommonConstants.DISCRETE_CASE_INSENSITIVE_SEARCH] !== CommonConstants.UNDEFINED
            && object[CommonConstants.DISCRETE_CASE_INSENSITIVE_SEARCH] === true) {
            this.discreteSearchableCase[object[CommonConstants.DATA]] = false;
        }
    }

    setVisibleCols(object) {
        this.visibleCols[object[CommonConstants.DATA]] = true;
        if (typeof object[CommonConstants.VISIBLE] !== CommonConstants.UNDEFINED
            && object[CommonConstants.VISIBLE] === false) {
            this.visibleCols[object[CommonConstants.DATA]] = false;
            this.sortableCols[object[CommonConstants.DATA]] = false;
            this.searchableCols[object[CommonConstants.DATA]] = false;
        }
    }

    setPlugins(object) {
        this.plugins[object[CommonConstants.DATA]] = false;
        if (typeof object[CommonConstants.PLUGINS] !== CommonConstants.UNDEFINED) {
            this.plugins[object[CommonConstants.DATA]] = object;
        }
    }

    setSortableCols(object) {
        this.sortableCols[object[CommonConstants.DATA]] = false;
        if (typeof object[CommonConstants.SORTABLE] === CommonConstants.UNDEFINED
            || object[CommonConstants.SORTABLE] === true) {
            this.sortableCols[object[CommonConstants.DATA]] = true;
        }
    }

    setCustomColumns(object) {
        this.customColumns[object[CommonConstants.TARGET]] = object[CommonConstants.RENDER];
    }

    doSearch(e) {
        let keyCode = e.keyCode;
        if (CommonConstants.SYMBOLLESS_KEYS.indexOf(keyCode) !== -1) {
            return; // exit - user pressed not a symbol key(s)
        }

        let that = this;
        let name = e.target.name,
            val = e.target.value,
            len = val.length;
        this.nowMillis = (new Date()).getTime();
        let period = this.nowMillis - this.lastTimeKeyup;
        this.setState({
            [name]: val
        });

        if (val === '' && (keyCode === CommonConstants.BACKSPACE_KEY || keyCode === CommonConstants.DELETE_KEY)) { // rebuild full table if teared down
            this.createTable(this.jsonData, this.state.sortedButtons);
            return;
        }

        let nJson = [], str = '', i = 0, json = this.jsonData;
        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                for (let k in json[key]) {
                    if (json[key].hasOwnProperty(k) && k !== CommonConstants.GT_ROW_ID && this.searchableCols[k] === true) { // do not search unsearchable
                        str = json[key][k] + '';
                        if (this.searchableCase[k] === false) {// case insensitive
                            if (str.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                                nJson[i] = json[key];
                                ++i;
                                break;
                            }
                        } else {
                            if (str.indexOf(val) !== -1) {
                                nJson[i] = json[key];
                                ++i;
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (period > CommonConstants.PERIOD_SEARCH) {// show quick results and tear down all timeouts if they are present
            for (let j in this.tOut) {
                clearTimeout(this.tOut[j]);
            }
            this.tOut = [];
            this.c = 0;
            this.createTable(nJson, this.state.sortedButtons, this.state.selectedRows);
        } else {
            this.tOut[this.c] = setTimeout(function () {
                that.createTable(nJson, that.state.sortedButtons, that.state.selectedRows);
            }, CommonConstants.TIMEOUT_SEARCH);
            this.c++;
        }
        this.setState({
            dataSearch: nJson,
            // remove selected rows on any user action
            selectedIds: [],
            selectedRows: [],
        });

        this.lastTimeKeyup = this.nowMillis;
    }

    createTable(jsonData, sortedButtons, selectedRows) {
        const {
            dataSearch,
            perPage,
            fromRow,
            minRow,
            maxRow,
            scrolledDown,
            editedCell,
        } = this.state;

        let editableCells = this.settings.struct.editableCells,
            aggregateFooter = this.settings.struct.aggregateFooter;
        let rows = [];
        if (dataSearch !== null) {
            jsonData = dataSearch;
        }
        let jsonDataPerPage = jsonData;
        if (jsonData.length > perPage) {
            let from = parseInt(fromRow),
                to = from + parseInt(perPage);

            if (scrolledDown === true) { // infiniteScroll cut
                jsonDataPerPage = jsonData.slice(0, to);
            } else { // classic pagination cut
                jsonDataPerPage = jsonData.slice(from, to);
            }
        }
        // process rows
        jsonDataPerPage.forEach((object, objectIndex) => {
            let cols = [], rowId = 0;
            rowId = this.getRowId(object);
            // set checkbox for editable cells
            if (editableCells === true) {
                cols.push(<Column
                    editRow={this.editRow.bind(this)}
                    dataIndex={EditorConstants.EDITABLE_CELLS_INDEX}
                    selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
                    minRow={minRow}
                    maxRow={maxRow}
                    count={objectIndex}
                    gteRowId={rowId}
                    key={-1}
                    editableCells={editableCells}></Column>);
            }
            // process cols
            this.props.children.forEach((th, idx) => {
                const {data} = th.props;
                // check if a JSON object has this data field + visible
                if (typeof data !== CommonConstants.UNDEFINED && this.visibleCols[data] === true) {
                    let content = null;
                    if (typeof this.customColumns[data] !== CommonConstants.UNDEFINED
                        && typeof this.customColumns[data] === CommonConstants.FUNCTION) { // custom column
                        content = this.customColumns[data](object[data], object, data);
                    } else {
                        content = object[data];
                    }
                    cols.push(<Column
                        dataIndex={data}
                        selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
                        minRow={minRow}
                        maxRow={maxRow}
                        count={objectIndex}
                        gteRowId={rowId}
                        key={idx}
                        editableCells={editableCells}
                        editedCell={editedCell}
                        editor={this.props.editor}
                        editCell={this.editCell.bind(this)}
                        editorUpdate={this.editorUpdate.bind(this)}
                        cell={'' + objectIndex + idx}
                        plugins={this.plugins[data]}
                    >{content}</Column>);
                }
            });
            // count is used to shft key + click selection of rows, ex.: sorted
            rows.push(<Row
                clickedRow={this.clickedRow.bind(this)}
                selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
                minRow={minRow}
                maxRow={maxRow}
                key={objectIndex}
                count={objectIndex}
                gteRowId={rowId}
                editableCells={editableCells}>{cols}</Row>);
        });
        if (aggregateFooter === true) {
            this.setFooter(jsonDataPerPage, rows);
        }
        let state = {
            dataRows: rows,
            countRows: jsonData.length
        };
        if (typeof sortedButtons !== CommonConstants.UNDEFINED) {
            state['sortButtons'] = sortedButtons;
        }
        this.setState(state);
    }

    setFooter(jsonDataPerPage, rows) {
        const {columns} = this.settings;
        const {
            footerCounted,
            footerSum,
            footerAvg,
            footerMinLength,
            footerMaxLength,
            footerFrequency,
        } = this.state;

        let sum = 0,
            avg = 0,
            minLength = 0,
            maxLength = 0,
            frequency = [],
            mostFrequent = '';
        if (footerCounted === true) {
            sum = footerSum;
            avg = footerAvg;
            minLength = footerMinLength;
            maxLength = footerMaxLength;
            frequency = footerFrequency;
        } else { // prevent recounting aggregation funcs on each page reload
            // process rows
            this.jsonData.forEach((object) => {
                // process cols
                this.props.children.forEach((th) => {
                    const {data} = th.props;
                    columns.forEach((cObject) => {
                        if (cObject[CommonConstants.DATA] === data
                            && cObject[CommonConstants.FOOTER] !== CommonConstants.UNDEFINED) {
                            let content = object[data];
                            switch (cObject[CommonConstants.FOOTER]) {
                                case CommonConstants.FOOTER_SUM:
                                    sum += parseFloat(content);
                                    break;
                                case CommonConstants.FOOTER_AVG:
                                    avg += parseFloat(content);
                                    break;
                                case CommonConstants.FOOTER_MIN_LENGTH:
                                    const len = content.length;
                                    if (minLength > len || minLength === 0) {
                                        minLength = len;
                                    }
                                    break;
                                case CommonConstants.FOOTER_MAX_LENGTH:
                                    const maxLen = content.length;
                                    if (maxLength < maxLen || maxLength === 0) {
                                        maxLength = maxLen;
                                    }
                                    break;
                                case CommonConstants.FOOTER_FREQUENCY:
                                    if (typeof frequency[content] === CommonConstants.UNDEFINED) {
                                        frequency[content] = 1; // 1st occurrence
                                    } else {
                                        frequency[content]++;
                                    }
                                    break;
                            }
                        }
                    });
                });
            });
        }
        let cols = [];
        let editableCells = this.settings.struct.editableCells;
        if (editableCells === true) { // set empty column on editable cells
            cols.push(
                <Column
                    key={-1}
                    selectedRows={[]}
                    count={-1}
                    gteRowId={-1}
                >&nbsp;</Column>
            );
        }

        // set footer cols
        this.props.children.forEach((th, idx) => {
            const {data} = th.props;
            columns.forEach((cObject) => {
                if (cObject[CommonConstants.DATA] === data
                    && cObject[CommonConstants.FOOTER] !== CommonConstants.UNDEFINED
                    && this.visibleCols[data] === true) { // setting object matches header column
                    switch (cObject[CommonConstants.FOOTER]) {
                        case CommonConstants.FOOTER_SUM:
                            cols.push(
                                <Column
                                    footer={true}
                                    key={idx}
                                    selectedRows={[]}
                                    count={-1}
                                    gteRowId={-1}
                                >{(sum > 0) ? sum : 0}</Column>
                            );
                            break;
                        case CommonConstants.FOOTER_AVG:
                            cols.push(
                                <Column
                                    footer={true}
                                    key={idx}
                                    selectedRows={[]}
                                    count={-1}
                                    gteRowId={-1}
                                >{(avg > 0) ? (avg / jsonDataPerPage.length) : 0}</Column>
                            );
                            break;
                        case CommonConstants.FOOTER_MIN_LENGTH:
                            cols.push(
                                <Column
                                    footer={true}
                                    key={idx}
                                    selectedRows={[]}
                                    count={-1}
                                    gteRowId={-1}
                                >{minLength}</Column>
                            );
                            break;
                        case CommonConstants.FOOTER_MAX_LENGTH:
                            cols.push(
                                <Column
                                    footer={true}
                                    key={idx}
                                    selectedRows={[]}
                                    count={-1}
                                    gteRowId={-1}
                                >{maxLength}</Column>
                            );
                            break;
                        case CommonConstants.FOOTER_FREQUENCY:
                            let i = 0;
                            for (let word in frequency) {
                                if (i === 0) {
                                    mostFrequent = word;
                                }
                                if (frequency[word] > frequency[mostFrequent]) {
                                    mostFrequent = word;
                                }
                                ++i;
                            }
                            cols.push(
                                <Column
                                    footer={true}
                                    key={idx}
                                    selectedRows={[]}
                                    count={-1}
                                    gteRowId={-1}
                                >{mostFrequent}</Column>
                            );
                            break;
                        default: // add an empty column
                            cols.push(
                                <Column
                                    footer={true}
                                    key={idx}
                                    selectedRows={[]}
                                    count={-1}
                                    gteRowId={-1}
                                >&nbsp;</Column>
                            );
                            break;
                    }
                }
            });
        });

        if (footerCounted === false) { // prevent resetting state
            this.setState({
                footerCounted: true,
                footerSum: sum,
                footerAvg: avg,
                footerMinLength: minLength,
                footerMaxLength: maxLength,
                footerFrequency: mostFrequent,
            });
        }
        // set footer
        rows.push(
            <Footer
                key={-1}
            >{cols}</Footer>
        );
    }

    getRowId(object) {
        let rowId = 0;
        // perform id check
        if (typeof object[CommonConstants.GT_ROW_ID] !== CommonConstants.UNDEFINED) {
            rowId = object[CommonConstants.GT_ROW_ID];
        } else if (typeof object['id'] !== CommonConstants.UNDEFINED) {
            rowId = object['id'];
        } else {
            throw new DataException('You have neither "GT_RowId" nor "id" in json structure.');
        }
        return rowId;
    }

    clickedRow(e) {
        const {
            selectedRows,
            selectedIds,
            sortedButtons,
            ctrlDown,
            shiftDown,
        } = this.state;
        const {
            rowid,
            realid,
        } = e.target.dataset;

        let rows = selectedRows,
            ids = selectedIds;
        let min = 0, max = 0,
            rowId = parseInt(rowid),
            realId = parseInt(realid);

        let rowKey = rows.indexOf(rowId);
        if (rows.length > 0 && rowKey !== -1
            && ctrlDown === true) { // if row is active - remove it
            let idKey = ids.indexOf(realId);
            rows.splice(rowKey, 1);
            ids.splice(idKey, 1);
        } else {
            if (ctrlDown === true) {
                rows.push(parseInt(rowid));
                ids.push(parseInt(realid));
            } else if (shiftDown === true) {
                rows.push(parseInt(rowid));
                ids.push(parseInt(realid));
                min = rows[0], max = rows[0];
                for (let row in rows) {
                    if (rows[row] < min) {
                        min = rows[row];
                    }
                    if (rows[row] > max) {
                        max = rows[row];
                    }
                }
                rows = [];
                // fill in the items
                for (let i = min; i <= max; ++i) {
                    rows.push(i);
                }
            } else { // if just a click override prev
                rows = [parseInt(rowid)];
                ids = [parseInt(realid)];
            }
        }
        // we can't use the state for selectedRows here because of state latency
        this.createTable(this.jsonData, sortedButtons, rows);
        this.setState({
            selectedRows: rows,
            selectedIds: ids
        }, () => {
            // use querySelector to gather all active rows
            if (shiftDown === true) {
                let arr = document.querySelectorAll('tr.active'), innerIds = [];
                for (let k in arr) {
                    if (typeof arr[k].dataset !== CommonConstants.UNDEFINED) {
                        innerIds.push(parseInt(arr[k].dataset.realid));
                    }
                }
                this.setState({
                    selectedIds: innerIds
                });
            }
        });
    }

    editRow(e) {
        this.clickedRow(e);
    }

    editCell(e) {
        this.setState({
            editedCell: e.target.dataset.cell
        }, () => {
            this.createTable(this.jsonData, this.state.sortedButtons)
        });
    }

    getButtonsState(indexData, value) {
        const {sortButtons} = this.state;
        let buttons = [];
        for (let key in sortButtons) {
            buttons[key] = sortButtons[key];
            if (key === indexData) {
                buttons[key] = value;
            }
        }
        return buttons;
    }

    editorUpdate(e, dataIndices) {
        let action = e.target.dataset.action,
            rowId = 0,
            selectedRows = this.state.selectedRows;
        if (action === EditorConstants.ACTION_DELETE) {
            const {
                dataSearch,
            } = this.state;
            for (let dataKey in dataIndices) {
                for (let key in this.jsonData) {
                    if (typeof this.jsonData[key][CommonConstants.GT_ROW_ID] !== CommonConstants.UNDEFINED) {
                        rowId = this.jsonData[key][CommonConstants.GT_ROW_ID];
                    } else if (typeof this.jsonData[key]['id'] !== CommonConstants.UNDEFINED) {
                        rowId = this.jsonData[key]['id'];
                    }
                    if (dataIndices[dataKey] === rowId) {
                        selectedRows.splice(selectedRows.indexOf(key), 1);
                        delete this.jsonData[key];
                        if (dataSearch !== null) { // if searched previously - delete from dataSearch rows either
                            dataSearch.forEach((object, k) => {
                                if (parseInt(object[CommonConstants.GT_ROW_ID]) === parseInt(dataIndices[dataKey])) {
                                    delete dataSearch[k];
                                }
                            });
                        }
                    }
                }
            }
        } else if (action === EditorConstants.ACTION_CREATE) {
            this.jsonData.unshift(dataIndices);
        } else if (action === EditorConstants.ACTION_EDIT) {
            if (selectedRows.length === 0) {
                selectedRows[0] = e.target.dataset.rowid;
            }
            for (let key in dataIndices) {
                for (let sKey in selectedRows) {
                    this.jsonData[selectedRows[sKey]][key] = dataIndices[key];
                }
            }
        }
        this.setState({
            selectedRows: selectedRows
        }, () => {
            this.createTable(this.jsonData, this.state.sortedButtons);
        });
        this.hidePopup();
    }

    handlePagination(e) {
        const {from} = e.target.dataset;
        const {perPage, sortedButtons} = this.state;
        this.setState({
            fromRow: parseInt(from),
            page: parseInt(from / perPage + 1),
            selectedRows: [],
            selectedIds: []
        }, () => {
            this.createTable(this.jsonData, sortedButtons)
        });
    }

    updatePerPage(e) {
        this.setState({
            perPage: parseInt(e.target.value)
        }, () => {
            this.createTable(this.jsonData, this.state.sortedButtons)
        });
    }

    showPopup(e) {
        const {selectedRows, dataSearch} = this.state;
        this.lang = Lang[this.settings.lang];
        let action = e.target.dataset.action,
            popup_title = this.lang.gte_editor_popupheader_create,
            popup_button = this.lang.gte_editor_sendbtn_create;
        let fieldsEdit = {};

        switch (action) {
            case EditorConstants.ACTION_RELOAD:
                const {ajax, columns, tableOpts} = this.settings;
                tableOpts.buttons.map((obj) => {
                    let canTrigger = obj.extended === EditorConstants.EDITOR_RELOAD && typeof obj.triggerBefore !== CommonConstants.UNDEFINED
                        && typeof obj.triggerBefore === CommonConstants.FUNCTION;
                    if (canTrigger) {
                        obj.triggerBefore();
                    }
                });
                let colsLen = columns.length;
                this.resolveData(ajax, colsLen);
                tableOpts.buttons.map((obj) => {
                    let canTrigger = obj.extended === EditorConstants.EDITOR_RELOAD && typeof obj.triggerAfter !== CommonConstants.UNDEFINED
                        && typeof obj.triggerAfter === CommonConstants.FUNCTION;
                    if (canTrigger) {
                        obj.triggerAfter();
                    }
                });
                break;
            case EditorConstants.ACTION_EDIT:
                popup_title = this.lang.gte_editor_popupheader_edit;
                popup_button = this.lang.gte_editor_sendbtn_update;
                // collect data for fields filling in Editor
                for (let k in selectedRows) {
                    // tested with sorted rows - should work properly
                    if (dataSearch !== null) { // edit field(s) after search
                        fieldsEdit[k] = dataSearch[selectedRows[k]];
                    } else { // std behavior
                        fieldsEdit[k] = this.jsonData[selectedRows[k]];
                    }
                }
                break;
            case EditorConstants.ACTION_DELETE:
                popup_title = this.lang.gte_editor_popupheader_delete;
                popup_button = this.lang.gte_editor_sendbtn_delete;
                break;
        }
        
        e.preventDefault();
        if (action !== EditorConstants.ACTION_RELOAD) {
            this.setState({
                action: action,
                active: true,
                popup_title: popup_title,
                popup_button: popup_button,
                opacity: 1,
                fieldsEdit: fieldsEdit,
                // turn off key selection
                shiftDown: false,
                ctrlDown: false,
            });
        }
    }

    hidePopup() {
        this.setState({
            active: false
        });
    }

    setTableSort(indexData, e) {
        if (this.state.discreteFocus === true) {
            return;
        }

        const {columns} = this.settings;
        if (typeof e === CommonConstants.UNDEFINED) { // on start-up - setting default
            let sortedButtons = [];
            this.props.children.forEach((th, index) => {
                const {data} = th.props;
                if (typeof data !== CommonConstants.UNDEFINED) {
                    columns.forEach((column, colIdx) => {
                        if (column[CommonConstants.DATA] === data
                            && (typeof column[CommonConstants.SORTABLE] === CommonConstants.UNDEFINED
                                || column[CommonConstants.SORTABLE] === true)) {
                            sortedButtons[data] = 0; // 0 - none, 1 - asc, -1 - desc
                        }
                    });
                }
            });
            this.setState({
                sortButtons: sortedButtons
            });
        } else { // clicked
            this.nowMillis = (new Date()).getTime();
            let period = this.nowMillis - this.lastTimeKeyup;

            if (period > CommonConstants.SORT_PERIOD) {
                this.props.children.forEach((th, idx) => {
                    let that = this;
                    const {sortButtons, dataSearch} = that.state;
                    const {data} = th.props;

                    let cols = columns,
                        sJson = that.jsonData,
                        sortedButtons = [];
                    if (dataSearch !== null) {
                        sJson = dataSearch;
                    }
                    // check and sort for other columns
                    // if (typeof sortButtons[data] !== CommonConstants.UNDEFINED
                    //   && sortButtons[data] !== 0
                    //   && data !== indexData) {
                    //     if (sortButtons[data] === 1) {
                    //       sJson = this.sortAsc(data, sJson);
                    //     } else {
                    //       sJson = this.sortDesc(data, sJson);
                    //     }
                    // }

                    if (indexData === data) { // iff the cols match
                        if (sortButtons[data] === 1) {
                            sortedButtons = that.getButtonsState(indexData, -1);
                            sJson = this.sortDesc(data, sJson);
                        } else { // if 0 || -1 = 1
                            sortedButtons = that.getButtonsState(indexData, 1);
                            sJson = this.sortAsc(data, sJson);
                        }
                        that.createTable(sJson, sortedButtons);
                    }
                });
            }
            this.lastTimeKeyup = this.nowMillis;
        }
    }

    sortAsc(data, sJson) {
        let check = 0, isNan = 0;
        sJson.sort(function (a, b) {
            a = (a[data] === null) ? '' : a[data] + '';
            b = (b[data] === null) ? '' : b[data] + '';
            if (check === 0) { // check just the 1st time
                if (isNaN(a - b)) {
                    isNan = 1;
                }
                check = 1;
            }
            if (isNan) {
                return a.localeCompare(b);
            }
            return a - b;
        });
        return sJson;
    }

    sortDesc(data, sJson) {
        let check = 0, isNan = 0;
        sJson.sort(function (a, b) {
            a = (a[data] === null) ? '' : a[data] + '';
            b = (b[data] === null) ? '' : b[data] + '';
            if (check === 0) { // check just the 1st time
                if (isNaN(a - b)) {
                    isNan = 1;
                }
                check = 1;
            }
            if (isNan) {
                return b.localeCompare(a);
            }
            return b - a;
        });
        return sJson;
    }

    doDiscreteSearch(e) {
        let keyCode = e.keyCode;
        if (CommonConstants.SYMBOLLESS_KEYS.indexOf(keyCode) !== -1) {
            return; // exit - user pressed not a symbol key(s)
        }

        let that = this;
        let name = e.target.name,
            val = e.target.value,
            data = e.target.dataset.index,
            len = val.length;

        this.nowMillis = (new Date()).getTime();
        let period = this.nowMillis - this.lastTimeKeyup;

        this.setState({
            columnsSearch: Object.assign({}, this.state.columnsSearch, {
                [name]: val
            })
        });

        if (val === '' && (keyCode === CommonConstants.BACKSPACE_KEY || keyCode === CommonConstants.DELETE_KEY)) { // rebuild full table if teared down
            this.createTable(this.jsonData, this.state.sortedButtons);
            return;
        }

        let nJson = [], str = '', i = 0, json = this.jsonData;
        for (let key in json) {
            for (let k in json[key]) {
                if (k !== CommonConstants.GT_ROW_ID && this.searchableCols[k] === true
                    && k === data) { // do not search unsearchable and only this column
                    str = json[key][k] + '';
                    if (this.discreteSearchableCase[k] === false) {// case insensitive
                        if (str.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                            nJson[i] = json[key];
                            ++i;
                            break;
                        }
                    } else {
                        if (str.indexOf(val) !== -1) {
                            nJson[i] = json[key];
                            ++i;
                            break;
                        }
                    }
                }
            }
        }
        if (period > CommonConstants.PERIOD_SEARCH) {// show quick results and tear down all timeouts if they are present
            for (let j in this.tOut) {
                clearTimeout(this.tOut[j]);
            }
            this.tOut = [];
            this.c = 0;
            this.createTable(nJson, this.state.sortedButtons, this.state.selectedRows);
        } else {
            this.tOut[this.c] = setTimeout(function () {
                that.createTable(nJson, that.state.sortedButtons, that.state.selectedRows);
            }, CommonConstants.TIMEOUT_SEARCH);
            this.c++;
        }

        this.setState({
            dataSearch: nJson
        });
        this.lastTimeKeyup = this.nowMillis;
    }

    setHeads() {
        const {sortButtons} = this.state;
        const {columns} = this.settings;
        let sortedCols = [];
        let editableCells = this.settings.struct.editableCells;
        let idx = 0;
        if (editableCells === true && typeof this.props.editor === CommonConstants.UNDEFINED) {
            console.error('You trying to use editable cells without editor settings provided. You have 2 options add an editor settings to get editable cells work correctly or set editableCells to false to work with view mode.');
        }

        if (editableCells === true) {
            sortedCols[idx] = <th key={idx} style={{cursor: "default"}}></th>;
            idx = 1;
        }
        this.props.children.forEach((th, index) => {
            const {data} = th.props;
            if (typeof data !== CommonConstants.UNDEFINED
                && this.visibleCols[data] === true) {
                let thh = React.Children.only(th);
                let clonedOpts = {
                    key: index + idx,
                    sortId: index + '',
                    sortDirection: (typeof sortButtons[data] === CommonConstants.UNDEFINED) ? sortButtons[data] : 0
                };
                clonedOpts['columns'] = columns;
                clonedOpts['key'] = index + idx;
                if (this.searchableCols[data] === true) {
                    clonedOpts['doDiscreteSearch'] = this.doDiscreteSearch.bind(this);
                    clonedOpts['discreteFocus'] = this.discreteFocus.bind(this);
                    clonedOpts['discreteBlur'] = this.discreteBlur.bind(this);
                    clonedOpts['columnsSearch'] = this.state.columnsSearch;
                }
                if (this.sortableCols[data] === true) {
                    clonedOpts['gteSort'] = CommonConstants.SORTABLE;
                    if (typeof sortButtons[data] !== CommonConstants.UNDEFINED) {
                        clonedOpts['updateSort'] = this.setTableSort.bind(this, data);
                        clonedOpts['sortDirection'] = sortButtons[data];
                    }
                }
                sortedCols[index + idx] = React.cloneElement(thh, clonedOpts);
            }
        });
        return sortedCols;
    }

    discreteFocus() {
        this.setState({
            discreteFocus: true
        });
    }

    discreteBlur() {
        this.setState({
            discreteFocus: false
        });
    }

    setLoader(cols) {
        let
            minRow = 0,
            maxRow = 1,
            objectIndex = 1,
            rowId = 1,
            rowsData = <Row
                selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
                minRow={minRow}
                maxRow={maxRow}
                key={objectIndex}
                count={objectIndex}
                gteRowId={rowId}>
                <td colSpan={cols}>
                    <div style={{textAlign: 'center'}}>Loading...</div>
                </td>
            </Row>;
        this.setState({
            dataRows: rowsData
        });
    }

    setSelectedIds() {
        let ids = [], elements = document.querySelectorAll('.active');
        for (let k in elements) {
            if (typeof elements[k].dataset !== CommonConstants.UNDEFINED
                && typeof elements[k].dataset.realid !== CommonConstants.UNDEFINED) {
                ids.push(parseInt(elements[k].dataset.realid));
            }
        }
        this.setState({
            selectedIds: ids,
        });
    }

    addSelectedRows() {
        const {
            selectedRows,
            shiftDown,
            ctrlDown,
            arrowUp,
            arrowDown,
            perPage,
            aDown,
        } = this.state;

        if (shiftDown === true && arrowUp === true && selectedRows.length > 0) {
            let min = Math.min(...selectedRows),
                rows = selectedRows;
            if (min > 0) {
                rows.push(min - 1);
                this.setState({
                    selectedRows: rows,
                }, () => {
                    this.createTable(this.jsonData, this.state.sortedButtons)
                });
                this.setSelectedIds();
            }
        } else if (arrowDown === true && shiftDown === true && selectedRows.length > 0) {
            let max = Math.max(...selectedRows),
                rows = selectedRows;
            if (max < perPage - 1) {
                rows.push(max + 1);
                this.setState({
                    selectedRows: rows,
                }, () => {
                    this.createTable(this.jsonData, this.state.sortedButtons)
                });
                this.setSelectedIds();
            }
        } else if (ctrlDown === true && aDown === true) {
            let rows = [];
            for (let i = 0; i < perPage; ++i) {
                rows[i] = i;
            }
            this.setState({
                selectedRows: rows,
            }, () => {
                this.createTable(this.jsonData, this.state.sortedButtons)
            });
            this.setSelectedIds();
        }
    }

    setPagination() {
        const {
            ctrlDown,
            arrowLeft,
            arrowRight,
            page,
            perPage,
            countRows
        } = this.state;

        // let fromRow = parseInt(fromRow);
        if (ctrlDown === true && arrowLeft === true) {
            if (page === 1) {
                let pages = Math.ceil(countRows / perPage);
                this.setState({
                    fromRow: (pages - 1) * perPage,
                    page: pages,
                    arrowLeft: false
                }, () => {
                    this.createTable(this.jsonData, this.state.sortedButtons)
                });
            } else {
                this.setState({
                    fromRow: (page - 1) * perPage,
                    page: page - 1,
                    arrowLeft: false
                }, () => {
                    this.createTable(this.jsonData, this.state.sortedButtons)
                });
            }
        } else if (ctrlDown === true && arrowRight === true) {
            let pages = Math.ceil(countRows / perPage);
            if (page === pages) {
                this.setState({
                    fromRow: 0,
                    page: 1,
                    arrowRight: false
                }, () => {
                    this.createTable(this.jsonData, this.state.sortedButtons)
                });
            } else {
                this.setState({
                    fromRow: page * perPage,
                    page: page + 1,
                    arrowRight: false
                }, () => {
                    this.createTable(this.jsonData, this.state.sortedButtons)
                });
            }
        }
    }

    handleScroll() {
        const {
            fromRow,
            perPage,
            countRows
        } = this.state;

        if ((fromRow + perPage) >= countRows) {
            return;
        }

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            this.setState({
                fromRow: fromRow + perPage,
                scrolledDown: true
            }, () => {
                this.createTable(this.jsonData, this.state.sortedButtons)
            });
        } else {
            this.setState({
                scrolledDown: false
            });
        }
    }
}

export default Main
