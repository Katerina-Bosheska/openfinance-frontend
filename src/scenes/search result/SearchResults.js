import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";
import ResultItem from "../../components/search/ResultItem";
import Helmet from 'react-helmet';
import FilterSearch from "../../components/search/FilterSearch";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";

const SearchResults = (props) => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const location = useLocation();

    useEffect(() =>{
        // const searchParams = location.state;
        const searchParams = props.location;
        if(searchParams.type == "global"){
            const keyword = searchParams.keyword;
            const fetchPosts = async () => {
                const responseData = await axios.get(`http://localhost:8080/transaction/filter/global?value=${keyword}`);
                setTransactions(responseData.data);
            };
            fetchPosts();
        } else if(searchParams.type == "filter"){
            let payer = searchParams.payer;
            let recipient = searchParams.recipient;
            let from = searchParams.from;
            let to = searchParams.to;
            filterTransactions(payer, recipient, from, to);
        } else {
            setTransactions([]);
        }
    }, []);

    //CHANGE PAGE
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost);
    const alternatingColor = ['whitesmoke', 'white'];

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const prevPage = () => {
        if(currentPage != 1)
            setCurrentPage(currentPage - 1);
    };

    const nextPage = (pageNumbers) => {
        if(currentPage != pageNumbers)
            setCurrentPage(currentPage + 1);
    };

    //FILTERING
    const getAllTransactions = () => {
        const fetchTransactions = async () => {
            setLoading(true);
            const responseData = await axios.get(`http://localhost:8080/transaction`);
            setTransactions(responseData.data);
            setLoading(false);
        };
        fetchTransactions();
    };

    const filterRecipients = (event) => {
        if(event.key == 'Enter'){
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/transaction/recipient/name?name=${value}`);
                setTransactions(responseData.data);
                setLoading(false);
            }
            fetchFilteredTransactions();
        }
    };

    const filterPayers = (event) => {
        if(event.key == 'Enter'){
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/transaction/payer/name?name=${value}`);
                setTransactions(responseData.data);
                setLoading(false);
            };
            fetchFilteredTransactions();
        }
    };

    //http://localhost:8080/transaction/filter?payername=${payer}&recipientname=${recipient}&from=${from}&to=${to}
    const filterTransactions = (payer, recipient, from, to) => {
        const fetchFilteredTransactions = async () => {
            setLoading(true);
            const responseData = await axios.post(`http://localhost:8080/transaction/filter`, null, {params : {
                payername:payer, recipientname:recipient, from:from, to:to
                }});
            setTransactions(responseData.data);
            setLoading(false);
        };
        fetchFilteredTransactions();
    };

    return (
        <div>
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
            {/*<Navbar/>*/}
            {/*<hr id="fade_hr"/>*/}
            <FilterSearch filterRecipient={filterRecipients} filterPayer={filterPayers} filterTransactions={filterTransactions} />
            <div id="account-label">
                <h6>Резултати од пребарувањето</h6>
                <a onClick={getAllTransactions}><h6 id="see-all">Прикажи ги сите <span className="fa fa-chevron-down"></span></h6></a>
                <hr/>
            </div>
            <div className="row result-label-container">
                <div className="col">
                    <h6>Датум</h6>
                </div>
                <div className="col-2">
                    <h6>Назив на давател</h6>
                </div>
                <div className="col-2">
                    <h6>Назив на примател</h6>
                </div>
                <div className="col">
                    <h6>Сметка на давател</h6>
                </div>
                <div className="col">
                    <h6>Конто</h6>
                </div>
                <div className="col">
                    <h6>Програма</h6>
                </div>
                <div className="col">
                    <h6>Износ</h6>
                </div>
            </div>
            <hr/>
            <div id="list">
                {currentPosts.map((transaction, index) => (
                    <ResultItem key={transaction.id}
                                       background={alternatingColor[index % alternatingColor.length]}
                                       transaction={transaction}
                    />
                ))}
            </div>
            <div style={{textAlign:"center"}}>
                <Pagination postsPerPage={postsPerPage}
                            totalPosts={transactions.length}
                            paginate={paginate}
                            nextPage={nextPage}
                            prevPage={prevPage}
                            active={currentPage} />
            </div>

        </div>
    );
};

export default SearchResults;