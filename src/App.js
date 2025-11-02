import './App.css';
import AppHeader from './components/AppHeader';
import ShoppingListProvider from './components/ShoppingListProvider';
import UserContextProvider from './components/UserProvider';
import ShoppingListDetail from './routes/ShoppingListDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <UserContextProvider>
        <AppHeader/>
        <div className="App-Body" style={{paddingTop:"72px"}}>
          <ShoppingListProvider>
            <ShoppingListDetail/>
          </ShoppingListProvider>
        </div>
      </UserContextProvider>
    </div>
  );
}

export default App;
