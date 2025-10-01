import MainPage from './pages/MainPage';
import citiesData from './data/citiesData.json';

const LIMIT = 8;

function App() {
  return <MainPage limit={LIMIT} data={citiesData} />;
}

export default App;
