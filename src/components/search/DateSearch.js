import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './globalsearch.css';
import Helmet from 'react-helmet';
import axios from "axios";
import {format as dateFnsFormat} from "date-fns";
import {Link} from "react-router-dom";
import domtoimage from "dom-to-image";

class DateSearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedFromDate: new Date("January 31 1980 12:30"),
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

    handleDateSearch = () => {
        let from = dateFnsFormat(this.state.selectedFromDate, 'yyyy-MM-dd');
        let to = dateFnsFormat(this.state.selectedToDate, 'yyyy-MM-dd');
        this.props.onDateSearch(from, to);
    };

    downloadChartAsPng = () => {
        var filename;
        if(this.props.title == "Топ 10 Даватели")
            filename = 'davateli.png';
        else filename = 'primateli.png';
        var FileSaver = require('file-saver');
        domtoimage.toBlob(document.getElementById('custom-bar-chart'))
            .then(function (blob) {
                FileSaver.saveAs(blob, filename);
        });
    };

    render(){

        const modifiers = {
            today: {  color: '#5ECBA1' },
            NavBar: { backgroundColor: '#282c34' }
        };

        return (
            <div id="search_container">
                <Helmet>
                    <style>{`
                        #submit_filter_btn {
                            float:right;
                            color: white;
                            background-color: #660066;
                        }
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
                        .fa-download { font-size: 40px; color:gray; }
                        #download-link { color: gray; }
                        .fa-align-justify { font-size: 40px; color:#5ECBA1; }
                        #show-all {color:#5ECBA1; }
                    `}</style>
                </Helmet>
                <div className="row p-2">
                    <div className="col pl-4">
                        <h5 style={{color:"gray"}}>{this.props.title}</h5>
                    </div>
                    <div className="col pl-4">
                        <h6 style={{color:"gray"}}>Од:</h6>
                        <DayPickerInput
                            onDayChange={this.handleFromDateChange}
                            id="from"
                            modifiers={modifiers}
                            inputProps={{
                                className : "form-control",
                                style : { width: "270px", display:"inline-block", marginLeft:"5px" }
                            }}/>
                    </div>
                    <div className="col pl-4">
                        <h6 style={{color:"gray"}}>До:</h6>
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
                    <div className="col pl-5">
                        <div className="row">
                            <div className="col">
                                <br/>
                                <button id="submit_filter_btn" onClick={this.handleDateSearch} className="btn">Прикажи</button>
                            </div>
                            <div className="col">
                                <br/>
                                <Link id="show-all" onClick={this.props.onShowAll}><div title="Прикажи ги сите" className="fa fa-align-justify pr-3"></div></Link>
                                <Link id="download-link" onClick={this.downloadChartAsPng}><div title="Симни како PNG" className="fa fa-download"></div></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default DateSearch;
