import React from 'react';
import "./budget.css";
import {Link} from "react-router-dom";

const BudgetItem = ({transaction, background}) => {

    return (
        <div className="row" style={{backgroundColor:`${background}`}}>
            <div className="col-4">
                <div className="row">
                    <div className="col-2">
                        <h6>{transaction.year}</h6>
                    </div>
                    <div className="col">
                        <Link to={`/recipient/${transaction.budgetUser.id}`}><h6>{transaction.budgetUser.name}</h6></Link>
                    </div>
                </div>
            </div>
            <div className="col">
                <h6>{transaction.bill}</h6>
            </div>
            <div className="col">
                <h6>{transaction.program}</h6>
            </div>
            <div className="col">
                <h6>{transaction.konto}</h6>
            </div>
            <div className="col">
                <h6 className="amount">{transaction.budgetAmount.toLocaleString()}</h6>
            </div>
            <div className="col">
                <h6 className="amount">{transaction.budgetPlan.toLocaleString()}</h6>
            </div>
            <div className="col">
                <h6 className="amount">{transaction.budgetRealization.toLocaleString()}</h6>
            </div>
        </div>
    );
};

export default BudgetItem;