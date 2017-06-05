import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Layout from './components/layout';

const render = (Element) => {
    ReactDOM.render(
        <AppContainer>
            <Element />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(Layout);

if (module.hot) {
    module.hot.accept('./components/layout', () => { render(Layout); });
}
