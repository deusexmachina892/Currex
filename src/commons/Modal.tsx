import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import isEmpty from 'lodash.isempty';
import pick from 'lodash.pick';

import { formatDigits } from '../helpers/formatDigits';
import { DISPLAY_CONFIG } from '../constants/config';

const INITIAL_STATE = {
    rate: { title: 'Exchange Rate', value: '0' }, 
    subtotal: { title: 'Subtotal', value: '0'}, 
    commission: { title: 'Commission', value: '0' },
    totalBase: { title: 'Total', value: '0' },
    type: '',
    currency: '',
    currencyAmount: '',
    msg: {},
}
class CustomModal extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.renderContent = this.renderContent.bind(this);
    this.calculateMeta = this.calculateMeta.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps, prevState){
      if(this.props.modal){
        const updateState = {};
        if( this.props.data){
            const dataArray = [ 
                                'rate', 
                                'type', 
                                'currency'
                            ];
            dataArray.forEach( data => {
                if(prevProps.data[data] !== this.props.data[data]){
                 updateState[data] = data === 'rate'? { ...this.state.rate, value: this.props.data[data]}: this.props.data[data];
                }
            });
    
        }
    
        if (!isEmpty(this.props.currencies)){
            if(!this.props.currencies.loading){
                if(prevProps.currencies.timestamp !== this.props.currencies.timestamp){
                    if(this.props.currencies.errors){
                           updateState['msg'] = {
                                        data: this.props.currencies.errors,
                                        color: '#FF0000'
                           };
                    } else {
                        updateState['msg'] = {
                            data: 'Your transactions was successful!',
                            color: '#006400'
                        }
                    }
                }
               
            }
        }
        if (!isEmpty(updateState)){
            this.setState({
                ...this.state,
                ...updateState
            });
        }

        // recalculate on rate change
        if(prevProps.data.rate && this.props.data.rate){
            if(prevProps.data.rate !== this.props.data.rate){
                this.calculateMeta(this.state.currencyAmount);
            }
        }
      } else {
          // clean up on modal close
          this.setState(INITIAL_STATE);
      }
  }

  calculateMeta(amount){
    if(!isEmpty(this.props.data)){
        const { commissionPct, surcharge, minCommission, rate, type } = this.props.data;
        if( commissionPct && surcharge && minCommission && rate && type){
            let subtotal = Number(amount)/Number(rate); // rate is in terms of base currency, for ex 1 USD = 0.8 EUR; subtotal is always in base currency
            let commission = Math.max(((commissionPct+surcharge)/100 * subtotal), minCommission);

            // if buy, add commission to total payable base currency, else subtract from receivable base
            let totalBase = type === 'Buy'? (subtotal + commission) : (subtotal - commission);
            this.setState({ 
                subtotal: {
                    ...this.state.subtotal,
                    value: parseFloat(subtotal.toString()).toFixed(2)
                },
                commission:{
                    ...this.state.commission,
                    value: parseFloat(commission.toString()).toFixed(2)
                },
                totalBase: {
                    ...this.state.totalBase,
                    value: parseFloat(totalBase.toString()).toFixed(2)
                },
                currencyAmount: amount
            });
        }
    } else {
        return;
    }
}
  
  handleSubmit(e){
    e.preventDefault();
    const { 
        currency, 
        currencyAmount, 
        totalBase: { value },
        type 
    } = this.state;

    const { currencies, base } = this.props;
    const { updateStock } = this.props;
    this.setState({
        msg: 'Processing transaction',
        color: '#FFEF03'
    }, () => {
        updateStock( {currency, currencyAmount, value, type, currencies: currencies.data, base});
    })
  }
  renderContent(){
    return Object.values(pick(this.state, DISPLAY_CONFIG)).map( ({ title, value }) => {
        return(
            <React.Fragment key={title}>
                {title === 'Total'? <hr /> : ''}
                <section style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', margin:'10px'}}>
                    <span>
                        <b>{ title }</b>
                    </span>
                    <span>
                        { title === 'Exchange Rate'?formatDigits(value, 4):formatDigits(value, 2) }
                    </span>
                </section>
            </React.Fragment>
        )
    })
  }
  render() {
      const { data: { currency, symbol, type, commissionPct, surcharge, minCommission}, base, currencies, updateStock } = this.props;
      const { error, loading } = currencies;
      const { msg } = this.state;
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>{type}{' '}{currency}</ModalHeader>
          <ModalBody>
              <div style={{height: '20px'}}>{!isEmpty(msg)?<span style={{ color: msg.color }}>{msg.data}</span>
                        :'Please enter an amount to start the transaction'
              }</div>
          <InputGroup>
            <InputGroupAddon addonType="prepend">{symbol}</InputGroupAddon>
            <Input placeholder="Amount" type="number" step="1" value={this.state.currentAmount} onChange={(e) => this.calculateMeta(e.target.value)}/>
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>
          <b style={{margin:'10px'}}>(* All calculations below are in { base })</b>
             { this.renderContent() }
          </ModalBody>
          <ModalFooter>
            <Button color='default' onClick={this.props.toggle}>Cancel</Button>{' '}
            <Button  style={{background:'#FFEF03', color:'#000', border:'none'}} onClick={(e) => this.handleSubmit(e) }>{type}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CustomModal;