import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../../css/styles.css';

const CommonConstants = require('../CommonConstants');
const Lang = require('../Lang');

class Pagination extends Component {
  shouldComponentUpdate(nextProps)
  {
    return this.props.countRows !== nextProps.countRows
      || this.props.page !== nextProps.page
      || this.props.perPage !== nextProps.perPage
      || this.props.fromRow !== nextProps.fromRow;
  }

  render()
  {
    const {
      fromRow,
      countRows,
      page,
      perPage,
    } = this.props;
    let lang = Lang[this.props.lang];
    let prevClasses = classNames({
      gt_page: true,
      prev: true
    });
    let nextClasses = classNames({
      gt_page: true,
      next: true
    });

    let from = parseInt(fromRow);
    let pages = Math.ceil(countRows / perPage),
    selectedPage = from / perPage + 1,
    tail = parseInt(pages) - CommonConstants.MORE_PAGES,
    prevFrom = 0, nextFrom = 0;

    let pagesContent = [];
    for (let p = 0;p < pages;++p) {
      let currentPage = p + 1, prevPage = p - 1, nextPage = p + 1;
      let pageClasses = classNames({
        gt_page: true,
        selected: (currentPage === page) ? true : false
      });
      if (p > CommonConstants.MORE_PAGES) {
          if (selectedPage < CommonConstants.MORE_PAGES) { // head
              pagesContent[p] = <span key={p}><div className="gt_page_dots">...</div><div key={p+1} onClick={this.props.updatePagination}
                data-from={(pages-1) * perPage} className={pageClasses}>{pages}</div></span>;
              break;
          } else if (selectedPage >= CommonConstants.MORE_PAGES && selectedPage <= pages - CommonConstants.MORE_PAGES) { //middle
              prevPage = selectedPage - 1;
              nextPage = selectedPage + 1;
              prevFrom = (selectedPage - 2) * perPage;
              nextFrom = (selectedPage) * perPage;

              let midClasses = classNames({
                gt_page: true,
                selected: (selectedPage === page) ? true : false
              });
              pagesContent[p] = <span key={p}><div data-from="0" onClick={this.props.updatePagination} className="gt_page">1</div>
              <div className="gt_page_dots">...</div>
              <div data-from={prevFrom} onClick={this.props.updatePagination} className="gt_page">{selectedPage - 1}</div>
              <div data-from={(selectedPage - 1) * perPage} onClick={this.props.updatePagination} className={midClasses}>{selectedPage}</div>
              <div data-from={nextFrom} onClick={this.props.updatePagination} className="gt_page">{selectedPage + 1}</div>
              <div className="gt_page_dots">...</div>
              <div data-from={(pages - 1) * perPage} onClick={this.props.updatePagination} className="gt_page">{pages}</div></span>;
              break;
          } else if (selectedPage > tail) { // tail
              let innerPages = [];
              for (let i = tail - 1; i < pages; ++i) {
                  let from = i * perPage;
                  let prevPage = i - 1, nextPage = i + 1;
                  if (selectedPage === nextPage) {
                      prevFrom = prevPage * perPage;
                      if (prevPage < 0) {
                          prevFrom = (pages - 1) * perPage;
                      }
                      nextFrom = nextPage * perPage;
                      if (nextPage === pages) {
                          nextFrom = 0;
                      }
                  }
                  pageClasses = classNames({
                    gt_page: true,
                    selected: ((i + 1) === page) ? true : false
                  });
                  innerPages[i] = <div key={i} onClick={this.props.updatePagination} data-from={from} className={pageClasses}>{(i + 1)}</div>;
              }
              pagesContent[p] = <span key={p}><div data-from="0" onClick={this.props.updatePagination}
              className="gt_page">1</div><div className="gt_page_dots">...</div>{innerPages}</span>;
              break;
          }
        } else {
          if (selectedPage < CommonConstants.MORE_PAGES || ((selectedPage >= CommonConstants.MORE_PAGES) && tail === 1)) {
            pagesContent[p] = <div key={p} onClick={this.props.updatePagination}
              data-from={p*perPage} className={pageClasses}>{currentPage}</div>;
          }
        }
    }

    if (pages > 0 && pagesContent.length === 0) { // bug-fix with CommonConstants.MORE_PAGES === pages
      for (let p = 0;p < pages;++p) {
        let currentPage = p + 1, prevPage = p - 1, nextPage = p + 1;
        let pageClasses = classNames({
          gt_page: true,
          selected: (currentPage === page) ? true : false
        });
        pagesContent[p] = <div key={p} onClick={this.props.updatePagination}
          data-from={p*perPage} className={pageClasses}>{currentPage}</div>;
      }
    }

    let prev = (page === 1) ? perPage * (pages - 1) : perPage * (page - 2),
    next = (page === pages) ? 0 : perPage * (page);

    let showFrom = countRows === 0 ? 0 : (from + 1);
    let showTo = page * perPage;
    let description = lang.showing + ' ' + showFrom + ' '
    + lang.to + ' ' + (showTo > countRows ? countRows : showTo) + ' ' + lang.of  + ' ' + countRows + ' ' + lang.entries + '.';
    if (countRows === 0) {
        description = lang.no_entries;
    }
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

Pagination.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  countRows: PropTypes.number,
  fromRow: PropTypes.number
};

export default Pagination
