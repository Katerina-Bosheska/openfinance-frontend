import React from 'react';
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Helmet from 'react-helmet';
import SearchResults from "./SearchResults";
import {useLocation} from "react-router-dom";

const SearchResultsPage = () => {

    const location = useLocation();

    return (
        <div id="search_result_container">
            <Helmet>
                <style>{`
               .result-label-container h6 {
                    color:black;
                    font-weight:bolder;
                }
                #search_result_container {
                    background-color: #050C42 !important;
                    height: 200px;
                }
                a { cursor: pointer; }
            `}</style>
            </Helmet>
            <Navbar/>
            <hr id="fade_hr"/>
            <SearchResults location = {location.state}/>
        </div>
    );

};

export default SearchResultsPage;