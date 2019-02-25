import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link, RouteComponentProps} from 'react-router-dom';
import { NavMenuConfigProps } from '../constants/config';

interface MenuProps{
    readonly mountPath: string,
    readonly unMount: boolean,
    readonly displayed: boolean,
    readonly menuConfig: Array<NavMenuConfigProps>,
    readonly unMountActionComplete: () => void,
    readonly close: () => void,
    readonly unMountAction: () => void,

}
interface MenuState{
    cssClass: string
}

class Menu extends React.PureComponent<MenuProps, MenuState> {
    private homeRef = React.createRef<Link>();
    private adminRef = React.createRef<Link>();
    constructor(props){
        super(props);
        this.state = {
            cssClass: 'nav-small-menu-open'
        }
    }
    componentDidMount(){
        const { mountPath } = this.props
        const node = mountPath === '/'? this.homeRef.current:this.adminRef.current;
        this.focusedItem(findDOMNode(node));
    }
    componentDidUpdate(prevProps){
        if(this.props.unMount){
            this.setState({
                cssClass: 'nav-small-menu-closed'
            })
        }
    }
    focusedItem(node){
        node.focus();
    }

    render(){
        const { menuConfig, close, unMountAction, unMountActionComplete } = this.props;
        const { cssClass } = this.state;
        return(
            <div className={`nav-small-menu ${cssClass}`}
                 onAnimationEnd={event => {
                    if(event.animationName === "closeMenu"){
                        close();
                        unMountActionComplete();
                    } 
                 }
                }
            >
                <div onClick={() => unMountAction()} className='close-menu'><i className="fa fa-close fa-2x"></i></div>
                <div className='logo' />
                <div className='menu'>
                    {
                        menuConfig.map( ({item, link}) => {
                            return(
                                <div key={item}>
                                    <Link to={link} ref={item === 'Home'?this.homeRef:this.adminRef}>{item}</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Menu;