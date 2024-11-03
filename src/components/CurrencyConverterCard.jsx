import { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverterCard = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedValue, setConvertedValue] = useState(null);
  const [error, setError] = useState("");

  const fetchConversionRate = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      setConversionRate(response.data.rates[toCurrency]);
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
      setConvertedValue((amount * conversionRate).toFixed(2));
      setError("");
    } else {
      setError("Por favor, insira um valor numérico positivo.");
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setError("");
  };

  return (
    <div className="max-w-md w-full bg-gray-800 text-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Conversor de Moedas</h2>
      
      <input
        type="text"
        className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Insira o valor"
        value={amount}
        onChange={handleAmountChange}
      />

      <div className="flex justify-between mb-4">
        <select
          className="w-1/2 p-3 mr-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {["USD", "EUR", "BRL", "JPY", "GBP"].map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <select
          className="w-1/2 p-3 ml-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {["USD", "EUR", "BRL", "JPY", "GBP"].map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        onClick={convertCurrency}
      >
        Converter
      </button>

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
