import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from "../../components/pagination/Pagination";
import Navbar from "../../components/navbar/Navbar";
import PayerFilter from "../../components/payer/main/PayerFilter";
import PayerItem from "../../components/payer/main/PayerItem";
import CustomBarChart from "../../components/charts/BarChart";
import DateSearch from "../../components/search/DateSearch";
import "../../components/payer/main/payeritem.css";

const PayersMain = () => {

    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [original, setOriginal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);

    useEffect(() =>{
        getAllTransactions();
        getTopTransactions();
    }, []);

    // FILTERS
    const getAllTransactions = () => {
        const fetchPosts = async () => {
            setLoading(true);
            const responseData = await axios.get("http://localhost:8080/transaction");
            setTransactions(responseData.data);
            setOriginal(responseData.data);
            setLoading(false);
        };
        fetchPosts();
    };

    const getOriginalTransactions = () => {
        setTransactions(original);
    };

    const showOriginalChart = () => {
        getTopTransactions();
    };

    const getTopTransactions = () => {
        const fetchTransactions = async () => {
            const responseData = await axios.get(`http://localhost:8080/transaction/sorted?from=2010-01-01&to=2020-12-01&number=10`);
            const transactions = responseData.data;
            const data = [];
            for (var i in transactions){
                var transaction = transactions[i];
                var obj = {name:transaction.payer.name, amount:transaction.amount};
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
                var obj = {name:transaction.payer.name, date:transaction.date, amount:transaction.amount};
                data.push(obj);
            }
            setAccounts(data);
        };
        fetchTransactions();
    };

    const handlePayerInput = (event) => {
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

    const handleBillInput = (event) => {
        if(event.key == 'Enter'){
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/transaction/filter/bill?bill=${value}`);
                console.log(responseData.data);
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
        <div id="payers-main-container">
            <Navbar/>
            <hr/>
            <DateSearch title="Топ 10 Даватели" onShowAll={showOriginalChart} onDateSearch={getTopTransactionsBetweenDate}/>
            <CustomBarChart data={accounts}/>
            <PayerFilter onShowAll={getOriginalTransactions} onNameInput={handlePayerInput} onBillInput={handleBillInput} onEdbInput={handleEdbInput} onAmountInput={handleAmountInput}/>
            <div id="list">
                {currentPosts.map((transaction, index) => (
                    <PayerItem key={transaction.id}
                               id={transaction.payer.id}
                               background={alternatingColor[index % alternatingColor.length]}
                               name={transaction.payer.name}
                               bill={transaction.payer.billNumber}
                               edb={transaction.payer.edb}
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

export default PayersMain;