import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../css/styles.css';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames/bind';

const Lang = require('../../Lang');

const classes = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        float: right,
        marginTop: -5,
    },
    dense: {
        marginTop: -5,
    },
    menu: {
        width: 200,
    },
});

class MSearch extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            search: ''
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.search !== nextProps.search;
    }

    handleChange(name, event) {
        const {doSearch} = this.props;

        doSearch(event);
        this.setState({
            [name]: event.target.value,
        });
    };

    render()
    {
        const {
            lang,
            search,
            searchBlur,
            searchFocus,
        } = this.props;

        const language = Lang[lang];

        return <div className={classNames(styles.gt_main_search, classes.dense)}>
            <TextField
                variant="standard"
                value={search}
                onChange={(e) => {this.handleChange('search', e)}}
                onFocus={searchFocus}
                onBlur={searchBlur}
                id="standard-search"
                label={language.search}
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                name="search"
            />
            <div className={styles.clear}>&nbsp;</div>
        </div>;
    }
}

MSearch.propTypes = {
    lang: PropTypes.string.isRequired,
    doSearch: PropTypes.func.isRequired,
    search: PropTypes.string,
};

export default MSearch
