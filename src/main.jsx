import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Layout from './components/layout';

const DUMMY_MESSAGES = [
    {
        sender: 'server',
        content: 'Welcome on Depict!',
    },
    {
        sender: 'Tom',
        content: 'Hi there!',
    },
    {
        sender: 'Eva',
        content: 'Hello',
    },
];

const render = (Element) => {
    ReactDOM.render(
        <AppContainer>
            <Element messages={DUMMY_MESSAGES} />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(Layout);

if (module.hot) {
    module.hot.accept('./components/layout', () => { render(Layout); });
}
