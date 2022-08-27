import Header from "../Components/header/header";
import React from "react";
import axios from "axios";
import CurrencyInput from "../Components/input/CurrencyInput";
// eslint-disable-next-line
import style from "./main.css"

const  Main = ()=> {

    const [amount1, setAmount1] = React.useState(1);
    const [amount2, setAmount2] = React.useState(1);
    const [currency1, setCurrency1] = React.useState('USD');
    const [currency2, setCurrency2] = React.useState('EUR');
    const [rates, setRates] = React.useState([]);
    const [date, setDate] = React.useState()
    const [GBP,setGBP] = React.useState(0)
    const [USD,setUSD] = React.useState(0)
    const [EUR,setEUR] = React.useState(0)
    React.useEffect(() => {
        axios.get('https://cdn.cur.su/api/nbu.json')
            .then(response => {
                setRates(response.data.rates);
                setDate(response.data.putISODate)
            })
    }, []);

    setTimeout(() => {
            setUSD(format(1 * rates['UAH'] / rates['USD']))
            setGBP(format(1 * rates['UAH'] / rates['GBP']))
            setEUR(format(1 * rates['UAH'] / rates['EUR']))
    }, 500)


   React.useEffect(() => {
        if (!!rates) {
            function init() {
                handleAmount1Change(1);
            }
            init();
        }
       // eslint-disable-next-line
    }, [rates]);



    function format(number) {
        return number.toFixed(4);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setCurrency2(currency2);
    }






    return(
        <>
        <Header date={date} USD={USD} EUR={EUR} GBP={GBP}/>
            <div className="margin">
            <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(rates)}
                amount={amount1}
                currency={currency1} />
            <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(rates)}
                amount={amount2}
                currency={currency2} />
            </div>
        </>
    )
}

export default Main