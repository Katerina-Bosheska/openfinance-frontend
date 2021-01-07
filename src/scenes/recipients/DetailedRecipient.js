import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from "../../components/pagination/Pagination";
import Navbar from "../../components/navbar/Navbar";
import DetailedRecipientFilter from "../../components/recipient/details/DetailedRecipientFilter";
import AccountInfo from "../../components/account/AccountInfo";
import DetailedPayerItem from "../../components/payer/details/DetailedPayerItem";
import DetailedPayerFilter from "../../components/payer/details/DetailedPayerFilter";
import DetailedRecipientItem from "../../components/recipient/details/DetailedRecipientItem";
import Helmet from "react-helmet";
import CustomLineChart from "../../components/charts/LineChart";

const DetailedRecipient = ({id}) => {

    const [transactions, setTransactions] = useState([]);
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(false);
    const [transactionsByDate, setTransactionsByDate] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);

    useEffect(() =>{
        const fetchPosts = async () => {
            setLoading(true);
            const responseData = await axios.get(`http://localhost:8080/transaction/recipient/${id}`);
            setTransactions(responseData.data);
            if(transactions.length == 0){
                const account = await axios.get(`http://localhost:8080/account/get?id=${id}`);
                setAccount(account.data);
            }
            else setAccount(responseData.data[0].recipient);
            setLoading(false);
        };
        fetchPosts();
        fetchTransactionsByDate("2020-01-01", "2020-05-10");
    }, []);

    console.log(transactions);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost);
    const alternatingColor = ['white', 'whitesmoke'];

    // FILTER
    const showAllTransactions = () => {
        const fetchFilteredTransactions = async () => {
            setLoading(true);
            const responseData = await axios.get(`http://localhost:8080/transaction/recipient/${id}`);
            setTransactions(responseData.data);
            setLoading(false);
        };
        fetchFilteredTransactions();
    };

    const fetchTransactionsByDate = (from, to) => {
        console.log(from, to);
        const fetchPosts = async () => {
            setLoading(true);
            const responseData = await axios.get(`http://localhost:8080/transaction/recipient/date?id=${id}&from=${from}&to=${to}`);
            setTransactionsByDate(responseData.data);
            setLoading(false);
        };
        fetchPosts();
    };

    const handleKontoInput = (event) => {
        if(event.key == 'Enter'){
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/recipient/filter/konto?konto=${value}&recipientid=${id}`);
                setTransactions(responseData.data);
                setLoading(false);
            }
            fetchFilteredTransactions();
        }
    };

    const handleProgramInput = (event) => {
        if(event.key == 'Enter'){
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/recipient/filter/program?program=${value}&recipientid=${id}`);
                setTransactions(responseData.data);
                setLoading(false);
            }
            fetchFilteredTransactions();
        }
    };

    const handleDateInput = (value) => {
        const fetchFilteredTransactions = async () => {
            setLoading(true);
            const responseData = await axios.get(`http://localhost:8080/recipient/filter/date?date=${value}&recipientid=${id}`);
            setTransactions(responseData.data);
            setLoading(false);
        }
        fetchFilteredTransactions();
    };

    const handleAmountInput = (from, to) => {
        const fetchFilteredTransactions = async () => {
            setLoading(true);
            const responseData = await axios.get(`http://localhost:8080/recipient/filter/amount?from=${from}&to=${to}&recipientid=${id}`);
            setTransactions(responseData.data);
            setLoading(false);
        }
        fetchFilteredTransactions();
    };

    const handlePayerInput = (event) => {
        if(event.key == 'Enter') {
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/recipient/filter/payer?payerName=${value}&recipientid=${id}`);
                setTransactions(responseData.data);
                setLoading(false);
            };
            fetchFilteredTransactions();
        }
    };

    const handleBillInput = (event) => {
        if(event.key == 'Enter') {
            const value = event.target.value;
            const fetchFilteredTransactions = async () => {
                setLoading(true);
                const responseData = await axios.get(`http://localhost:8080/recipient/filter/bill?bill=${value}&recipientid=${id}`);
                setTransactions(responseData.data);
                setLoading(false);
            };
            fetchFilteredTransactions();
        }
    };

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

    // VIEW
    return (
        <div id="detailed-recipient-container">
            <Helmet>
                <style>{`
                        #detailed-recipient-container {
                            background-color: #050C42 !important;
                            height: 200px;
                        }
                        #detailed-recipient-container hr {
                            width: 90%;
                            margin-top: 8px;
                            margin-bottom: 20px;
                            border: 0;
                            height: 0.5px;
                            background: gray;
                        }
                    `}</style>
            </Helmet>
            <Navbar/>
            <hr/>
            <AccountInfo account={account}/>
            <DetailedRecipientFilter accountName={account.name} onShowAll={showAllTransactions} onDateInput={handleDateInput} onKontoInput={handleKontoInput} onProgramInput={handleProgramInput}
                onPayerInput={handlePayerInput} onAmountInput={handleAmountInput} onRecipientInput={handlePayerInput} onBillInput={handleBillInput} />
            <div id="list">
                {currentPosts.map((transaction, index) => (
                    <DetailedRecipientItem key={transaction.id}
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
            <CustomLineChart title={`Временски трансакции на ${account.name}`} data={transactionsByDate}/>
        </div>
    );
};

export default DetailedRecipient;