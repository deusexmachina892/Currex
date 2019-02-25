import * as React from 'react';
import isEqual from 'lodash.isequal';
import { ADMIN_CONFIG } from '../constants/config';
import { Container, Row, Col, Form, FormGroup, InputGroup, InputGroupAddon, Input , Label, Button } from 'reactstrap';

class Admin extends React.PureComponent<any, any>{
    constructor(props){
        super(props);
        this.state = {
            refresh_rate: this.props.config.refresh_rate || '',
            commissionPct: this.props.config.commissionPct ||'',
            surcharge: this.props.config.surcharge ||'',
            minCommission: this.props.config.minCommission ||'',
            margin: this.props.config.margin || ''
        }
        this.renderFormFields = this.renderFormFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // work on this
    componentDidUpdate(prevProps, prevState){
        if( this.props.config){
            const configArray = [ 
                                'refresh_rate', 
                                'commissionPct', 
                                'surcharge', 
                                'minCommission', 
                                'margin'
                            ];
            const updateState = {};
            configArray.forEach( config => {
                if(prevProps.config[config] !== this.props.config[config]){
                    updateState[config] = this.props.config[config]
                }
            });

            this.setState({
                ...this.state,
                ...updateState
            });
        }
    }
    handleSubmit(e){
        e.preventDefault();
        const { updateConfig } = this.props;
        updateConfig(this.state);
    }
    renderFormFields(){
        return ADMIN_CONFIG.map(({ label, name}) => {
            const value = this.state[name];
            return(
                <FormGroup key={name}>
                <Row>
                    <Col md='5'>
                        <Label>
                            { label }
                        </Label>
                    </Col>
                    <Col md='3'>
                        <InputGroup>
                            <Input 
                                laceholder='' 
                                type='number' 
                                step='1' 
                                name={name} 
                                value={value} 
                                onChange={(e) => this.setState({ [name]: e.target.value})}
                            />
                            <InputGroupAddon addonType='append'>%</InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </FormGroup>
            )
        })
    }
    render(){
        if(this.props.config.success){
            var { success } = this.props.config;
        }
        const { loading } = this.props.config;
        const { refresh_rate } = this.state;
        // console.log(this.props);
        return(
            <React.Fragment>
                <section className='admin'>
                <Container>
                    <header>
                        <Row>
                            <i className='fa fa-cog fa-2x' aria-hidden='true'></i>
                            <h4>Settings</h4>
                        </Row>
                    </header>
                    <main>  
                           <Row>{loading?'Please wait while information is being loaded'
                                       : (typeof success !== 'undefined'?
                                            (success? 'Successfully updated configuration'
                                            : 'Something went wrong while updating. Please try again!')
                                            :'') }</Row>
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <FormGroup>
                                <Row>
                                    <Col  md='5'>
                                        Refresh currency exchange rates every
                                    </Col>
                                    <Col  md='3'>
                                        <Input 
                                            placeholder='Sec' 
                                            type='number' 
                                            step='1' 
                                            name='refresh_rate' 
                                            value={refresh_rate}
                                            onChange={(e)=>this.setState({ refresh_rate: e.target.value })}
                                        />
                                    </Col>
                                    <Col md='1'>
                                        seconds
                                    </Col>
                                </Row>   
                            </FormGroup>
                         
                            { this.renderFormFields()}
                            <FormGroup>
                                 <Row >
                                     <Col md='5'></Col>
                                     <Col md='3'><Button style={{float: 'right', background:'#FFEF03', color:'#000', border:'none'}}>Update</Button></Col>
                                </Row>
                            </FormGroup>
                            </Form>
                    </main>
                    </Container> 
                </section>
            </React.Fragment>
        )
    }
}

export default Admin;