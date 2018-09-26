import React from 'react';
import Select from 'react-select';

class ReactSelect extends React.Component {
    state = {
        selectedOption: null,
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
    };

    render() {
        const {selectedOption} = this.state;
        const {pluginProps} = this.props;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                {...pluginProps}
            />
        );
    }
}

export default ReactSelect