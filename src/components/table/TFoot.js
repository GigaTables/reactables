import React, {Component} from 'react';
import styles from '../../css/styles.css';

class TFoot extends Component {
    render() {
        const {children} = this.props;
        return (
            <tfoot className={styles.gt_foot}>
            <tr>
                {children}
            </tr>
            </tfoot>
        );
    }
}

export default TFoot