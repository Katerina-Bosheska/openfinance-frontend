import React from 'react';
import "./recipient.css"
import {Link} from "react-router-dom";

const RecipientFilter = ({onShowAll, onNameInput, onEdbInput, onAmountInput }) => {

    const handleAmountInputs = (event) => {
        if(event.key == 'Enter'){
            let from = document.getElementById("from-amount").value;
            let to = document.getElementById("to-amount").value;
            if(from == "") from = 0;
            if(to == "") to = 0;
            onAmountInput(from, to);
        }
    };

    return (
        <div>
            <div id="account-label">
                <h6>Приматели</h6>
                <Link onClick={onShowAll}><h6 id="see-all">Прикажи ги сите <span className="fa fa-chevron-down"></span></h6></Link>
                <hr/>
            </div>
            <div className="row" id="recipient-label-container">
                <div className="col-4">
                    <h6>Назив</h6>
                </div>
                <div className="col">
                    <h6>ЕДБ</h6>
                </div>
                <div className="col">
                    <h6>Износ</h6>
                </div>
                <div className="col">
                    <h6>Опции</h6>
                </div>
            </div>
            <div className="row" id="recipient-filter-container">
                <div className="col-4">
                    <input className="form-control" placeholder="Назив" onKeyDown={onNameInput}></input>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="ЕДБ" onKeyDown={onEdbInput}></input>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <input className="form-control" placeholder="Од" id="from-amount" onKeyDown={handleAmountInputs}></input>
                        </div>
                        <div className="col">
                            <input className="form-control" placeholder="До" id="to-amount" onKeyDown={handleAmountInputs}></input>
                        </div>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
        </div>


    );
}

export default RecipientFilter;