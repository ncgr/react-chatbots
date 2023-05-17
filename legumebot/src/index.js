import React from 'react';
import App from './App';
import './index.css';

import * as ReactDOMClient from 'react-dom/client';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(<App />);
