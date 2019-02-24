import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

import { NAV_MENU_CONFIG } from '../constants/config';

import Menu from './Menu';

class Header extends React.PureComponent<any, any>{
    private homeRef = React.createRef<Link>();
    private adminRef = React.createRef<Link>();
    constructor(props){
        super(props);
        this.state = {
            displayMenu: false,
            unmountMenu: false
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.unmountMenuAction = this.unmountMenuAction.bind(this);
        this.unMountMenuActionComplete = this.unMountMenuActionComplete.bind(this);
    }
    componentDidMount(){
        const node = this.props.location.pathname === '/'? this.homeRef.current:this.adminRef.current;
        this.focusedSection(findDOMNode(node));
      }
    focusedSection(node){
       node.focus();
       }
    handleToggleMenu(){
        const { displayMenu } = this.state;
        this.setState({
            displayMenu: !displayMenu
        })
    }

    unmountMenuAction(){
        this.setState({
            unmountMenu: true
        })
    }
    unMountMenuActionComplete(){
        this.setState({
            unmountMenu: false
        })
    }
    renderContent(){
        return NAV_MENU_CONFIG.map(({ item, link }) => {
            return(
                <li key={item}>
                    <Link to={link} ref={item === 'Home'?this.homeRef: this.adminRef}>{item}</Link>
                </li>
            )
        })
    }
    render(){
        const { displayMenu } = this.state;
        return(
            <section className='nav'>
                <main>
                    <header><h2>Airport Currency Exchange Office</h2></header>
                    <section className='tabs'>
                    <ul>
                        {this.renderContent()}
                        <li className="logo" />
                    </ul>
                    </section>
                    <section className="tabs-small">
                        <i className="fa fa-bars fa-2x ham" onClick={() => this.handleToggleMenu()}></i>
                               
                               {
                                   displayMenu &&
                                   <Menu 
                                     menuConfig={NAV_MENU_CONFIG} 
                                    close={this.handleToggleMenu} 
                                    displayed={this.state.displayMenu} 
                                    unMount={this.state.unmountMenu}
                                    unMountAction={this.unmountMenuAction}
                                    unMountActionComplete={this.unMountMenuActionComplete}
                                    mountPath={this.props.location.pathname}
                                />
                               }             
                    </section>
                </main>
                <footer></footer>
               
            </section>
        )
    }
}

export default withRouter(Header);