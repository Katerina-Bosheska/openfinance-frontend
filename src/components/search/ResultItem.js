import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

const ResultItem = ({transaction, background}) => {

    return (
        <div>
            <Helmet>
                <style>{`
                        .result-container, .result-label-container {
                            color: #050C42;
                            margin: 0 auto;
                            width: 90%;
                            text-align: left;
                            padding:20px;
                        }
                        .result-container a {
                            text-decoration:none !important;
                            color: #050C42 !important;
                        }
                    `}</style>
            </Helmet>
            <div className="row result-container" style={{backgroundColor:`${background}`}}>
                <div className="col">
                    <h6>{transaction.date}</h6>
                </div>
                <div className="col-2">
                    <Link to={`/payer/${transaction.payer.id}`}><h6>{transaction.payer.name}</h6></Link>
                </div>
                <div className="col-2">
                    <Link to={`/recipient/${transaction.recipient.id}`}><h6>{transaction.recipient.name}</h6></Link>
                </div>
                <div className="col">
                    <h6>{transaction.payer.billNumber}</h6>
                </div>
                <div className="col">
                    <h6>{transaction.konto}</h6>
                </div>
                <div className="col">
                    <h6>{transaction.program}</h6>
                </div>
                <div className="col">
                    <h6 className="amount">{transaction.amount}</h6>
                </div>
            </div>
        </div>

    );
};

export default ResultItem;