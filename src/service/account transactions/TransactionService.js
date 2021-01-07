import axios from 'axios';

const TransactionService = {

    fetchTransactions(){
        return axios.get("http://localhost:8080/transaction");
    }

};

export default TransactionService;