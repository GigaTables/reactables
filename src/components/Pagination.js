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

    let from = parseInt(this.props.fromRow);
    let countRows = this.props.countRows,
    page = this.props.page,
    perPage = this.props.perPage,
    pages = Math.ceil(countRows / perPage),
    selectedPage = from / perPage + 1,
    tail = parseInt(pages) - CommonConstants.MORE_PAGES;

    let pagesContent = [];
    for (var p = 0;p < pages;++p) {
      let currentPage = p + 1, prevPage = p - 1, nextPage = p + 1;
      let pageClasses = classNames({
        gt_page: true,
        selected: (currentPage === page) ? true : false
      });
      if (p > CommonConstants.MORE_PAGES) {
          if (selectedPage < CommonConstants.MORE_PAGES) { // head
              pagesContent[p] = <div class="gt_page_dots">...</div>;
              pagesContent[p+1] = <div key={p} onClick={this.props.updatePagination}
                data-from={p*perPage} className={pageClasses}>{currentPage}</div>;
              break;
          } else if (selectedPage >= CommonConstants.MORE_PAGES && selectedPage <= pages - CommonConstants.MORE_PAGES) { //middle
              prevPage = selectedPage - 1;
              nextPage = selectedPage + 1;
              prevFrom = (selectedPage - 2) * amount;
              nextFrom = (selectedPage) * amount;

              pagesContent[p] = <div><div data-from="0" class="gt_page">1</div><div class="gt_page_dots">...</div>
              <div data-from={prevFrom} class="gt_page">{selectedPage - 1}</div>
              <div data-from={(selectedPage - 1) * amount} class={pageClasses}>{selectedPage}</div>
              <div data-from={nextFrom} class="gt_page">{selectedPage + 1}</div><div class="gt_page_dots">...</div>
              <div data-from={(pages - 1) * amount} class="gt_page">{pages}</div></div>;
              break;
          } else if (selectedPage > tail) { // tail
              let innerPages = [];
              for (var i = tail - 1; i < pages; ++i) {
                  let from = i * amount;
                  var prevPage = i - 1, nextPage = i + 1;
                  if (selectedPage === nextPage) {
                      prevFrom = prevPage * amount;
                      if (prevPage < 0) {
                          prevFrom = (pages - 1) * amount;
                      }
                      nextFrom = nextPage * amount;
                      if (nextPage === pages) {
                          nextFrom = 0;
                      }
                      pageClasses = classNames({
                        gt_page: true,
                        selected: true
                      });
                  }

                  innerPages[i] = <div data-from={from} class={pageClasses}>{i + 1}</div>;
                  pageClasses = classNames({
                    gt_page: true,
                    selected: false
                  });
              }
              pagesContent[p] = <div><div data-from="0" class="gt_page">1</div><div class="gt_page_dots">...</div>{innerPages}</div>;
              break;
          }
        } else {
          pagesContent[p] = <div key={p} onClick={this.props.updatePagination}
            data-from={p*perPage} className={pageClasses}>{currentPage}</div>;
        }
    }

    let prev = (page === 1) ? perPage * (pages - 1) : perPage * (page - 2),
    next = (page === pages) ? 0 : perPage * (page);

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
