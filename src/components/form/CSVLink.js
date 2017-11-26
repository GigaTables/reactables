import React, {Component} from 'react';
import styles from '../../css/styles.css';
import classNames from 'classnames/bind';
let CommonConstants = require('../CommonConstants');

class CSVLink extends Component {
    objectToCSVRow(dataObject) {
        let dataArray = [];
        for (let o in dataObject) {
            if (dataObject.hasOwnProperty(o)) {
                let innerValue = dataObject[o] === null ? '' : dataObject[o].toString();
                let result = innerValue.replace(/"/g, '""');
                result = '"' + result + '"';
                dataArray.push(result);
            }
        }
        return dataArray.join(' ') + CommonConstants.NEW_LINE;
    }

    onClick(jsonData) {
        if (typeof jsonData === CommonConstants.UNDEFINED || !jsonData.length) {
            return;
        }
        let date = new Date();
        let dateFormat = date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds();
        let csvContent = '';
        // headers
        csvContent += this.objectToCSVRow(Object.keys(jsonData[0]));
        jsonData.forEach((item) => {
            csvContent += this.objectToCSVRow(item);
        });
        let blob = new Blob([csvContent], {type: CommonConstants.CSV_HEADER});
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            // let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
            link.setAttribute("href", URL.createObjectURL(blob));
            link.setAttribute("download", "GigaTables_" + dateFormat + ".csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    render() {
        const {children, active, jsonData} = this.props;
        let buttonClasses = classNames({
            gte_button: true,
            gte_btn_disabled: active
        });
        return (
            <div
                className="gte_buttons_container"
                onClick={(active === false) ? this.onClick.bind(this, jsonData) : undefined}>
                <div className={buttonClasses}>
                    <span>{children}</span>
                </div>
                <div className={styles.clear}></div>
            </div>
        )
    }
}

export default CSVLink