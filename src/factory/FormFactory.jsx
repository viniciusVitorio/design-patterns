class FormFactory {
    static createSelect(options, value, onChange) {
      return (
        <select
          className="w-1/2 p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
  
    static createInput(placeholder, value, onChange) {
      return (
        <input
          type="text"
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    }
  
    static createButton(text, onClick) {
      return (
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          onClick={onClick}
        >
          {text}
        </button>
      );
    }
  }
  
  export default FormFactory;
  