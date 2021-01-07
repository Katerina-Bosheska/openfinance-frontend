import React from 'react';
import 'react-day-picker/lib/style.css';
import './loginform.css';

class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errorMessage: "",
            email: "",
            password: ""
        }
    }

    render(){

        const checkLoginCredentials = () => {
            this.setState((prevState) => {
                    let email = document.getElementById("email").value;
                    let pass = document.getElementById("pass").value;
                    let hasError = "";
                    if(email == "hehe@yahoo.com"){
                        hasError = "Внесената адреса не постои";
                    } else {
                        hasError = "";
                    }
                    return {
                        errorMessage: hasError
                    }
                }
            )
        }

        return (
            <div id="login_container">
                <div className="row">
                    <div className="col">
                        <h6>Вашата e-mail адреса:</h6>
                        <input placeholder="E-mail адреса" id="email" className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h6>Вашата лозинка:</h6>
                        <input placeholder="Лозинка" id="pass" type="password" className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h6 id="errorMsg">{this.state.errorMessage}</h6>
                        <button className="btn" onClick={checkLoginCredentials}>Логирај се</button>
                    </div>
                </div>
            </div>
        );
    }


}

export default LoginForm;
