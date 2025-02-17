import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <div className="App">
     {/* <Login/>
     <Signup/>
     <Dashboard/> */}
     <Router>
      <AppRoutes/>
     </Router>
     <br/>

    </div>
  );
}

export default App;
