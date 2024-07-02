import "./App.css";
import Content from './components/content';
require('dotenv').config();
console.log(process.env);
function App() {
    return (
        <div className="App">       
            <Content />
        </div>
    );
}

export default App;