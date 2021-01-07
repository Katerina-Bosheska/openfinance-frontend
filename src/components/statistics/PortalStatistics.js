import React, {useState, useEffect} from 'react';
import white_img from "./images/white.png";
import blue_img from "./images/blue.png";
import darkblue_img from "./images/darkblue.png";
import StatisticsService from "../../service/portal statistics/StatisticsService";
import "./portalstatistics.css";
import Footer from "../footer/Footer";
import {Link} from 'react-router-dom';

const PortalStatistics = () => {

    const [numbers, setNumbers] = useState({});
    const [topPayers, setTopPayers] = useState([]);
    const [topRecipients, setTopRecipients] = useState([]);

    useEffect(() => {
       loadPortalStatistics();
       loadTopPayers();
       loadTopRecipients();
    }, []);

    const loadPortalStatistics = () => {
        StatisticsService.getStatistics().then(response => {
            const responseData = response.data;
            console.log(response.data);
            var obj = {
                numberTransactions:responseData[0],
                numberPublicInst:responseData[1],
                numberCompanies:responseData[2],
                numberIndividuals:responseData[3]
            };
            setNumbers(obj);
        })
    };

    const loadTopPayers = () => {
        StatisticsService.getTopPayers().then(response => {
            setTopPayers(response.data);
        })
    };

    const loadTopRecipients = () => {
        StatisticsService.getTopRecipients().then(response => {
            setTopRecipients(response.data);
        })
    };

    return (
        <div>
            <div className="row portal_row">

                {/*================== MAX PRIMATEL =================*/}
                <div className="col portal_col">
                    <img src={white_img} className="box_img"/>
                    <div className="box_content white">
                        <h5 style={{color: "050C42", fontWeight: "bold"}}>
                            Најголем примател</h5>
                        <ol>
                            {topRecipients.map((account, index) => (
                                <li>
                                    <Link to={`/recipient/${account.id}`}><h6 className="item_name">{account.name}</h6></Link>
                                    <p className="item_amount">{account.receivedAmount.toLocaleString()} ден.</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/*================== STATISTIKA NA PORTALOT =================*/}
                <div className="col">
                    <img src={darkblue_img} className="box_img"/>
                    <div className="statistics_box_content darkblue">
                        <h5 style={{color: "050C42", fontWeight: "bold"}}>
                            Статистика на порталот</h5>
                        <span className="box_month">МАЈ</span>
                        <ul>
                            <li>
                                <h6 className="item_name">ТРАНСАКЦИИ</h6>
                                <p className="item_amount">{numbers.numberTransactions}</p>
                            </li>
                            <li>
                                <h6 className="item_name">ЈАВНИ УСТАНОВИ</h6>
                                <p className="item_amount">{numbers.numberPublicInst}</p>
                            </li>
                            <li>
                                <h6 className="item_name">КОМПАНИИ</h6>
                                <p className="item_amount">{numbers.numberCompanies}</p>
                            </li>
                            <li>
                                <h6 className="item_name">ПОЕДИНЦИ</h6>
                                <p className="item_amount">{numbers.numberIndividuals}</p>
                            </li>
                        </ul>
                        {/*<span className="fa fa-arrow-circle-right"></span>*/}
                    </div>
                </div>

                {/*================== MAX DAVATEL =================*/}
                <div className="col">
                    <img src={blue_img} className="box_img"/>
                    <div className="box_content blue">
                        <h5 style={{color: "050C42", fontWeight: "bold"}}>
                            Најголем давател</h5>
                        <ol>
                            {topPayers.map((account, index) => (
                                <li>
                                    <Link to={`/payer/${account.id}`}><h6 className="item_name">{account.name}</h6></Link>
                                    <p className="item_amount">{account.paidAmount.toLocaleString()} ден.</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        <Footer/>
        </div>
    );


}

export default PortalStatistics;