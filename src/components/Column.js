import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const CommonConstants = require('./CommonConstants');
const EditorConstants = require('./EditorConstants');

class Column extends Component {
    shouldComponentUpdate(nextProps) {
        const {
            gteRowId,
            count,
            selectedRows,
            dataIndex,
            editableCells,
        } = this.props;
        return editableCells === true
            || gteRowId !== nextProps.gteRowId
            || count !== nextProps.count
            || selectedRows.length !== nextProps.selectedRows.length
            || dataIndex !== nextProps.dataIndex;
    }

    constructor(props) {
        super(props);
        this.state = {
            dataIndices: {},
            cellValue: props.children,
        };
        this.cell = props.cell;
    }

    componentDidUpdate() {
        if (typeof this.dataIn !== CommonConstants.UNDEFINED && this.dataIn !== null) {
            this.dataIn.focus();
        }
    }

    changeCell(e) {
        this.setState({
            dataIndices: Object.assign({}, this.state.dataIndices, {
                [e.target.dataset.index]: e.target.value
            }),
            cellValue: e.target.value,
        })
    }

    btnClickedEnter(e) {
        e.persist(); // this is to avoid null values in this.props.editorUpdate(e, dataResp) call
        const {editorUpdate, editor} = this.props;
        const {dataIndices} = this.state;
        let ajaxUrl = editor.ajax;
        let dataResp = dataIndices;
        if (e.keyCode === CommonConstants.ENTER_KEY) {
            // fill-in id
            let payload = Object.assign({}, dataIndices, {
                ['id']: parseInt(e.target.dataset.realid)
            });
            fetch(ajaxUrl, {
                method: EditorConstants.HTTP_METHOD_PUT,
                body: JSON.stringify(payload)
            }).then(response => response.json()).then((data) => {
                editorUpdate(e, dataResp);
            });
            // close cell
            this.cell = 0;
        }
    }

    getColumn() {
        const {
            gteRowId,
            count,
            selectedRows,
            dataIndex,
            cell, // string uid of this cell - 00, 01, 11, 12
            editableCells, // bool if cells are editable
            editedCell, // uid of edited
            editCell, // function
            editRow, // function
            minRow,
            maxRow,
            children,
        } = this.props;
        const {
            cellValue,
        } = this.state;

        if (editableCells === true && dataIndex === EditorConstants.EDITABLE_CELLS_INDEX) {
            let cellClasses = classNames({
                normal_checkbox: true,
                select_checkbox: (selectedRows.indexOf(count) !== -1) ? true : false
            });
            return (
                <td
                    key={gteRowId}
                    data-rowid={count}
                    data-realid={gteRowId}
                    data-selectedrows={selectedRows}
                    data-index={dataIndex}
                    data-minrow={minRow}
                    data-maxrow={maxRow}
                >
                    <div
                        onClick={editRow}
                        className={cellClasses}
                        key={gteRowId}
                        data-rowid={count}
                        data-realid={gteRowId}
                        data-selectedrows={selectedRows}
                        data-index={dataIndex}
                        data-minrow={minRow}
                        data-maxrow={maxRow}></div>
                </td>
            )
        }
        return (
            <td
                key={gteRowId}
                data-rowid={count}
                data-realid={gteRowId}
                data-selectedrows={selectedRows}
                data-index={dataIndex}
                data-cell={cell}
                onClick={editCell}>
                {(editedCell === this.cell) ?
                    <input
                        ref={(input) => {
                            this.dataIn = input;
                        }}
                        id="edit_cell"
                        type={EditorConstants.TYPE_TEXT}
                        value={cellValue}
                        data-realid={gteRowId}
                        data-index={dataIndex}
                        data-cell={cell}
                        data-action="edit"
                        data-rowid={count}
                        onClick={editCell}
                        onKeyUp={this.btnClickedEnter.bind(this)}
                        onChange={(e) => {
                            this.changeCell(e)
                        }}/> : children}
            </td>
        )
    }

    render() {
        return this.getColumn();
    }
}

Column.propTypes = {
    editableCells: PropTypes.bool,
    gteRowId: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    selectedRows: PropTypes.array,
    dataIndex: PropTypes.string,
    editor: PropTypes.object,
    editorUpdate: PropTypes.func,
};

export default Column
