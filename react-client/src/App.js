import logo from './logo.svg';
import './App.css';
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="pt-10 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Image Upload Example</h3>
      </div>

      <div className="sm:col-span-6 pt-10">
        <FileUpload />
      </div>
    </div>
  );
}

export default App;
