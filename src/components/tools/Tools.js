import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button.js';
import PagesSelector from './PagesSelector.js';
import Search from './Search.js';
import styles from '../../css/styles.css';

let CommonConstants = require('../CommonConstants');
let EditorConstants = require('../EditorConstants');
let Lang = require('../Lang');

class Tools extends Component {
  getPagesSelection()
  {
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
      lang={lang} />)
  }

  getSearch()
  {
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

  getButtons()
  {
    const {
      selectedRows,
      showPopup,
      lang,
      tableOpts,
      display,
    } = this.props;

    let language = Lang[lang];
    let buttons = [];
    if (typeof tableOpts.buttons !== CommonConstants.UNDEFINED
      && tableOpts.buttons.length > 0
      && tableOpts.buttonsPosition.indexOf(display) !== -1) {
      tableOpts.buttons.map((btn, i) => {
      if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_CREATE) {
        buttons[i] = <Button
          active={false}
          action={EditorConstants.ACTION_CREATE}
          showPopup={showPopup}
          key={i}>{language.editor_create}</Button>;
      }
      if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_EDIT) {
        buttons[i] = <Button
          active={(selectedRows.length >= 1) ? false : true}
          selectedRows={selectedRows}
          action={EditorConstants.ACTION_EDIT}
          showPopup={showPopup}
          key={i}>{language.editor_edit}</Button>;
      }
      if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_REMOVE) {
        buttons[i] = <Button
          active={(selectedRows.length === 0) ? true : false}
          selectedRows={selectedRows}
          action={EditorConstants.ACTION_DELETE}
          showPopup={showPopup}
          key={i}>{language.editor_remove}</Button>;
      }
      });
    }
    return buttons;
  }

  render()
  {
    const {
      selectedRows,
      showPopup,
      lang,
      tableOpts,
    } = this.props;

    let language = Lang[lang];
    let buttons = [];
    if (typeof tableOpts.buttons !== CommonConstants.UNDEFINED) {
      tableOpts.buttons.map((btn, i) => {
      if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_CREATE) {
        buttons[i] = <Button
          active={false}
          action={EditorConstants.ACTION_CREATE}
          showPopup={showPopup}
          key={i}>{language.editor_create}</Button>;
      }
      if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_EDIT) {
        buttons[i] = <Button
          active={(selectedRows.length === 1) ? false : true}
          selectedRows={selectedRows}
          action={EditorConstants.ACTION_EDIT}
          showPopup={showPopup}
          key={i}>{language.editor_edit}</Button>;
      }
      if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_REMOVE) {
        buttons[i] = <Button
          active={(selectedRows.length === 0) ? true : false}
          selectedRows={selectedRows}
          action={EditorConstants.ACTION_DELETE}
          showPopup={showPopup}
          key={i}>{language.editor_remove}</Button>;
      }
      });
    }
    return (
      <div className="gt_head_tools">
        {this.getButtons()}
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
