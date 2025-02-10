'use client'

import React from 'react';

import { IPProvider } from './IPProvider';
import Home from '@/pages/home';

const App: React.FC = () => {
    return (
        <IPProvider>
            <Home />
        </IPProvider>

    );
};

export default App;
