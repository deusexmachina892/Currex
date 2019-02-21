import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';



class Header extends React.PureComponent<any, any>{
    private homeRef = React.createRef<Link>();
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.focusedSection(findDOMNode(this.homeRef.current));
      }
    focusedSection(node){
       node.focus();
       }
    render(){
        return(
            <section className='nav'>
                <main>
                    <header><h2>Airport Currency Exchange Office</h2></header>
                    <section className='tabs'>
                    <ul>
                        <li ><Link to={'/'} ref={this.homeRef}>Home</Link></li>
                        <li><Link to={'/admin'}>Admin</Link></li>
                        <li className="logo" />
                    </ul>
                    </section>
                </main>
            </section>
        )
    }
}

export default Header;