import { Component, Children } from 'react'
import PropTypes from 'prop-types'

export function contextProvider (key) {
  class Provider extends Component {
    static propTypes = {
      [key]: PropTypes.any.isRequired,
      children: PropTypes.element.isRequired
    }

    static childContextTypes = {
      [key]: PropTypes.object.isRequired
    }

    getChildContext () {
      return { [key]: this[key] }
    }

    constructor (props, context) {
      super(props, context)
      this[key] = props[key]
    }

    render () {
      return Children.only(this.props.children)
    }
  }

  return Provider
}
