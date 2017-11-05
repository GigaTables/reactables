import React, {Component} from 'react';
import styles from '../../css/styles.css';
import onClickOutside from 'react-onclickoutside'

class TBody extends Component {
    /**
     * @uses handleClickOutside
     */
    handleClickOutside() {
        const {
            struct,
            rerenderTable,
        } = this.props;
        if (struct.editableCells === true) {
            rerenderTable();
        }
    }

    render() {
        const {children} = this.props;
        return (
            <tbody className={styles.gt_body}>
            {children}
            </tbody>
        );
    }
}

export default onClickOutside(TBody)