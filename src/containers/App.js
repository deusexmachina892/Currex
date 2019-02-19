import React, { Component, Suspense } from 'react';
import styles from './styles.css';

const Description = React.lazy(() => import('../Description'));
const Cast = React.lazy(() => slowImport(import('../components/Home'), 1000));

export default class LazySuspense extends Component{
    state = {
        countTime: false
    }
    setTime = (countTime) => this.setState({ countTime });
    render(){
        const { countTime } = this.state;
    return(
        <div>
            
        </div>
    )
    }
}