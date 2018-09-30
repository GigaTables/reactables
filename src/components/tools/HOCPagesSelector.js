import React, {Component} from 'react';
import MPagesSelector from "../theme/material-ui/MPagesSelector";
import PagesSelector from "./PagesSelector";

const CommonConstants = require('../CommonConstants');

class HOCPagesSelector extends Component {
    render() {
        const {
            lang,
            perPageRows,
            perPage,
            updatePerPage,
            theme,
            defaultPerPage
        } = this.props;

        return (theme === CommonConstants.THEME_MATERIAL_UI) ? <MPagesSelector
            perPage={perPage}
            updatePerPage={updatePerPage}
            defaultPerPage={defaultPerPage}
            perPageRows={perPageRows}
            lang={lang}/> : <PagesSelector
            perPage={perPage}
            updatePerPage={updatePerPage}
            defaultPerPage={defaultPerPage}
            perPageRows={perPageRows}
            lang={lang}/>
    }
}

export default HOCPagesSelector