import React from 'react';
import {Link} from "react-router-dom";
import './budget.css';

const BudgetFilter = ({onShowAll, onNameInput, onBillInput, onProgramInput, onKontoInput, onAmountInput, onYearInput }) => {

    const handleAmountInputs = (event) => {
        if(event.key == 'Enter'){
            let from = document.getElementById("budget-from-amount").value;
            let to = document.getElementById("budget-to-amount").value;
            if(from == "") from = 0;
            if(to == "") to = 0;
            onAmountInput(from, to);
        }
    };

    return (
        <div>
            <div id="account-label">
                <h6>Буџетски корисници</h6>
                <Link onClick={onShowAll}><h6 id="see-all">Прикажи ги сите <span className="fa fa-chevron-down"></span></h6></Link>
                <hr/>
            </div>
            <div className="row" id="budget-label-container">
                <div className="col-4">
                    <div className="row">
                        <div className="col-3">
                            <h6>Година</h6>
                        </div>
                        <div className="col">
                            <h6>Назив на корисник</h6>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <h6>Сметка</h6>
                </div>
                <div className="col">
                    <h6>Програма</h6>
                </div>
                <div className="col">
                    <h6>Конто</h6>
                </div>
                <div className="col">
                    <h6>Буџет</h6>
                </div>
                <div className="col">
                    <h6>План</h6>
                </div>
                <div className="col">
                    <h6>Реализација</h6>
                </div>
            </div>
            <div className="row" id="budget-filter-container">
                <div className="col-4">
                    <div className="row">
                        <div className="col-3">
                            <input className="form-control" placeholder="Година" onKeyDown={onYearInput}></input>
                        </div>
                        <div className="col">
                            <input className="form-control" placeholder="Назив на корисник" onKeyDown={onNameInput}></input>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Сметка" onKeyDown={onBillInput}></input>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Програма" onKeyDown={onProgramInput}></input>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Конто" onKeyDown={onKontoInput}></input>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col">
                            <input className="form-control" placeholder="Од" id="budget-from-amount" onKeyDown={handleAmountInputs}></input>
                        </div>
                        <div className="col">
                            <input className="form-control" placeholder="До" id="budget-to-amount" onKeyDown={handleAmountInputs}></input>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>


    );
}

export default BudgetFilter;