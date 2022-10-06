import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AddRequest from './components/AddRequest/AddRequest';
import EditRequest from './components/EditRequest/EditRequest';
import Home from './components/Home/Home';
import Requests from './components/Requests/Requests'
import Results from './components/Results/Results';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/requests' element ={<Requests/>}/>
          <Route path='/requests/add' element={<AddRequest/>}/>
          <Route path='/requests/edit/:id' element={<EditRequest/>}/>
          <Route path='/spec-cpu-2017/results' element={<Results/>}/>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
