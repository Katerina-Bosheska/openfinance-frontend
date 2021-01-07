import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from "../../components/pagination/Pagination";
import Navbar from "../../components/navbar/Navbar";
import RecipientFilter from "../../components/recipient/RecipientFilter";
import RecipientItem from "../../components/recipient/RecipientItem";
import CustomBarChart from "../../components/charts/BarChart";
import DateSearch from "../../components/search/DateSearch";
import "../../components/recipient/recipient.css";

const Recipients = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [original, setOriginal] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);

    useEffect(() =>{
        getAllTransactions();
        getTopTransactions();
    }, []);

    const getAllTransactions = () => {
        const fetchTransactions = async () => {
            setLoading(true);
            const responseData = await axios.get("http://localhost:8080/transaction");
            setTransactions(responseData.data);
            setOriginal(responseData.data);
            setLoading(false);
        };
        fetchTransactions();
    };

    const getOriginalTransactions = () => {
        setTransactions(original);
    };

    const showOriginalChart = () => {
        getTopTransactions();
    };

    const getTopTransactions = () => {
        const fetchTransactions = async () => {
            const responseData = await axios.get("http://localhost:8080/transaction/sorted?from=2020-03-01&to=2020-05-01&number=10");
            const transactions = responseData.data;
            const data = [];
            for (var i in transactions){
                var transaction = transactions[i];
                var obj = {name:transaction.recipient.name, date: transaction.date, amount:transaction.amount};
                data.push(obj);
            }
            setAccounts(data);
        };
        fetchTransactions();
    };

    const getTopTransactionsBetweenDate = (from, to) => {
        const fetchTransactions = async () => {
            const responseData = await axios.get(`http://localhost:8080/transaction/sorted?from=${from}&to=${to}&number=10`);
            const transactions = responseData.data;
            const data = [];
            for (var i in transactions){
                var transaction = transactions[i];
                var obj = {name:transaction.recipient.name, date:transaction.date, amount:transaction.amount};
                data.push(obj);
            }
            setAccounts(data);
        };
        fetchTransactions();
    };

    // FILTERS
    const handleRecipientInput = (event) => {
        if(event.key == 'Enter'){
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/transaction/recipient/name?name=${value}`);
                setTransactions(responseData.data);
                setLoading(false);
            };
            fetchFilteredTransactions();
        }
    };

    const handleEdbInput = (event) => {
        if(event.key == 'Enter'){
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/transaction/filter/edb?edb=${value}`);
                setTransactions(responseData.data);
                setLoading(false);
            };
            fetchFilteredTransactions();
        }
    };

    const handleAmountInput = (from, to) => {
        const fetchFilteredTransactions = async () => {
            setLoading(true);
            const responseData = await axios.get(`http://localhost:8080/transaction/filter/amount?from=${from}&to=${to}`);
            setTransactions(responseData.data);
            setLoading(false);
        };
        fetchFilteredTransactions();
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost);
    const alternatingColor = ['white', 'whitesmoke'];

    // Change page
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

    // render
    return (
       <div id="recipients-main-container">
           <Navbar/>
           <hr/>
           <DateSearch title="Топ 10 Приматели" onShowAll={showOriginalChart} onDateSearch={getTopTransactionsBetweenDate}/>
           <CustomBarChart data={accounts}/>
           <RecipientFilter onShowAll={getAllTransactions} onNameInput={handleRecipientInput} onEdbInput={handleEdbInput} onAmountInput={handleAmountInput}/>
           <div id="list">
               {currentPosts.map((transaction, index) => (
                   <RecipientItem key={transaction.id}
                                  id={transaction.recipient.id}
                                  background={alternatingColor[index % alternatingColor.length]}
                                  name={transaction.recipient.name}
                                  edb={transaction.recipient.edb}
                                  amount={transaction.amount}
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

export default Recipients;