import * as React from 'react';
import { Table } from 'reactstrap';
import * as moment from 'moment';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import CustomModal from '../commons/Modal';

class Home extends React.PureComponent<any, any>{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            modalData: {},
            modalConfigData: {}
          };
      
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.renderCurrencyInfo = this.renderCurrencyInfo.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        if(!isEqual(prevProps.exchangeRate.rates, this.props.exchangeRate.rates)){
            if(this.state.modal){
                this.setState({
                    modalData: {
                        ...this.state.modalData,
                        rate: parseFloat(this.props.exchangeRate.rates[this.state.modalData.currency]).toFixed(4)
                    }
                })
            }
        }
    }
    handleRowClick(currency, symbol, type, rate){

        // metadata for displaying on modal
        this.toggleModal({ currency, symbol, type, rate });
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
        return Object.keys(currencies).map(currency => {
            if (currency !== base){
                const buyRate = parseFloat((rates[currency] * (1+ (margin/100))).toString()).toFixed(4);
                const sellRate = parseFloat((rates[currency] * (1-(margin/100))).toString()).toFixed(4);
                return(
                    <tr key={currency} >
                        <th scope="row">{currency}</th>
                        <td onClick={() => this.handleRowClick(currency, currencies[currency].symbol, 'Buy', buyRate)}>{buyRate}</td>
                        <td onClick={() => this.handleRowClick(currency, currencies[currency].symbol, 'Sell', sellRate)}>{sellRate}</td>
                        <td>{parseFloat(currencies[currency].stock).toFixed(2)}</td>
                    </tr>
                )
            }
        })   
    }
    render(){
        const { config, currencies, exchangeRate, updateCurrencyStock } = this.props;
        return(
            <React.Fragment>
                <section className='home'>
                  <header className="info">Exchange Rates Shown as per {moment(exchangeRate.timestamp).format('YYYY/MM/DD hh:mm:ss a')}. You have {parseFloat(currencies.data[config.base].stock).toFixed(2)} {config.base} left.</header>
                  <main>
                    {!isEmpty(config) && !isEmpty(exchangeRate.rates)?
                    (<Table striped>
                            <thead>
                            <tr>
                                <th>Currency</th>
                                <th>Buy</th>
                                <th>Sell</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderCurrencyInfo()}
                            </tbody>
                        </Table>)
                        : 'Loading...'
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