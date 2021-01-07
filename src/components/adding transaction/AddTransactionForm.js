import React, {useState, useEffect} from 'react';
import 'react-day-picker/lib/style.css';
import './addtransactionform.css';
import DayPickerInput from "react-day-picker/DayPickerInput";
import './TransactionService';
import axios from "axios";
import {format as dateFnsFormat, parse as dateFnsParse} from "date-fns";
import {DateUtils} from "react-day-picker";
import {useHistory} from 'react-router';

const AddTransactionForm = () => {

    const history = useHistory();
    const [payerErr, setPayerErr] = useState("");
    const [recipientErr, setRecipientErr] = useState("");
    const [kontoErr, setKontoErr] = useState("");
    const [programErr, setProgramErr] = useState("");
    const [dateErr, setDateErr] = useState("");
    const [amountErr, setAmountErr] = useState("");
    const [transactionDate, setTransactionDate] = useState();
    const [validDate, setValidDate] = useState(true);

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

    const changeTransactionDate = (value) => {
        const todayDate = new Date();
        let date = dateFnsFormat(value, 'yyyy-MM-dd');
        setTransactionDate(date);
        if(value > todayDate){
            setDateErr("Датумот не е валиден");
            setValidDate(false);
        }
        else {
            setDateErr("");
            setValidDate(true);
        }

    };

    const modifiers = {
        today: {  color: '#5ECBA1' },
        NavBar: { backgroundColor: '#282c34' }
    };

    const checkPayer = async () => {
        let payer = document.getElementById("payer").value;
        if (payer == "") {
            setPayerErr("Назив на давател не смее да остане празно")
            return false;
        }
        let account = await axios.get("http://localhost:8080/account/name", {
            params: {
                name: payer
            }
        });
        if(account.data == ""){
            setPayerErr("Не постои давател со тој назив");
            return false;
        } else setPayerErr("");
    }

    const checkRecipient = async () => {
        let recipient = document.getElementById("recipient").value;
        if (recipient == "") {
            setRecipientErr("Назив на примател не смее да остане празно");
            return false;
        }
        let account = await axios.get("http://localhost:8080/account/name", {
            params: {
                name: recipient
            }
        });
        if(account.data == ""){
            setRecipientErr("Не постои примател со тој назив");
            return false;
        } else setRecipientErr("");
    }

    const checkKontoAndProgram = () => {
        let konto = document.getElementById("konto").value;
        let program = document.getElementById("program").value;
        let result = true;
        if(konto == ""){
            setKontoErr("Конто не смее да остане празно");
            result = false;
        } else setKontoErr("");
        if(program == ""){
            setProgramErr("Програма не смее да остане празна");
            result = false;
        } else setProgramErr("");
        return result;
    }

    const checkAmount = () => {
        let amountStr = document.getElementById("amount").value;
        if(amountStr == ""){
            setAmountErr("Износот не смее да е празен");
            return false;
        }
        let amount = parseInt(amountStr);
        if(isNaN(amount)) {
            setAmountErr("Износот мора да е број");
            return false;
        }
        if(amount < 0) {
            setAmountErr("Износот не смее да е негативен број");
            return false;
        }
        else setAmountErr("");
        return true;
    }

    const checkTransactionIfValid = () => {
        let payer = checkPayer();
        let recipient = checkRecipient();
        let amount = checkAmount();
        let kontoAndProgram = checkKontoAndProgram();
        if(payer && recipient && amount && kontoAndProgram && validDate){
            history.push("/payers");
        }
    }

    return (
        <div id="at_container">
            <div className="row">
                <div className="col">
                    <h6>Назив на давател:</h6>
                    <input placeholder="Назив на давател" id="payer" className="form-control"/>
                    <h6 className="errorMsg">{payerErr}</h6>
                </div>
                <div className="col">
                    <h6>Назив на примател:</h6>
                    <input placeholder="Назив на примател" id="recipient" className="form-control"/>
                    <h6 className="errorMsg">{recipientErr}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6>Конто:</h6>
                    <input placeholder="Конто" id="konto" className="form-control" />
                    <h6 className="errorMsg">{kontoErr}</h6>
                </div>
                <div className="col">
                    <h6>Програма:</h6>
                    <input placeholder="Програма" id="program" className="form-control"/>
                    <h6 className="errorMsg">{programErr}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6>Датум:</h6>
                    <DayPickerInput
                        onDayChange={changeTransactionDate}
                        id="from"
                        modifiers={modifiers}
                        inputProps={{
                            className : "form-control",
                            style : { width: "570px", display:"inline-block", marginLeft:"5px" }
                        }}/>
                    <h6 className="errorMsg">{dateErr}</h6>
                </div>
                <div className="col">
                    <h6>Износ на трансакција:</h6>
                    <input placeholder="Износ" id="amount" onChange={checkAmount} className="form-control"/>
                    <h6 className="errorMsg">{amountErr}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr className="hr_gradient"/>
                    <button className="btn" id="addTransactionBtn" onClick={checkTransactionIfValid}>Додај трансакција</button>
                </div>
            </div>
        </div>
    );


}

export default AddTransactionForm;
