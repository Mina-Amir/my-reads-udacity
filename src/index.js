import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Search from './Search/Search'
import './index.css'
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={App}></Route>
        <Route path="/search" component={Search}></Route>
</Router>, document.getElementById('root'))
