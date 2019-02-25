import * as React from 'react';
import { Container } from 'reactstrap';

export class Loader extends React.PureComponent{
    render(){
        return(
            <React.Fragment>
                <Container style={{width:'50px', height:'50px', textAlign: 'center'}}>
                    <div className="loader"><div></div></div>
                </Container>
            </React.Fragment>
        )
    }
}

export class LoaderExchange extends React.PureComponent{
    render(){
        return(
            <React.Fragment>
                <div className="loader-exchange-rate" />
            </React.Fragment>
        )
    }
}