import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import AddTransactionForm from "../../components/adding transaction/AddTransactionForm";

const AddTransaction = () => {

    return (
        <div id="home-container">
            <Navbar/>
            <hr id="fade_hr"/>
            <AddTransactionForm/>
        </div>
    );
};

export default AddTransaction;