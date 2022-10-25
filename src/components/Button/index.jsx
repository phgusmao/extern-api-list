import { Component } from 'react';

import './styles.css'

export class Button extends Component {

  render() {
    const { text, onClick, disabled } = this.props
    return (
      <button disabled={disabled} className='button' onClick={onClick}>
        {text}
      </button>
    );
  }
}