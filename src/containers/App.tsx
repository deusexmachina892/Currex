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
class App extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            perfTime: performance.now()
        }
    }
    componentDidMount(){
        const { loadConfig, loadCurrencies } = this.props;
        loadCurrencies();
        loadConfig();
    }
    componentDidUpdate(prevProps, prevState){
        if (!this.props.config.loading && !isEqual(prevProps.config, this.props.config)){
           const { config, currencies, exchangeRate, orchestrateGetExchangeRates, getExchangeRates  } = this.props;
           const { base, refresh_rate } = config;
           orchestrateGetExchangeRates( { base, currencies: currencies.data, refresh_rate, getExchangeRates } );
        }
        if(this.props.exchangeRate.rate){
            console.log(performance.now() - this.state.perfTime)
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
    updateCurrencyStock: (payload) => dispatch(updateCurrencyStock(payload))
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);