import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Layout  from './Layout/Layout';

const Index = () => (
    <BrowserRouter>
        <Route path={"/"} component={Layout}/>
    </BrowserRouter>
);
export default Index;