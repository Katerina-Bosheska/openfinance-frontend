import axios from 'axios';
import config from './config';

const StatisticsService = {

    getStatistics(){
        return axios.get("http://localhost:8080/number");
    },

    getNumberOfPublicInstitutions(){
        return axios.get(`${config.baseURL}/publicinstitutions`);
    },

    getNumberOfCompanies(){
        return axios.get(`${config.baseURL}/companies`);
    },

    getNumberOfIndividuals(){
        return axios.get(`${config.baseURL}/individuals`);
    },

    getTopPayers(){
        return axios.get("http://localhost:8080/account/payers/ordered?number=5");
    },

    getTopRecipients(){
        return axios.get("http://localhost:8080/account/recipients/ordered?number=5");
    }

};

export default StatisticsService;