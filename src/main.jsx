import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import ChatRoom from './components/chatroom/room';

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

const render = (Chat) => {
    ReactDOM.render(
        <AppContainer>
            <Chat messages={DUMMY_MESSAGES} />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(ChatRoom);

if (module.hot) {
    module.hot.accept('./containers/app', () => { render(ChatRoom); });
}
