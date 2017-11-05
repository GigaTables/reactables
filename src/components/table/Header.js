import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../../css/styles.css';

const CommonConstants = require('../CommonConstants');

class Header extends Component {
    constructor(props) {
        super(props);
        this.isDiscreteSearch = false;
    }

    shouldComponentUpdate(nextProps) {
        return this.props.sortId !== nextProps.sortId
            || this.props.columns[this.props.sortId] !== nextProps.columns[this.props.sortId]
            || this.props.sortDirection !== nextProps.sortDirection
            || this.props.columnsSearch !== nextProps.columnsSearch;
    }

    getHeaderContent() {
        const {
            children,
            columns,
            data,
            sortId,
            doDiscreteSearch,
            columnsSearch,
            discreteFocus,
            discreteBlur
        } = this.props;

        if (this.isDiscreteSearch === true) {
            let val = '', placeholder = data;
            if (typeof columnsSearch[data] !== CommonConstants.UNDEFINED) {
                val = columnsSearch[data];
            }
            if (typeof columns[sortId][CommonConstants.DISCRETE_SEARCH_VALUE] !== CommonConstants.UNDEFINED
                && typeof columns[sortId][CommonConstants.DISCRETE_SEARCH_VALUE] === CommonConstants.FUNCTION) { // custom column
                placeholder = columns[sortId].discreteSearchValue(data);
            }
            return (
                <div className={styles.gt_th_box}>
                    <input
                        data-index={data}
                        name={data}
                        onFocus={discreteFocus}
                        onBlur={discreteBlur}
                        onKeyUp={doDiscreteSearch}
                        onChange={doDiscreteSearch}
                        placeholder={placeholder}
                        value={val}/>
                </div>
            );
        }
        return <div className={styles.gt_th_box}>{children}</div>;
    }

    getHeader() {
        const {
            sortDirection,
            gteSort,
            sortId,
            updateSort,
            columns,
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
            <th onClick={updateSort} className={thClasses} data-sortindex={sortId}
                data-direction={sortDirection}
                style={(sorting) ? {cursor: "pointer"} : {cursor: "default"}}>
                {this.getHeaderContent()}
            </th>
        )
    }

    render() {
        return this.getHeader();
    }
}

Header.propTypes = {
    sortId: PropTypes.string,
    columns: PropTypes.array,
    sortDirection: PropTypes.number,
    columnsSearch: PropTypes.object,
};

export default Header
