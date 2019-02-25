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
import { loadConfig, loadCurrencies, updateConfig, orchestrateGetExchangeRates, updateCurrencyStock, getExchangeRates } from '../actions';

import { Loader } from '../commons/Loaders';

import Header from '../commons/Header';
import Home from '../components/Home';
import { any } from 'prop-types';



const HomeLazy =  Loadable({
    loader: () => import('../components/Home'),
    loading: Loader,
});
const AdminLazy =   Loadable({
    loader: () => import('../components/Admin'),
    loading: Loader,
});
const Page404Lazy =   Loadable({
    loader: () => import('../commons/Page404'),
    loading: Loader,
});

interface AppProps {
    config: object,
    currencies: object,
    exchangeRate: object

}

class App extends React.Component<any, any>{
    constructor(props: any){
        super(props);
    }
    componentDidMount(){
        const { loadConfig, loadCurrencies } = this.props;
        loadCurrencies();
        loadConfig();
    }
    componentDidUpdate(prevProps, prevState){
        if (!this.props.config.loading && !isEqual(prevProps.config, this.props.config)){
           const { config, currencies, exchangeRate, orchestrateGetExchangeRates, getExchangeRates  } = this.props;
           const { base, refresh_rate, margin } = config;

           // action for first Api call to reduce initial load time
           getExchangeRates({ base, currencies: currencies.data, margin })

           // orchestration action with timer for api calls
           orchestrateGetExchangeRates( { base, currencies: currencies.data, margin, refresh_rate, getExchangeRates } );
        }
    }
    render(){
        const { config, currencies, exchangeRate, updateConfig, updateCurrencyStock, removeCurrencyError } = this.props;
        return(
            <div className='currEx'>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route path='/' exact render={
                                (props)=> (<HomeLazy 
                                                config={config} 
                                                currencies={currencies}
                                                exchangeRate={exchangeRate}
                                                updateCurrencyStock={updateCurrencyStock}
                                                removeCurrencyError={removeCurrencyError}
                                                {...props}
                                            />)
                            }/>
                            <Route path='/admin' exact render={
                                (props) => (<AdminLazy 
                                                config={config} 
                                                updateConfig={updateConfig} 
                                                {...props}
                                            />)
                            }/>
                            <Route  path='*' exact render={
                                (props) => (<Page404Lazy 
                                            {...props}
                                />)
                                } />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


const mapStateToProps = ({ config, currencies, exchangeRate }) => ({
   config,
   currencies,
   exchangeRate
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadConfig: () => dispatch(loadConfig()),
    loadCurrencies: () => dispatch(loadCurrencies()),
    orchestrateGetExchangeRates: (payload) => dispatch(orchestrateGetExchangeRates(payload)),
    getExchangeRates: (payload) => dispatch(getExchangeRates(payload)),
    updateConfig: (payload) => dispatch(updateConfig(payload)),
    updateCurrencyStock: (payload) => dispatch(updateCurrencyStock(payload)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);