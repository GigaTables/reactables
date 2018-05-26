import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import '../../css/styles.css';

const CommonConstants = require('../CommonConstants');

class ProgressBar extends Component {
    render() {
        const {
            percent,
            height,
            showPercent,
        } = this.props;

        let barClasses = classNames({
            progress_bar: true,
            progress_bar_color_red: (percent > 0 && percent < 20),
            progress_bar_color_orange: (percent >= 20 && percent < 40),
            progress_bar_color_yellow: (percent >= 40 && percent < 60),
            progress_bar_color_light_green: (percent >= 60 && percent < 80),
            progress_bar_color_green: (percent >= 80),
            progress_bar_none: (percent === null || percent === CommonConstants.UNDEFINED),
        });
        let st = {
            height: (typeof height === CommonConstants.UNDEFINED) ? 10 : height,
            width: ((percent > 100) ? 100 : percent) + '%',
        };
        let percentStr = (((percent === null) ? 0 : ((percent > 100) ? 100 : percent)) + '%');
        return (
            <div className="progress_bar_container">
                <div data-percent={percent} style={st} className={barClasses}>
                    <div className="progress_bar_percent">
                        <div className="progress_bar_percent_child">
                            {(showPercent === true) ? percentStr : '&nbsp;'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProgressBar.defaultProps = {
    height: 10,
    percent: 0,
    showPercent: true,
};

ProgressBar.propTypes = {
    percent: PropTypes.any,
    height: PropTypes.number,
};

export default ProgressBar