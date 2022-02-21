import "./App.css";
import AugmentMultiSelect from "./components/AugmentMultiSelect";
import StatDisplay from "./components/StatDisplay";

function App() {
    return (
        <div className="App">
            <StatDisplay />
            <AugmentMultiSelect className="capitalize" />
        </div>
    );
}

export default App;