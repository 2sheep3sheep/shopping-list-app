import './App.css';
import AppHeader from './components/AppHeader';
import ShoppingListProvider from './components/ShoppingListProvider';
import UserContextProvider from './components/UserProvider';
import ShoppingListDetail from './routes/ShoppingListDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import ShoppingListsProvider from './components/ShoppingListsProvider';
import MockDataProvider from './components/MockDataProvider';

function App() {

  return (
    <div>
      <MockDataProvider>
        <UserContextProvider>
          <AppHeader/>
          <div className="App-Body" style={{paddingTop:"72px"}}>
            <Routes>
              <Route path="/detail" element={
                <ShoppingListProvider>
                  <ShoppingListDetail/>
                </ShoppingListProvider>
              }/>
              <Route path="/" element={
                <ShoppingListsProvider>
                  <Dashboard/>
                </ShoppingListsProvider>
              }/>

            </Routes>
          </div>
        </UserContextProvider>
      </MockDataProvider>
    </div>
  );
}

export default App;
