import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';
import PagesSelector from './PagesSelector';
import Search from './Search';
import CSVLink from "../form/CSVLink";
import styles from '../../css/styles.css';

let CommonConstants = require('../CommonConstants');
let EditorConstants = require('../EditorConstants');
let Lang = require('../Lang');

class Tools extends Component {
    getPagesSelection() {
        const {
            struct,
            display,
            defaultPerPage,
            perPage,
            updatePerPage,
            perPageRows,
            lang,
        } = this.props;

        if (struct.rowsSelector.indexOf(display) === -1) {
            return '';
        }
        return (<PagesSelector
            perPage={perPage}
            updatePerPage={updatePerPage}
            defaultPerPage={defaultPerPage}
            perPageRows={perPageRows}
            lang={lang}/>)
    }

    getSearch() {
        const {
            struct,
            display,
            search,
            doSearch,
            lang,
        } = this.props;

        if (struct.search.indexOf(display) === -1) {
            return '';
        }
        return (<Search
            search={search}
            doSearch={doSearch}
            lang={lang}/>)
    }

    getButtons() {
        const {
            selectedRows,
            showPopup,
            lang,
            tableOpts,
            display,
            jsonData,
            struct,
        } = this.props;

        let language = Lang[lang];
        let buttons = [];
        if (typeof tableOpts.buttons !== CommonConstants.UNDEFINED
            && tableOpts.buttons.length > 0
            && tableOpts.buttonsPosition.indexOf(display) !== -1) {
            tableOpts.buttons.map((btn, i) => {
                switch (btn[EditorConstants.EXTENDED]) {
                    case EditorConstants.EDITOR_CSV:
                       if (jsonData !== CommonConstants.UNDEFINED
                           && typeof struct.download !== CommonConstants.UNDEFINED && struct.download.csv === true) {
                           buttons[ i ] = <CSVLink
                               active={false}
                               jsonData={jsonData}
                               key={i}>{language.editor_csv}</CSVLink>;
                       }
                        break;
                    case EditorConstants.EDITOR_RELOAD:
                        buttons[i] = <Button
                            active={false}
                            action={EditorConstants.ACTION_RELOAD}
                            showPopup={showPopup}
                            isReload={true}
                            key={i}>{language.editor_reload}</Button>;
                        break;
                    case EditorConstants.EDITOR_CREATE:
                        buttons[i] = <Button
                            active={false}
                            action={EditorConstants.ACTION_CREATE}
                            showPopup={showPopup}
                            key={i}>{language.editor_create}</Button>;
                        break;
                    case EditorConstants.EDITOR_EDIT:
                        buttons[i] = <Button
                            active={!(selectedRows.length >= 1)}
                            selectedRows={selectedRows}
                            action={EditorConstants.ACTION_EDIT}
                            showPopup={showPopup}
                            key={i}>{language.editor_edit}</Button>;
                        break;
                    case EditorConstants.EDITOR_REMOVE:
                        buttons[i] = <Button
                            active={(selectedRows.length === 0)}
                            selectedRows={selectedRows}
                            action={EditorConstants.ACTION_DELETE}
                            showPopup={showPopup}
                            key={i}>{language.editor_remove}</Button>;
                        break;
                }
            });
        }
        return buttons;
    }

    render() {
        const {
            isData,
        } = this.props;
        return (
            <div className="gt_head_tools">
                {(isData) ? '' : this.getButtons()}
                {this.getPagesSelection()}
                {this.getSearch()}
                <div className={styles.clear}></div>
            </div>
        )
    }
}

Tools.propTypes = {
    updatePerPage: PropTypes.func.isRequired,
    perPageRows: PropTypes.array,
    doSearch: PropTypes.func,
    tableOpts: PropTypes.object,
    showPopup: PropTypes.func,
    defaultPerPage: PropTypes.number,
    perPage: PropTypes.number,
    search: PropTypes.string,
    selectedRows: PropTypes.array,
    lang: PropTypes.string,
};

export default Tools
