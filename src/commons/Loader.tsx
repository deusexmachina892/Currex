import * as React from 'react';

class Loader extends React.PureComponent{
    render(){
        return(
            <React.Fragment>
                <div className='loader'>
                   Please wait! The content is being loaded...
                </div>
            </React.Fragment>
        )
    }
}

export default Loader;