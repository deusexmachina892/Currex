import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Loadable from 'react-loadable';
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles.css';

// actions
import { loadConfig, getExchangeRates } from '../actions';

import Loader from '../commons/Loader';

import Header from '../commons/Header';
import Home from '../components/Home';


// Separate state props + dispatch props to their own interfaces.
// interface PropsFromState {
//     loading: boolean
//     data: Hero[]
//     errors: string
//   }
  
  // We can use `typeof` here to map our dispatch types to the props, like so.
  interface PropsFromDispatch {
    fetchRequest: typeof getExchangeRates
  }
  
  // Combine both state + dispatch props - as well as any props we want to pass - in a union type.
  type AllProps = PropsFromDispatch;

const HomeLazy =  Loadable({
    loader: () => import('../components/Home'),
    loading: Loader,
});
const AdminLazy =   Loadable({
    loader: () => import('../components/Admin'),
    loading: Loader,
});
class App extends React.Component<any, any>{
    constructor(props: any){
        super(props);
    }
    componentDidMount(){
        const { loadConfig } = this.props;
        loadConfig();
    }
    componentDidUpdate(prevProps, prevState){
        if (!this.props.config.loading && !isEqual(prevProps.config, this.props.config)){
           const { config, getExchangeRates  } = this.props;
           const { base, currencies } = config;
           getExchangeRates( { base, currencies } );
        }
    }
    render(){
        const { config, exchangeRate } = this.props;
        return(
            <div className='currEx'>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route path='/' exact render={(props)=> <HomeLazy config={config} exchangeRate={exchangeRate} {...props}/>}/>
                            <Route path='/admin' exact render={(props) => <AdminLazy {...props}/>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


const mapStateToProps = ({ config, exchangeRate }) => ({
   config,
   exchangeRate
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadConfig: () => dispatch(loadConfig()),
    getExchangeRates: (payload) => dispatch(getExchangeRates(payload))
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);