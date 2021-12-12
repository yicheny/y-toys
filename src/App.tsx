import React from 'react';
import {Routes, Route} from 'react-router-dom'
import TimeTotal from "./views/TimeTotal";
import {Menu} from "./components";
import KnowledgeReview from "./views/KnowledgeReview";
import './App.scss';
import IndexDBDemo from "./demos/DB/indexDB";
import LocalDBDemo from "./demos/DB/localDB";
import SelectView from "./demos/components/Select";

const menuOptions = [
  // {text:'学习时间统计',to:'/time-total'},
  // {text:'知识复习',to:'/knowledge-review'},
  {text:'indexDB测试',to:'/demo/index-db'},
  // {text:'localDB测试',to:'/demo/local-db'},
  {text:'SelectView',to:'/component/select'},
]

function App() {
  return <div className="app">
    <Menu options={menuOptions} className='app-menu'/>
    <div className="app-content">
      <Routes>
        <Route path='/time-total' element={<TimeTotal/>}/>
        <Route path='/knowledge-review' element={<KnowledgeReview/>}/>
        <Route path='/demo/index-db' element={<IndexDBDemo/>}/>
        <Route path='/demo/local-db' element={<LocalDBDemo/>}/>
        <Route path='/component/select' element={<SelectView/>}/>
      </Routes>
    </div>
  </div>
}

export default App;
