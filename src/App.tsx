import "./App.css";
import WordleBoard from "./components/WordleBoard";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <WordleBoard />
    </div>
  );
};

export default App;
