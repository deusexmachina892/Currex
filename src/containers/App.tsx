import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as Loadable from 'react-loadable';

import Loader from '../commons/Loader';
// import styles from './styles.css';

import Header from '../commons/Header';
import Home from '../components/Home';
export function slowImport(value, ms = 1000) {
    return new Promise<any>(resolve => {
      setTimeout(() => resolve(value), ms);
    });
  }

// const HomeLazy = (props) =>{
//     return(
//         <Home />
//     )
// }

// const AdminLazy = (props) =>{
//     return(
//         <Home />
//     )
// }
const HomeLazy =  Loadable({
    loader: () => import('../components/Home'),
    loading: Loader,
});
const AdminLazy =   Loadable({
    loader: () => import('../components/Admin'),
    loading: Loader,
});
export default class App extends React.Component{
    componentDidMount(){
        
    }
    render(){
        return(
            <div className='currEx'>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route path='/' exact component={HomeLazy} />
                            <Route path='/admin' exact component={AdminLazy} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}