export const showFnImplementation = `
import _React from 'react';
import _ReactDOM from 'react-dom';
var show = (value) => {
  const rootEl = document.querySelector('#root');
  if (typeof value === 'object') {
    if (value.$$typeof && value.props) {
      _ReactDOM.render(value, rootEl)
    } else {
      rootEl.innerHTML = JSON.stringify(value);
    }
  } else {
    rootEl.innerHTML = value;
  }
}
`;

export const showFnImplementationNoop = `var show = () => {};`;
