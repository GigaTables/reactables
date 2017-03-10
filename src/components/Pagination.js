import React from 'react'
import classNames from 'classnames/bind';
import styles from '../css/styles.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class Pagination extends React.Component {
  render()
  {
    var lang = Lang[this.props.lang];
    let prevClasses = classNames({
      gt_page: true,
      prev: true
    });
    let nextClasses = classNames({
      gt_page: true,
      next: true
    });

    let countRows = this.props.countRows,
    page = this.props.page,
    perPage = this.props.perPage,
    pages = Math.ceil(countRows / perPage),
    more = 5;

    let pagesContent = [];
    for (var i=0;i<pages;++i) {
      let currentPage = i+1;
      let pageClasses = classNames({
        gt_page: true,
        selected: (currentPage === page)?true:false
      });
      pagesContent[i] = <div key={i} onClick={this.props.updatePagination}
      data-from={i*perPage} className={pageClasses}>{currentPage}</div>;
    }

    let prev = (page === 1) ? perPage * (pages - 1) : perPage * (page - 2),
    next = (page === pages) ? 0 : perPage * (page);

    let from = parseInt(this.props.fromRow);
    let description = lang.showing + ' ' + (from + 1) + ' '
    + lang.to + ' ' + (page * perPage) + ' ' + lang.of  + ' ' + countRows + ' ' + lang.entries + '.';
    return (
      <div className={styles.gt_pagination}>
        <div className={styles.gt_pgn_ttl}>{description}</div>
        <div className={styles.gt_pgn_pages}>
          <div className={styles.gt_pagn}>
            <div data-from={prev} onClick={this.props.updatePagination} className={prevClasses}>{lang.prev}</div>
            {pagesContent}
            <div data-from={next} onClick={this.props.updatePagination} className={nextClasses}>{lang.next}</div>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Pagination
