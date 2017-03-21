import React from 'react'
import classNames from 'classnames/bind';
import styles from '../css/styles.css'

var CommonConstants = require('./CommonConstants');

class Header extends React.Component {

  constructor(props)
  {
    super(props);
    this.isDiscreteSearch = false;
  }

  getHeaderContent()
  {
    const {
      children,
      columns,
      data,
      sortId,
      doDiscreteSearch,
      columnsSearch
    } = this.props;

    if (this.isDiscreteSearch === true) {
      let val = '';
      if (columnsSearch[data] !== CommonConstants.UNDEFINED) {
        val = columnsSearch[data];
      }
      return (
        <div className={styles.gt_th_box}>
          <input
            data-index={data}
            name={data}
            onKeyUp={doDiscreteSearch}
            onChange={doDiscreteSearch}
            placeholder={columns[sortId].discreteSearchValue(data)}
            value={val} />
        </div>
      );
    }
    return <div className={styles.gt_th_box}>{children}</div>;
  }

  render() {
    const {
      sortDirection,
      gteSort,
      sortId,
      updateSort,
      columns
    } = this.props;

    if (typeof columns[sortId].discreteSearch !== CommonConstants.UNDEFINED
      && columns[sortId].discreteSearch === true) {
        this.isDiscreteSearch = true;
    }

    let sorting = gteSort === CommonConstants.SORTABLE,
    // 0 - default data-direction, 1 - asc, -1 - desc
    desc = (sortDirection === -1) ? true : false,
    asc = (sortDirection === 1) ? true : false;
    let thClasses = classNames({
      // gt_head_tr_th: true,
      sorting: sorting ? true : false,
      sorting_desc: desc,
      sorting_asc: asc
    });
    return (
      <th onClick={(this.isDiscreteSearch === false) ? updateSort : false} className={thClasses} data-sortindex={sortId}
      data-direction={sortDirection}
      style={(sorting) ? {cursor:"pointer"} : {cursor:"default"}}>
        {this.getHeaderContent()}
      </th>
    )
  }
}

export default Header
