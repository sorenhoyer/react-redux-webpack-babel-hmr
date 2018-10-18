import * as ReactDOM from 'react-dom';
import { render } from 'app-initializer';
import App from './components/App';

const RootNode = document.getElementById('root');

render(RootNode, App);

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    ReactDOM.unmountComponentAtNode(RootNode);
    render(RootNode, App);
  });
}

