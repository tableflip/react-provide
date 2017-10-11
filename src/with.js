import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

export function withContext (key) {
  return function (WrappedComponent) {
    class WithContext extends Component {
      static contextTypes = { [key]: PropTypes.any.isRequired }

      render () {
        return <WrappedComponent {...{ [key]: this.context[key] }} {...this.props} />
      }
    }

    return hoistStatics(WithContext, WrappedComponent)
  }
}
