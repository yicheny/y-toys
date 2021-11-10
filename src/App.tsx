import React from 'react';
import {Routes,Route} from 'react-router-dom'
import TimeTotal from "./views/TimeTotal";

function App() {
  return <div className="app">
    <Routes>
      <Route path='/time-total' element={<TimeTotal/>}/>
    </Routes>
  </div>
}

export default App;
