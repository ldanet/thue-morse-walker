import React, { Component } from 'react';

export default class FloatInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: props.value,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (<input
            type="number"
            step="any"
            id={this.props.id}
            onBlur={this.props.onChange}
            onChange={this.handleChange}
            value={this.state.value}
        />);
    }
}
