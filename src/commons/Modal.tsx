import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import isEmpty from 'lodash.isempty';

class CustomModal extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
        rate: { title: 'Exchange Rate', value: '0' }, 
        subtotal: { title: 'Subtotal', value: '0'}, 
        commission: { title: 'Commission', value: '0' },
        total: { title: 'Total', value: '0' }
    }
    this.renderContent = this.renderContent.bind(this);
    this.calculateMeta = this.calculateMeta.bind(this);
  }
  componentDidUpdate(prevProps, prevState){
      if (prevProps.data.rate !== this.props.data.rate){
          this.setState({
              rate: { ...this.state.rate,
                value: this.props.data.rate
            }
        })
      }
    
  }
  calculateMeta(amount){
    if(!isEmpty(this.props.data)){
        const { commissionPct, surcharge, minCommission, rate } = this.props.data;
        if( commissionPct && surcharge && minCommission && rate){
            let subtotal = amount * rate;
            let commission = Math.max(((commissionPct+surcharge)/100 * subtotal), minCommission);
            let total = subtotal + commission;
            this.setState({
                subtotal: {
                    ...this.state.subtotal,
                    value: parseFloat(subtotal.toString()).toFixed(2)
                },
                commission:{
                    ...this.state.commission,
                    value: parseFloat(commission.toString()).toFixed(2)
                },
                total: {
                    ...this.state.total,
                    value: parseFloat(total.toString()).toFixed(2)
                }
            });
        }
    } else {
        return;
    }
}
  renderContent(){
    return Object.values(this.state).map( ({ title, value }) => {
        return(
            <React.Fragment key={title}>
                {title === 'Total'? <hr /> : ''}
                <section style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', margin:'10px'}}>
                    <span>
                        <b>{ title }</b>
                    </span>
                    <span>
                        { value }
                    </span>
                </section>
            </React.Fragment>
        )
    })
  }
  render() {
      const { data: { currency, symbol, type, commissionPct, surcharge, minCommission} } = this.props;
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>{type}{' '}{currency}</ModalHeader>
          <ModalBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend">{symbol}</InputGroupAddon>
            <Input placeholder="Amount" type="number" step="1" onChange={(e) => this.calculateMeta(e.target.value)}/>
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>
             { this.renderContent() }
          </ModalBody>
          <ModalFooter>
            <Button color='default' onClick={this.props.toggle}>Cancel</Button>{' '}
            <Button  style={{background:'#FFEF03', color:'#000', border:'none'}} onClick={this.props.toggle}>{type}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CustomModal;