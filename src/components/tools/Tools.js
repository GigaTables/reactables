import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';
import CSVLink from "../form/CSVLink";
import styles from '../../css/styles.css';
import HOCButton from '../form/HOCButton'
import HOCPagesSelector from "./HOCPagesSelector";
import HOCSearch from "./HOCSearch";

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
            tableOpts
        } = this.props;

        if (struct.rowsSelector.indexOf(display) === -1) {
            return '';
        }
        
        return (<HOCPagesSelector
            perPage={perPage}
            updatePerPage={updatePerPage}
            defaultPerPage={defaultPerPage}
            perPageRows={perPageRows}
            theme={tableOpts.theme}
            lang={lang}/>)
    }

    getSearch() {
        const {
            struct,
            display,
            search,
            doSearch,
            lang,
            tableOpts,
            searchBlur,
            searchFocus
        } = this.props;

        if (struct.search.indexOf(display) === -1) {
            return '';
        }
        
        return (<HOCSearch
            search={search}
            doSearch={doSearch}
            searchBlur={searchBlur}
            searchFocus={searchFocus}
            theme={tableOpts.theme}
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
                            key={i}
                            theme={tableOpts.theme}
                        >{language.editor_reload}</Button>;
                        break;
                    case EditorConstants.EDITOR_CREATE:
                            buttons[i] = <HOCButton
                                active={false}
                                action={EditorConstants.ACTION_CREATE}
                                showPopup={showPopup}
                                key={i}
                                incr={i}
                                theme={tableOpts.theme}
                                selectedRows={selectedRows}
                            >{language.editor_create}</HOCButton>;
                        break;
                    case EditorConstants.EDITOR_EDIT:
                        buttons[i] = <HOCButton
                            active={!(selectedRows.length >= 1)}
                            action={EditorConstants.ACTION_EDIT}
                            showPopup={showPopup}
                            key={i}
                            theme={tableOpts.theme}
                            incr={i}
                            selectedRows={selectedRows}
                        >{language.editor_edit}</HOCButton>;
                        break;
                    case EditorConstants.EDITOR_REMOVE:
                        buttons[i] = <HOCButton
                            active={(selectedRows.length === 0)}
                            selectedRows={selectedRows}
                            action={EditorConstants.ACTION_DELETE}
                            showPopup={showPopup}
                            key={i}
                            incr={i}
                            theme={tableOpts.theme}
                        >{language.editor_remove}</HOCButton>;
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
