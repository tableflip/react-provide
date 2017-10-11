# react-provide

[![dependencies Status](https://david-dm.org/tableflip/react-provide/status.svg)](https://david-dm.org/tableflip/react-provide) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> React Components for putting a value in context and fishing it out. Avoids deep chains of prop passing.

## Install

```sh
npm install react-provide
```

## Usage

**api.js**

```js
import { contextProvider, withContext } from 'react-provide'

export default class Api {
  getItems: () => ['some', 'items']
}

// Create a Provider that'll put and object called 'api' into context
export const Provider = contextProvider('api')

// Create a helper that pulls 'api' out of context and passes it as a prop
export const withApi = withContext('api')
```

**list.js**

```js
import React from 'react'
import { withApi } from './api'

// Use withApi to pass 'api' as a prop to the component
export default withApi(({ api }) => (
  <div>{api.getItems().map((name) => name)}</div>
))
```

**main.js**

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Api, { Provider } from './api'
import List from './list'

// Use the Provider so deeply nested components can use the api in context
ReactDOM.render(
  <Provider api={new Api()}>
    <div><List /></div>
  </Provider>,
  document.getElementById('root')
)
```

## API

### `contextProvider(key)`

Create a provider component that can be used to provide a value called `key` to nested components in context.

e.g.

```js
import { contextProvider } from 'react-provide'

const Provider = createContextProvider('foo')

<Provider foo={'bar'}>
  {/* your component tree */}
</Provider>
```

### `withContext(key)`

Create a function that'll create a component to pull a value called `key` from context and pass it as a prop to your component.

e.g.

```js
import { withContext } from 'react-provide'

class MyComponent extends Component {
  static propTypes = {
    foo: PropTypes.object.isRequired
  }

  render () {
    return <div>{this.props.foo}</div>
  }
}

export default withContext('foo')(MyComponent)
```
