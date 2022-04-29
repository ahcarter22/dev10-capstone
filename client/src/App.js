
import Vendors from './Vendors';
import Items from './Items';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="vendors">
          <Vendors />
        </div>
        <div id= "items">
          <Items />
        </div>
        
        
      </header>
    </div>
  );
}

export default App;
