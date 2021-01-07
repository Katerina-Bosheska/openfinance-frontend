import React from 'react';
import "./account-info.css";
import background from "./white.png";

const Account = ( {account} ) => {

    return (
        <div id="account-container">
            <div className="row">
                <div className="col">
                    <h4 id="account-name">{account.name}</h4>
                    <div><h6>Сметка: </h6><p> {account.billNumber}</p></div>
                    <div><h6>Адреса: </h6><p> {account.address}</p></div>
                    <div><h6>Единствен даночен број: </h6><p> {account.edb}</p></div>
                </div>
                <div className="col" id="amount-info">
                    <div><h6>Вкупен примен износ: </h6></div>
                    <div><p className="amount">{account.receivedAmount} ден.</p></div>
                    <div><h6>Вкупен даден износ: </h6></div>
                    <div><p className="amount">{account.paidAmount} ден.</p></div>
                </div>
            </div>
        </div>
    );

};

export default Account;