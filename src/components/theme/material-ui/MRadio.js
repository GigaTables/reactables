import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

const classes = theme => ({
    root: {
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing.unit * 3
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    }
})

class MRadio extends Component {
    render() {
        const {
            attributes,
            type,
            name,
            onChange,
            value, // fieldValue
            objectValues,
            label
        } = this.props
        
        let values = objectValues
        let options = [], val = '',
            // fixme: regexp to remove ex: [3] etc
            id = name.replace('[]', '')
        
        for (let k in values) {
            if (values.hasOwnProperty(k)) {
                for (let key in values[k]) {
                    if (values[k].hasOwnProperty(key)) {
                        val = values[k][key].trim()
                        options[k] =
                            <FormControlLabel
                                key={k}
                                onClick={onChange}
                                {...attributes}
                                id={id}
                                type={type}
                                name={name}
                                control={<Radio color="primary"/>}
                                labelPlacement="end"
                                data-value={val.toLowerCase()}
                                value={key}
                                label={val}
                            />
                    }
                }
            }
        }
        
        return <RadioGroup
            aria-label={label}
            name={name}
            className={classes.group}
            value={value}
            onChange={onChange}
        >
            {options}
        </RadioGroup>
    }
    
}

MRadio.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    value: PropTypes.string
}

export default MRadio