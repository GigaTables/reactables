import React, {Component} from 'react';
import styles from '../../css/styles.css';

class THead extends Component {
    render() {
        const {children} = this.props;
        return (
            <thead className={styles.gt_head}>
            <tr className={styles.gt_head_tr}>
                {children}
            </tr>
            </thead>
        );
    }
}

export default THead