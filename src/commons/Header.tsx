import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import SideNav from 'react-simple-sidenav';

import { NAV_MENU_CONFIG } from '../constants/config';

import Menu from './Menu';

interface HeaderProps extends RouteComponentProps<any>{
}

interface HeaderState {
    displayMenu: boolean,
    unmountMenu: boolean
}

class Header extends React.PureComponent<HeaderProps, HeaderState>{
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
    componentDidMount():void{
        const node = this.props.location.pathname === '/'? this.homeRef.current:this.adminRef.current;
        this.focusedSection(findDOMNode(node));
      }
    focusedSection(node):void{
       node.focus();
       }
    handleToggleMenu():void{
        const { displayMenu } = this.state;
        this.setState({
            displayMenu: !displayMenu
        })
    }

    unmountMenuAction():void{
        this.setState({
            unmountMenu: true
        })
    }
    unMountMenuActionComplete():void{
        this.setState({
            unmountMenu: false
        })
    }
    renderContent(){
        return NAV_MENU_CONFIG.map(({ item, link }) => {
            return(
                <li key={item}>
                    <Link className='nav-spl-effect' to={link} ref={item === 'Home'?this.homeRef: this.adminRef}>{item}</Link>
                </li>
            )
        })
    }
    render(): JSX.Element{
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
                                   <SideNav 
                                   
                                        title="Simple Sidenav"
                                        items={['Item 1', 'Item 2']}
                                        openFromRight={true}
                                        showNav={displayMenu}
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