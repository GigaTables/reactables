import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import styles from '../../../css/styles.css';

const Lang = require('../../Lang');

class MPagesSelector extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.perPageRows !== nextProps.perPageRows
            || this.props.perPage !== nextProps.perPage;
    }

    render() {
        const {
            lang,
            perPageRows,
            perPage,
            updatePerPage
        } = this.props;

        let language = Lang[lang];

        return (
            <div className={styles.gt_rows_selector}>
                <span>{language.show}&nbsp;</span>
                <span>
                    <Select
                        native
                        value={perPage}
                        onChange={updatePerPage}
                        inputProps={{
                            name: 'pages-selector',
                            id: 'pages-selector'
                        }}>
                        {
                            perPageRows.map((rows, index) => {
                                return <option value={rows} key={index}>{rows}</option>;
                            })
                        }
                    </Select>
                </span>
                <span>&nbsp;{language.entries}</span>
            </div>
        )
    }
}

MPagesSelector.propTypes = {
    lang: PropTypes.string,
    perPage: PropTypes.number,
    perPageRows: PropTypes.array,
    updatePerPage: PropTypes.func
};

export default withStyles(styles)(MPagesSelector);
