import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import SideNav, { MenuIcon } from 'react-simple-sidenav';

import { NAV_MENU_CONFIG } from '../constants/config';

import Menu from './Menu';

interface HeaderProps extends RouteComponentProps<any>{
}

interface HeaderState {
    displayMenu: boolean
}

class Header extends React.PureComponent<HeaderProps, HeaderState>{
    private homeRef = React.createRef<Link>();
    private adminRef = React.createRef<Link>();
    constructor(props){
        super(props);
        this.state = {
            displayMenu: false
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
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
                            <MenuIcon  className='ham' onClick={() => this.handleToggleMenu()} />
                            <SideNav 
                                 title={<div className='logo' />}
                                titleStyle={{fontSize: '1rem', background: '#fff', padding: '0'}}
                                navStyle={{width: '60vw'}}
                                itemStyle={{listStyleType: 'none', borderBottom: ' 1 px solid #ddd', color: '#C0C0C0'}}
                                itemHoverStyle={{background: '#FFFACD', color: '#787878'}}
                                items={[...NAV_MENU_CONFIG.map( ({ item, link }) => {
                                    return(
                                        <Link to={link}>
                                            {item}
                                        </Link>
                                    )
                                }),
                                <div onClick={() => this.handleToggleMenu() }>
                                    Close Menu
                                </div>
                            ]
                            }
                                onHideNav={()=>this.handleToggleMenu()}
                                openFromRight={true}
                                showNav={displayMenu}
                            />
                            
                    </section>

                </main>
                <footer></footer>
               
            </section>
        )
    }
}

export default withRouter(Header);