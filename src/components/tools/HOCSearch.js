import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from "./Search";
import MSearch from "../theme/material-ui/MSearch";

const CommonConstants = require('../CommonConstants');

class HOCSearch extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.search !== nextProps.search;
    }

    render()
    {
        const {
            lang,
            doSearch,
            search,
            theme,
            searchBlur,
            searchFocus,
        } = this.props;

        return (theme === CommonConstants.THEME_MATERIAL_UI) ?
        <MSearch
            search={search}
            doSearch={doSearch}
            searchBlur={searchBlur}
            searchFocus={searchFocus}
            lang={lang}
        /> : <Search
                search={search}
                doSearch={doSearch}
                searchBlur={searchBlur}
                searchFocus={searchFocus}
                lang={lang}/>
    }
}

Search.propTypes = {
    lang: PropTypes.string.isRequired,
    doSearch: PropTypes.func.isRequired,
    search: PropTypes.string,
};

export default HOCSearch
