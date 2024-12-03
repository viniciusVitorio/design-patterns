import CurrencyConverterCard from "./components/CurrencyConverterCard";

function App() {
  return (
    <div className="min-h-screen gap-4 flex flex-col items-center justify-center bg-gray-900 p-6">
      <CurrencyConverterCard />
      <span className="text-gray-400 flex gap-2">Desenvolvido por <p className="text-blue-500">Vinicius Vitório</p> & <p className="text-blue-500">Pablo Pscheidt</p></span>
    </div>
  );
}

export default App;
