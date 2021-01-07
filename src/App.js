import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./scenes/home/Home";
import PayersMain from "./scenes/payers/PayersMain";
import PayerDetailedView from "./scenes/payers/PayerDetailedView";
import Recipients from "./scenes/recipients/Recipients";
import DetailedRecipient from "./scenes/recipients/DetailedRecipient";
import SearchResults from "./scenes/search result/SearchResults";
import SearchResultsPage from "./scenes/search result/SearchResultsPage";
import Budget from "./scenes/budget/Budget";
import LinksPage from './scenes/links/LinksPage';
import About from "./scenes/about/About";
import LoginPage from "./scenes/login/LoginPage";
import AddTransaction from "./scenes/adding transaction/AddTransaction";

const App = () => {

    let routing = (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/payers">
                        <PayersMain/>
                    </Route>
                    <Route exact path={`/payer/:id`} exact render={(props) =>
                        <PayerDetailedView id={props.match.params.id}/>
                    }>
                    </Route>
                    <Route exact path="/recipients">
                        <Recipients/>
                    </Route>
                    <Route exact path={`/recipient/:id`} exact render={(props) =>
                        <DetailedRecipient id={props.match.params.id}/>
                    }></Route>
                    <Route exact path="/search">
                        <SearchResultsPage />
                    </Route>
                    <Route exact path="/budget">
                        <Budget />
                    </Route>
                    <Route exact path="/links">
                        <LinksPage/>
                    </Route>
                    <Route exact path="/about">
                        <About/>
                        {/*<LoginPage/>*/}
                    </Route>
                    <Route exact path="/add">
                        <AddTransaction/>
                    </Route>
            </Switch>
            </Router>
        );

    return (
        <div>
            {routing}
        </div>
    )
};

export default App;
