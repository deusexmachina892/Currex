import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';

class Menu extends React.PureComponent<any, any> {
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
                <div onClick={unMountAction} className='close-menu'><i className="fa fa-close fa-2x"></i></div>
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