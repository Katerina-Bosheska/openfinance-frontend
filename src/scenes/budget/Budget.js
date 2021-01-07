import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";
import "./budget.css";
import BudgetItem from "./Item";
import BudgetFilter from "./BudgetFilter"
import StackedBarChart from "../../components/charts/StackedBarChart";
import {Link} from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const Budget = () => {

    const [transactions, setTransactions] = useState([]);
    const [original, setOriginal] = useState([]);
    const [budget, setBudget] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);

    useEffect(() =>{
        fetchBudgetTransactions();
        fetchDataForChart(2017, 2020);
    }, []);

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

    const fetchBudgetTransactions = () => {
        const fetch = async () => {
            const responseData = await axios.get("http://localhost:8080/budget");
            setTransactions(responseData.data);
            setOriginal(responseData.data);
        };
        fetch();
    };

    const fetchDataForChart = (from, to) => {
        const fetch = async () => {
            const responseData = await axios.get(`http://localhost:8080/budget/sum?from=${from}&to=${to+1}`);
            setBudget(responseData.data);
        };
        fetch();
    };

    const fetchOriginal = () => {
        setTransactions(original);
    };

    const filterByYear = (event) => {
        if(event.key == 'Enter'){
            const year = event.target.value;
            const fetch = async () => {
                const responseData = await axios.get(`http://localhost:8080/budget/filter/year?year=${year}`);
                setTransactions(responseData.data);
            };
            fetch();
        }
    };

    const filterByAccountName = (event) => {
        if(event.key == 'Enter'){
            const name = event.target.value;
            const fetch = async () => {
                const responseData = await axios.get(`http://localhost:8080/budget/filter/name?name=${name}`);
                setTransactions(responseData.data);
            };
            fetch();
        }
    };

    const filterByBill = (event) => {
        if(event.key == 'Enter') {
            const bill = event.target.value;
            const fetch = async () => {
                const responseData = await axios.get(`http://localhost:8080/budget/filter/bill?bill=${bill}`);
                setTransactions(responseData.data);
            };
            fetch();
        }
    };

    const filterByKonto = (event) => {
        if(event.key == 'Enter'){
            const konto = event.target.value;
            const fetch = async () => {
                const responseData = await axios.get(`http://localhost:8080/budget/filter/konto?konto=${konto}`);
                setTransactions(responseData.data);
            };
            fetch();
        }
    };

    const filterByProgram = (event) => {
        if(event.key == 'Enter'){
            const program = event.target.value;
            const fetch = async () => {
                const responseData = await axios.get(`http://localhost:8080/budget/filter/program?program=${program}`);
                setTransactions(responseData.data);
            };
            fetch();
        }
    };

    const filterByBudgetAmount = (from, to) => {
        const fetch = async () => {
            const responseData = await axios.get(`http://localhost:8080/budget/filter/amount?from=${from}&to=${to}`);
            setTransactions(responseData.data);
        };
        fetch();
    };

    const downloadChartAsPng = () => {
        var FileSaver = require('file-saver');
        domtoimage.toBlob(document.getElementById('budgetChart'))
            .then(function (blob) {
                FileSaver.saveAs(blob, 'budzet.png');
            });
    };

    return (
        <div>
            <Navbar/>
            <hr/>
            <Link style={{color:"gray"}} onClick={downloadChartAsPng}>
                <div title="Симни како PNG" className="fa fa-download" style={{fontSize: "40px", color:"gray", paddingLeft:"10px"}}></div>
            </Link>
            <StackedBarChart id="budgetChart" data={budget}/>
            <BudgetFilter   onYearInput={filterByYear}
                            onAmountInput={filterByBudgetAmount}
                            onBillInput={filterByBill}
                            onKontoInput={filterByKonto}
                            onProgramInput={filterByProgram}
                            onNameInput={filterByAccountName}
                            onShowAll={fetchOriginal}/>
            <div id="budget-items-container">
                {currentPosts.map((transaction, index) => (
                    <BudgetItem key={index} transaction={transaction} background={alternatingColor[index % alternatingColor.length]}/>
                ))}
            </div>
            <div style={{textAlign:"center", marginTop:"5px"}}>
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

export default Budget;