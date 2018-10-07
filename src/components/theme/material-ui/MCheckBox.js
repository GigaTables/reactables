import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/es/Checkbox/Checkbox'
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel'

class MCheckBox extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.presetDefaults(props);
    }

    presetDefaults(props) {
        const {
            value,
            objectValues,
        } = props;

        let values = objectValues;
        let options = [], val = '',
            // fixme: regexp to remove ex: [3] etc
            id = name.replace('[]', '');

        for (let k in values) {
            if (values.hasOwnProperty(k)) {
                for (let key in values[k]) {
                    if (values[k].hasOwnProperty(key)) {
                        val = values[k][key].trim();
                        this.state[key] = val === value
                    }
                }
            }
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.value]: e.target.checked
        });

        this.props.onChange(e);
    }

    render() {
        const {
            attributes,
            name,
            // onChange,
            objectValues,
            type,
        } = this.props;

        let values = objectValues;
        let options = [], val = '',
            // fixme: regexp to remove ex: [3] etc
            id = name.replace('[]', '');

        for (let k in values) {
            if (values.hasOwnProperty(k)) {
                for (let key in values[k]) {
                    if (values[k].hasOwnProperty(key)) {
                        val = values[k][key].trim();
                        options[k] =
                            <FormControlLabel
                                id={id}
                                key={k}
                                {...attributes}
                                control={
                                    <Checkbox checked={this.state[key]}
                                              onChange={(e) => {
                                                  this.handleChange(e)
                                              }}
                                              name={name}
                                              value={key}
                                              type={type}
                                    />
                                }
                                label={val}
                                labelPlacement="end"
                            />;
                    }
                }
            }
        }

        return options
    }

}

MCheckBox.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    // value: PropTypes.string
};

export default MCheckBox