import React from 'react';
import {useHistory} from 'react-router';
import "./payeritem.css";

const PayerItem = ({ background, id, name, bill, edb, amount }) => {

    const history = useHistory();

    const goToDetailedPreview = (e) => {
        e.preventDefault();
        history.push(`/payer/${id}`);
    };

    return(
        <div className="row payer-item-container" style={{backgroundColor:`${background}`}}>
            <div className="col-4">
                <h6 className="payer-name">{name}</h6>
            </div>
            <div className="col">
                <h6>{bill}</h6>
            </div>
            <div className="col">
                <h6>{edb}</h6>
            </div>
            <div className="col">
                <h6 className="amount">{amount.toLocaleString()}</h6>
            </div>
            <div className="col">
                <button className="btn btn-details-preview"
                    onClick={goToDetailedPreview}>
                    Детален преглед
                </button>
            </div>
        </div>
    );

}

export default PayerItem;