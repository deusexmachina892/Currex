import * as React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.PureComponent{
    render(){
        return(
            <div>
                Header
                <Link to={'/'}>Home</Link>
                <Link to={'/admin'}>Admin</Link>
            </div>
        )
    }
}

export default Header;