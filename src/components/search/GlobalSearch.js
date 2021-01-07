import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './globalsearch.css';
import Helmet from 'react-helmet';
import {format as dateFnsFormat} from "date-fns";

class GlobalSearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedFromDate:  new Date("January 31 1980 12:30"),
            selectedToDate: new Date()
        }
    }

    handleFromDateChange = (date) => {
        this.setState((prevState) => {
            return {
                selectedFromDate: date,
                selectedToDate: prevState.selectedToDate
            }
        })
    };

    handleToDateChange = (date) => {
        this.setState((prevState) => {
            return {
                selectedFromDate: prevState.selectedFromDate,
                selectedToDate: date
            }
        })
    };

    render(){

        const modifiers = {
            today: {  color: '#5ECBA1' },
            NavBar: { backgroundColor: '#282c34' }
        };

        const handleFilterSearch = () => {
            let payer = document.getElementById("payer_search_bar").value;
            let recipient = document.getElementById("recipient_search_bar").value;
            let from = dateFnsFormat(this.state.selectedFromDate, 'yyyy-MM-dd');
            let to = dateFnsFormat(this.state.selectedToDate, 'yyyy-MM-dd');
            this.props.onFilterSearch(payer, recipient, from, to);
        };

        const handleGlobalSearch = () => {
            let value = document.getElementById("global_search_bar").value;
            this.props.onGlobalSearch(value);
        };

        return (
            <div id="search_container">
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
                <div className="form-inline">
                    <input id="global_search_bar" className="form-control" placeholder="Глобален пребарувач"></input>
                    <button id="global_search_btn" onClick={handleGlobalSearch} className="btn">Пребарај</button>
                </div>
                <div className="row pt-3">
                    <div className="col-6 pl-3">
                        <h6 style={{color:"gray"}}>Пребарај по назив на примател/давател</h6>
                    </div>
                    <div className="col-3 pl-4">
                        <h6 style={{color:"gray"}}>Од:</h6>
                    </div>
                    <div className="col-3 pl-4">
                        <h6 style={{color:"gray"}}>До:</h6>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col-3">
                        <input id="recipient_search_bar" className="form-control" placeholder="Примател"></input>
                    </div>
                    <div className="col-3">
                        <input id="payer_search_bar" className="form-control" placeholder="Давател"></input>
                    </div>
                    <div className="col-3">
                        <DayPickerInput
                            onDayChange={this.handleFromDateChange}
                            id="from"
                            modifiers={modifiers}
                            inputProps={{
                                className : "form-control",
                                style : { width: "270px", display:"inline-block", marginLeft:"5px" }
                            }}/>
                    </div>
                    <div className="col-3">
                        <DayPickerInput
                            id="to"
                            onDayChange={this.handleToDateChange}
                            modifiers={modifiers}
                            dayPickerProps={{
                                disabledDays: {
                                    before: this.state.selectedFromDate
                                }
                            }}
                            inputProps={{
                                className : "form-control",
                                style : { width: "270px", display:"inline-block", marginLeft:"5px" }
                            }}/>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col">
                        <hr id="hr_gradient"/>
                        <button id="partial_search_btn" onClick={handleFilterSearch} className="btn">Пребарај</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default GlobalSearch;
