import React from 'react';
import Helmet from 'react-helmet';

const Footer = () => {

    return (
        <div>
            <Helmet>
                <style>{`
                    p { padding: 5px; color: white; text-shadow: text-shadow: 1px 1px gray;}
                    #footer { background-color: #050C42; text-align:center; padding: 20px; height: 80px; width:100%; margin-top: 200px;}
                `}</style>
            </Helmet>
            <div  id="footer">
                <p>Copyright <span className="fa fa-copyright"></span> 2020</p>
            </div>
        </div>
    );

};

export default Footer;