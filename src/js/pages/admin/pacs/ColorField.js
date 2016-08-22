import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

export default class ColorField extends React.Component {
  constructor(props) {
    super(props);

    this.displayColors = this.displayColors.bind(this);

    this.state = {
      colors: [],
      value: this.props.value
    }
  }

  handleColorChange(event) {
    this.props.onChange(event.target.value);
  }

  displayColors() {
    this.setState({
      colors: [{value: '', name: "pick color"}, {value: 'blue', name: "Blue"}, {value: 'red', name: "Red"}]
    });
  }

  componentDidMount() {
    this.displayColors();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      color: nextProps.value
    });
  }

  render () {
    const { colors } = this.state;
    const { color }  = this.state || '';

    const colorList = colors.map((color, i) => {
      return  <option
                value={color.value}
                key={i}>{color.value}
              </option>
    });

    return (
      <div>
        <select
          class="form-control"
          type="select"
          value={color}
          onChange={this.handleColorChange.bind(this)}
          id="pacColor">
          {colorList}
        </select>
      </div>
    )
  }
}
