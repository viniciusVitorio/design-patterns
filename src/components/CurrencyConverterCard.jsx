import { useState, useEffect } from "react";
import axios from "axios";
import FormFactory from "../factory/FormFactory";
import Subject from "../observer/Subject";
import Observer from "../observer/Observer";

const CurrencyConverterCard = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedValue, setConvertedValue] = useState(null);
  const [error, setError] = useState("");

  const conversionSubject = new Subject();

  const observer1 = new Observer("Gráfico");
  const observer2 = new Observer("Histórico");

  useEffect(() => {
    conversionSubject.addObserver(observer1);
    conversionSubject.addObserver(observer2);
  }, []);

  const fetchConversionRate = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      setConversionRate(response.data.rates[toCurrency]);

      conversionSubject.notify({
        fromCurrency,
        toCurrency,
        rate: response.data.rates[toCurrency],
      });
    } catch {
      setError("Erro ao buscar a taxa de câmbio. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchConversionRate();
  }, [fromCurrency, toCurrency]);

  const validateAmount = (value) => value > 0 && !isNaN(value);

  const convertCurrency = () => {
    if (validateAmount(amount)) {
      const result = (amount * conversionRate).toFixed(2);
      setConvertedValue(result);

      conversionSubject.notify({
        amount,
        result,
        toCurrency,
      });
      setError("");
    } else {
      setError("Por favor, insira um valor numérico positivo.");
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 text-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Conversor de Moedas</h2>

      {FormFactory.createInput("Insira o valor", amount, (e) => setAmount(e.target.value))}
      <div className="flex justify-between mb-4">
        {FormFactory.createSelect(["USD", "EUR", "BRL", "JPY", "GBP"], fromCurrency, (e) =>
          setFromCurrency(e.target.value)
        )}
        {FormFactory.createSelect(["USD", "EUR", "BRL", "JPY", "GBP"], toCurrency, (e) =>
          setToCurrency(e.target.value)
        )}
      </div>
      {FormFactory.createButton("Converter", convertCurrency)}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {convertedValue && (
        <p className="text-green-400 text-center mt-4">
          Valor Convertido: {convertedValue} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverterCard;
