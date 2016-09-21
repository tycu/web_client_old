import React from 'react';
import RichTextEditor, { createValueFromString } from 'react-rte';

export default class DraftJsStatefulEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      value: ''
    }
  }

  static propTypes = {
    onChange: React.PropTypes.func
  };

  onChange(value) {
    // console.log(value.toString('markdown'));
    this.setState({
      value
    });
  };

  handleBlur(){
    this.props.onChange(this.state.value.toString('markdown'), true);
    // other option is: 'html'
  }

  componentWillMount() {
    this.setState({
      value: RichTextEditor.createEmptyValue()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const that = this;

    if ((typeof this.state.value !== typeof nextProps.value)) {
      that.setState({
        value: createValueFromString(nextProps.value, 'markdown')
      })
      return true;
    }
    return false;
  }


  render () {

    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        placeholder="Edit article here"
      />
    );
  }
}
