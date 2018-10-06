import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/es/Select/Select'

const CommonConstants = require('../../CommonConstants');
const EditorConstants = require('../../EditorConstants');

class MSelect extends Component {
    render() {
        const {
            attributes,
            id,
            name,
            value,
            onChange,
            objectValues
        } = this.props;

        let values = objectValues;
        let options = [], val = '';
        let optionAttributes = [];

        for (let k in values) {
            if (values.hasOwnProperty(k)) {
                for (let key in values[k]) {
                    if (values[k].hasOwnProperty(key)) {
                        if (key !== EditorConstants.ATTRIBUTES) {

                            if (typeof values[k][EditorConstants.ATTRIBUTES] !== CommonConstants.UNDEFINED) {
                                optionAttributes = values[k][EditorConstants.ATTRIBUTES];
                            }

                            val = values[k][key].trim();
                            options[k] = <option {...optionAttributes} key={key} value={key} data-value={val.toLowerCase()}>{val}</option>
                            optionAttributes = [];
                        }
                    }
                }
            }
        }

        return (<Select
                native
                {...attributes}
                value={value}
                onChange={onChange}
                inputProps={{
                    name: name,
                        id: id
                }}>
            {options}
            </Select>
        )
    }
}

MSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    value: PropTypes.string
};

export default MSelect