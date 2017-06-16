import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import onClickOutside from 'react-onclickoutside';
import styles from './colorPicker.css';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.state = {
            display: false,
        };
    }

    handleClickOutside() {
        this.setState({ display: false });
    }

    toggleDisplay() {
        this.setState((state) => {
            const newState = Object.assign({}, state);
            newState.display = !state.display;
            return newState;
        });
    }

    render() {
        // Protect prop from direct modifications by big bad color picker
        const color = Object.assign({}, this.props.color);
        const colorStyle = {
            background: `hsl(${color.h},${color.s * 100}%,${color.l * 100}%)`,
        };
        return (<div className={styles.picker}>
            <button
                style={colorStyle}
                onClick={e => this.toggleDisplay(e)}
            />
            {this.state.display &&
                <div className={styles.panel}>
                    <SketchPicker
                        color={color}
                        onChangeComplete={e => this.props.handleColorChange(this.props.index, e)}
                    />
                </div>
            }
        </div>);
    }
}

export default onClickOutside(ColorPicker);
