import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

// local imports
import App from './App';
import store from './store/_storeConfig';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
</Provider>);
