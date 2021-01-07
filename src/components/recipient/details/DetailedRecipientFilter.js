import React from 'react';
import Helmet from 'react-helmet';
import "../recipient.css"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {format as dateFnsFormat, parse as dateFnsParse} from 'date-fns';
import { DateUtils } from 'react-day-picker';
import {Link} from "react-router-dom";

const DetailedRecipientFilter = ({accountName, onShowAll, onDateInput, onKontoInput, onProgramInput, onAmountInput, onPayerInput, onBillInput}) => {

    function parseDate(str, format, locale) {
        const parsed = dateFnsParse(str, format, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
            return parsed;
        }
        return undefined;
    }

    function formatDate(date, format, locale) {
        return dateFnsFormat(date, format, { locale });
    }

    const handleDateInput = (value) => {
        let date = dateFnsFormat(value, 'yyyy-MM-dd');
        onDateInput(date);
    };

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
            <Helmet>
                <style>{`
                        .DayPicker-Day--today {
                            color:#5ECBA1;
                        }
                        .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
                            background-color:#5fa997;
                            color:white;
                        }
                        .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
                          background-color: #5fa997;
                          color:white;
                        }
                    `}</style>
            </Helmet>
            <div id="account-label">
                <h6>Трансакции на {accountName} како примател</h6>
                <Link onClick={onShowAll}><h6 id="see-all">Прикажи ги сите <span className="fa fa-chevron-down"></span></h6></Link>
                <hr/>
            </div>
            <div className="row" id="recipient-label-container">
                <div className="col">
                    <h6>Датум</h6>
                </div>
                <div className="col">
                    <h6>Назив на примател</h6>
                </div>
                <div className="col">
                    <h6>Назив на давател</h6>
                </div>
                <div className="col">
                    <h6>Сметка на давател</h6>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <h6>Конто давател</h6>
                        </div>
                        <div className="col">
                            <h6>Програма давател</h6>
                        </div>
                    </div>
                </div>
                {/*<div className="col">*/}
                {/*    <h6>Конто давател</h6>*/}
                {/*</div>*/}
                {/*<div className="col">*/}
                {/*    <h6>Програма давател</h6>*/}
                {/*</div>*/}
                <div className="col">
                    <h6>Износ</h6>
                </div>
            </div>
            <div className="row" id="recipient-filter-container">
                <div className="col">
                    <DayPickerInput
                        id="from"
                        formatDate={formatDate}
                        format="yyyy-MM-dd"
                        onDayChange={handleDateInput}
                        parseDate={parseDate}
                        inputProps={{
                            placeholder: "Датум",
                            className : "form-control",
                            style : { display:"inline-block", marginLeft:"5px" }
                        }}/>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Примател" disabled="true"></input>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Давател" onKeyDown={onPayerInput}></input>
                </div>
                <div className="col">
                    <input className="form-control" placeholder="Сметка" onKeyDown={onBillInput} ></input>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <input className="form-control" placeholder="Конто" onKeyDown={onKontoInput}></input>
                        </div>
                        <div className="col">
                            <input className="form-control" placeholder="Програма" onKeyDown={onProgramInput}></input>
                        </div>
                    </div>
                </div>
                {/*<div className="col">*/}
                {/*    <input className="form-control" placeholder="Конто" onKeyDown={onKontoInput}></input>*/}
                {/*</div>*/}
                {/*<div className="col">*/}
                {/*    <input className="form-control" placeholder="Програма" onKeyDown={onProgramInput}></input>*/}
                {/*</div>*/}
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
            </div>
        </div>


    );
}

export default DetailedRecipientFilter;