import * as React from 'react';
import { Table, Tooltip } from 'reactstrap';
import * as moment from 'moment';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import { formatDigits } from '../helpers/formatDigits';
import CustomModal from '../commons/Modal';
import { Loader, LoaderExchange } from '../commons/Loaders';

class Home extends React.PureComponent<any, any>{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            modalData: {},
            modalConfigData: {},
            tooltipOpen: false,
            displayLoaderMsg: false
          };
        
        this.showDisplayMsg = this.showDisplayMsg.bind(this);
        this.hideDisplayMsg = this.hideDisplayMsg.bind(this);
        this.toggleBuyToolTip = this.toggleBuyToolTip.bind(this);
        this.toggleSellToolTip = this.toggleSellToolTip.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.renderCurrencyInfo = this.renderCurrencyInfo.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        if(!isEmpty(this.props.exchangeRate.rates) && this.state.displayLoaderMsg){
           this.hideDisplayMsg();
        }
        if(!isEqual(prevProps.exchangeRate.rates, this.props.exchangeRate.rates)){
            if(this.state.modal){
                console.log(this.state.modalData)
                this.setState({
                    modalData: {
                        ...this.state.modalData,
                        rate: formatDigits(this.state.modalData.type==='Buy'?
                                this.props.exchangeRate.rates[this.state.modalData.currency].buy
                                : this.props.exchangeRate.rates[this.state.modalData.currency].sell, 2)
                    }
                })
            }
        }
    }
    handleRowClick(currency, symbol, type, rate){

        // metadata for displaying on modal
        this.toggleModal({ currency, symbol, type, rate });
    }
    showDisplayMsg(){
        const { displayLoaderMsg } = this.state;
        this.setState({
            displayLoaderMsg: true
        })
    }
    hideDisplayMsg(){
        const { displayLoaderMsg } = this.state;
        this.setState({
            displayLoaderMsg: false
        })
    }
    toggleBuyToolTip(){
        const { tooltipBuyOpen } = this.state;
        this.setState({
            tooltipBuyOpen: !tooltipBuyOpen
        })
    }
    toggleSellToolTip(){
        const { tooltipSellOpen } = this.state;
        this.setState({
            tooltipSellOpen: !tooltipSellOpen
        })
    }
    toggleModal(data={}) {
        const { config: { commissionPct, surcharge, minCommission } } = this.props;
        data['commissionPct']= commissionPct;
        data['surcharge']= surcharge;
        data['minCommission']= minCommission;
        this.setState(prevState => ({
          modal: !prevState.modal,
          modalData: isEmpty(prevState.modalData)?data:{},
        }));
      }
    renderCurrencyInfo(){
        const { config, exchangeRate } = this.props;
        const { base, margin} = config;
        const { rates } = exchangeRate;
        const currencies = this.props.currencies.data;
        return currencies && Object.keys(currencies).map(currency => {
            if (currency !== base){
              
                const warningLevel = currencies[currency].stock <= currencies[currency].warningLevel;
                return(
                    <tr key={currency} >
                        <th scope="row">{currency}</th>
                        <td onClick={
                            () => rates[currency]?
                            this.handleRowClick(
                                currency, 
                                currencies[currency].symbol, 
                                'Buy', 
                                rates[currency].buy
                                )
                            :this.showDisplayMsg()}
                            >
                                {
                                    rates[currency]?
                                    formatDigits(rates[currency].buy, 4)
                                    :<LoaderExchange/>
                                }
                        </td>
                        <td onClick={
                            () => rates[currency]?
                            this.handleRowClick(
                                currency, 
                                currencies[currency].symbol, 
                                'Sell', 
                                rates[currency].sell
                                )
                            :this.showDisplayMsg()}
                            >
                            {
                                rates[currency]? 
                                    formatDigits(rates[currency].sell, 4)
                                    :<LoaderExchange />
                            }
                        </td>
                        <td className={warningLevel?'warn':'ok'}>
                            {formatDigits(currencies[currency].stock, 2)}
                        </td>
                    </tr>
                )
            }
        })   
    }
    render(){
        const { config, currencies, exchangeRate, updateCurrencyStock } = this.props;
        const { displayLoaderMsg } = this.state;
        let warningLevelForBase = false;
        if (currencies && currencies.data && config && config.base){
            warningLevelForBase = currencies.data[config.base].stock <= currencies.data[config.base].warningLevel;
        }
        return(
            <React.Fragment>
                <section className='home'>
                  <header className="info">Exchange Rates Shown as per {moment(exchangeRate.timestamp).format('YYYY/MM/DD hh:mm:ss a')}. 
                  You have <span 
                                className={warningLevelForBase?'warn':'okLevel'}
                            >
                            {currencies && currencies.data && currencies.data[config.base] && 
                                    formatDigits(currencies.data[config.base].stock, 2)} 
                            {' '}{config && config.base && config.base}
                            </span>{' '}left.
                 </header>
                  <main>
                    <div className='loader-msg'>{displayLoaderMsg && 'Please wait until the exchange rates have been loaded.'}</div>
                    {!isEmpty(config)?
                    (<Table striped>
                            <thead>
                            <tr>
                                <th>Currency</th>
                                <th id="toolTipBuy">Buy</th>
                                <Tooltip placement="top" isOpen={this.state.tooltipBuyOpen} target="toolTipBuy" toggle={this.toggleBuyToolTip}>
                                    Click on any BUY rate to initiate a BUY transaction!
                                </Tooltip>
                                <th id="toolTipSell">Sell</th>
                                <Tooltip placement="top" isOpen={this.state.tooltipSellOpen} target="toolTipSell" toggle={this.toggleSellToolTip}>
                                Click on any SELL rate to initiate a SELL transaction!
                                </Tooltip>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderCurrencyInfo()}
                            </tbody>
                        </Table>)
                        : <Loader />
                      }
                  </main>
                </section>
                <CustomModal 
                    toggle={this.toggleModal} 
                    modal={this.state.modal} 
                    data={this.state.modalData} 
                    updateStock={updateCurrencyStock} 
                    className='modal-dialog-centered'
                    currencies={this.props.currencies}
                    base={this.props.config.base}
                />
            </React.Fragment>
        )
    }
}

export default Home;