import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Loadable from 'react-loadable';
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';
import { RouteComponentProps } from 'react-router-dom';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles.css';

// actions
import { loadConfig, loadCurrencies, updateConfig, orchestrateGetExchangeRates, updateCurrencyStock, getExchangeRates } from '../actions';

import { Loader } from '../commons/Loaders';

import Header from '../commons/Header';
import Home from '../components/Home';
import { any } from 'prop-types';
import { ConfigProps, CurrencyProps, ExchangeRateProps } from '../interfaces';


// Lazily Loaded Components
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

// interfaces for Props and State Validation
interface AppProps {
    config: ConfigProps,
    currencies: CurrencyProps,
    exchangeRate: ExchangeRateProps,
    loadConfig: typeof loadConfig,
    loadCurrencies: typeof loadCurrencies,
    orchestrateGetExchangeRates: typeof orchestrateGetExchangeRates,
    getExchangeRates: typeof getExchangeRates,
    updateConfig: typeof updateConfig,
    updateCurrencyStock: typeof updateCurrencyStock,
}

interface AppState{

}

class App extends React.Component<AppProps, AppState>{
    constructor(props: any){
        super(props);
    }
    componentDidMount(): void{
        const { loadConfig, loadCurrencies } = this.props;
        loadCurrencies();
        loadConfig();
    }
    componentDidUpdate(prevProps, prevState){
        if (!this.props.config.loading && !isEqual(prevProps.config, this.props.config)){
           const { config, currencies, exchangeRate, orchestrateGetExchangeRates,  getExchangeRates } = this.props;
           const { base, refresh_rate, margin } = config;
           // orchestration action with timer for api calls
           orchestrateGetExchangeRates( { base, currencies: currencies.data, margin, refresh_rate, getExchangeRates } );
        }

        // initial action call to for perfomance --> first call
        if(!isEmpty(this.props.currencies.data) && this.props.config.base && this.props.config.margin){
            if(isEmpty(prevProps.currencies.data) || (!prevProps.config.base && !prevProps.config.margin)){
                const { config: { base, margin }, currencies, getExchangeRates } = this.props;
                const { data } = currencies;
                getExchangeRates({ base, currencies: data, margin })
            }
        }
    }
    render(){
        const { config, currencies, exchangeRate, updateConfig, updateCurrencyStock } = this.props;
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


// state to props
const mapStateToProps = ({ config, currencies, exchangeRate }) => ({
   config,
   currencies,
   exchangeRate
});

// actions dispatched
const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadConfig: () => dispatch(loadConfig()),
    loadCurrencies: () => dispatch(loadCurrencies()),
    orchestrateGetExchangeRates: (payload) => dispatch(orchestrateGetExchangeRates(payload)),
    getExchangeRates: (payload) => dispatch(getExchangeRates(payload)),
    updateConfig: (payload) => dispatch(updateConfig(payload)),
    updateCurrencyStock: (payload) => dispatch(updateCurrencyStock(payload))
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);