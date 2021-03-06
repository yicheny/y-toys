import React, {useMemo} from 'react';
import {Routes, Route} from 'react-router-dom'
import TimeTotal from "./views/TimeTotal";
import {Menu, message} from "./components";
import KnowledgeReview from "./views/KnowledgeReview";
import './App.scss';
import IndexDBDemo from "./demos/DB/indexDB";
import LocalDBDemo from "./demos/DB/localDB";
import SelectView from "./demos/components/Select";
import InputView from "./demos/components/Input";
import './i18n/config';
import { useTranslation } from 'react-i18next';
import {BaseMenu} from "./base";
import {ModalView} from "./demos/components/Modal";

export default function App() {
  const {t,i18n} = useTranslation()
  return <div className="app">
    <BaseMenu size={64} onDoubleClick={()=>{
      const nextLng = i18n.language === 'zh' ? 'en' : 'zh';
      i18n.changeLanguage(nextLng).then(() => message.show(`切换语言成功！当前语言为：${nextLng}`));
    }}>lng</BaseMenu>
    <Menu options={useMenuOptions()}
          className='app-menu'
          shrinkText={t('menu.shrink')}
          expandText={t('menu.expand')}/>
    <div className="app-content">
      <Routes>
        <Route path='/time-total' element={<TimeTotal/>}/>
        <Route path='/knowledge-review' element={<KnowledgeReview/>}/>
        <Route path='/demo/index-db' element={<IndexDBDemo/>}/>
        <Route path='/demo/local-db' element={<LocalDBDemo/>}/>
        <Route path='/component/select' element={<SelectView/>}/>
        <Route path='/component/input' element={<InputView/>}/>
        <Route path='/component/modal' element={<ModalView/>}/>
      </Routes>
    </div>
  </div>
}

function useMenuOptions(){
  const {t} = useTranslation()

  return useMemo(()=>{
    return [
      {text:t('menu.studyTimeTotal'),to:'/time-total'},
      // {text:'知识复习',to:'/knowledge-review'},
      {text:t('menu.indexDB test'),to:'/demo/index-db'},
      {text:t('menu.Modal test'),to:'/component/modal'},
      // {text:'localDB测试',to:'/demo/local-db'},
      // {text:'SelectView',to:'/component/select'},
      // {text:'InputView',to:'/component/input'},
    ]
  },[t])
}
