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
import {useTranslation} from 'react-i18next';
import {BaseMenu} from "./base";
import {ModalView} from "./demos/components/Modal";
import IconDemo from "./demos/components/Icon";
import RadioDemo from "./demos/components/Radio";
import MessageDemo from "./demos/components/Message";

export default function App() {
    const {t, i18n} = useTranslation()
    return <div className="app">
        <BaseMenu size={64} onDoubleClick={() => {
            const nextLng = i18n.language === 'zh' ? 'en' : 'zh';
            i18n.changeLanguage(nextLng).then(() => {
                if(nextLng === 'en') return message.show(`Switch language successfully! The current language is: English`)
                message.show(`切换语言成功！当前语言为：中文`)
            });
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
                <Route path='/component/Icon' element={<IconDemo/>}/>
                <Route path='/component/radio' element={<RadioDemo/>}/>
                <Route path='/component/message' element={<MessageDemo/>}/>
            </Routes>
        </div>
    </div>
}

function useMenuOptions() {
    const {t} = useTranslation()

    return useMemo(() => {
        return [
            {
                text:'my',
                children:[
                    {text: t('menu.studyTimeTotal'), to: '/time-total'},
                    {text: t('menu.knowledge review'),to:'/knowledge-review'},
                ]
            },
            {
                text: t('menu.work'),
                children: [
                    {text: t('menu.indexDB test'), to: '/demo/index-db'},
                    {text: t('menu.localDB test'), to: '/demo/local-db'},
                ]
            },
            {
                text: t("menu.component test"),
                children: [
                    {text: t('menu.Modal'), to: '/component/modal'},
                    {text: 'Select', to: '/component/select'},
                    {text: 'Input', to: '/component/input'},
                    {text: 'Button', to:'/component/button'},
                    {text: 'Icon', to:'/component/icon'},
                    {text: 'Message', to:'/component/message'},
                    {text: 'Radio', to:'/component/radio'},
                ]
            }
        ]
    }, [t])
}
