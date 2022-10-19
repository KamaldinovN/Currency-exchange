import Header from "../Components/header/header";
import React from "react";
import axios from "axios";
import CurrencyInput from "../Components/input/CurrencyInput";
// eslint-disable-next-line
import style from "./main.css";

const Main = () => {
  const [amount1, setAmount1] = React.useState(1);
  const [amount2, setAmount2] = React.useState(1);
  const [currency1, setCurrency1] = React.useState("USD");
  const [currency2, setCurrency2] = React.useState("EUR");
  const [rates, setRates] = React.useState([]);
  const [date, setDate] = React.useState();
  const [GBP, setGBP] = React.useState(0);
  const [USD, setUSD] = React.useState(0);
  const [EUR, setEUR] = React.useState(0);

  React.useEffect(() => {
    axios
      .get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((response) => {
        setRates(response.data);
        setDate(response.data[0].exchangedate);
      });
  }, []);

  console.log(rates);

  setTimeout(() => {
    setUSD(format(rates[rates.findIndex((i) => i.cc === "USD")].rate));
    setGBP(format(rates[rates.findIndex((i) => i.cc === "GBP")].rate));
    setEUR(format(rates[rates.findIndex((i) => i.cc === "EUR")].rate));
  }, 500);

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
    setAmount2(
      format(
        (amount1 * rates[rates.findIndex((i) => i.cc === currency2)].rate) /
          rates[rates.findIndex((i) => i.cc === currency1)].rate
      )
    );
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(
      format(
        (amount1 * rates[rates.findIndex((i) => i.cc === currency2)].rate) /
          rates[rates.findIndex((i) => i.cc === currency1)].rate
      )
    );
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(
      format(
        (amount2 * rates[rates.findIndex((i) => i.cc === currency1)].rate) /
          rates[rates.findIndex((i) => i.cc === currency2)].rate
      )
    );
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(
      format(
        (amount2 * rates[rates.findIndex((i) => i.cc === currency1)].rate) /
          rates[rates.findIndex((i) => i.cc === currency2)].rate
      )
    );
    setCurrency2(currency2);
  }

  return (
    <>
      <Header date={date} USD={USD} EUR={EUR} GBP={GBP} />
      <div className="margin">
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={rates.map((item) => item.cc)}
          amount={amount1}
          currency={currency1}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={rates.map((item) => item.cc)}
          amount={amount2}
          currency={currency2}
        />
      </div>
    </>
  );
};

export default Main;
