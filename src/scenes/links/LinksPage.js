import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Helmet from 'react-helmet';
import Footer from "../../components/footer/Footer";

const LinksPage = () => {

    return (
        <div >
            <Helmet>
                <style>{`
                     #links-container h5 { padding-top: 10px; }
                     #links-container a, #links-container p { color: #7175D8 !important; }
                     #links-container h6 { padding-top: 20px; }
                    `}</style>
            </Helmet>
            <Navbar/>
            <div className="container" id="links-container">
                <h5>Линкови</h5>
                <div>
                    <h6>Корисни линкови:</h6>

                    <a href="https://www.finance.gov.mk/"><p>Министерство за финансии</p></a>
                    <a href="https://www.usaid.gov/north-macedonia"><p>Агенција на САД за меѓународен развој (УСАИД)</p></a>
                    <a href="https://www.iri.org/"><p>Меѓународен републикански институт (ИРИ)</p></a>


                    <h6>Корисни ресурси:</h6>

                    <a href="https://www.finance.gov.mk/mk/node/186"><p>Закони и прописи за Буџет и финансирање на ЕЛС</p></a>
                    <a href="https://www.finance.gov.mk/mk/node/700"><p>Упатства и правилници за трезорско работење</p></a>
                    <a href="https://www.finance.gov.mk/mk/node/575"><p>Буџети и измени и дополнувања на Буџети на Република Македонија</p></a>
                    <a href="https://open.finance.gov.mk/mk/download/lista_BK.xls"><p>Листа на буџетските корисници и единки корисници</p></a>
                    <a href="https://open.finance.gov.mk/mk/download/Pravilnik%20za%20klasifikacija%20na%20prihodi%202018.pdf"><p>Правилник за класификација на приходите</p></a>
                    <a href="https://open.finance.gov.mk/mk/download/Pravilnik_za_klasifikacija_na_rashodite.pdf"><p>Правилник за класификација на расходите</p></a>
                </div>
            </div>
            <Footer/>
        </div>
    );

};

export default LinksPage;