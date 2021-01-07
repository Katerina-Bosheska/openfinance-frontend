import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import GlobalSearch from "../../components/search/GlobalSearch";
import PortalStatistics from "../../components/statistics/PortalStatistics";
import {useHistory} from "react-router";

import "./home.css";

const Home = () => {

    const history = useHistory();

    const filterTransactions = (payer, recipient, from, to) => {
        let params = {payer:payer, recipient:recipient, from:from, to:to, type:"filter"};
        history.push(`/search`, params);
    };

    const searchTransactions = (keyword) => {
        let params = {keyword:keyword, type: "global"};
        history.push(`/search`, params);
    };

    return (
      <div id="home-container">
          <Navbar/>
          <hr id="fade_hr"/>
          <GlobalSearch onFilterSearch={filterTransactions} onGlobalSearch={searchTransactions}/>
          <PortalStatistics/>
      </div>
    );
};

export default Home;