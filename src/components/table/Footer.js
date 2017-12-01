import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

class Footer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {
            children,
            gteRowId,
        } = this.props;

        let rowClasses = classNames({
            footer: true,
        });
        return (
            <tr
                key={gteRowId}
                className={rowClasses}
            >{children}</tr>
        )
    }
}

Footer.defaultProps = {
    gteRowId: -1,
};

Footer.propTypes = {
    gteRowId: PropTypes.number.isRequired,
};

export default Footer
