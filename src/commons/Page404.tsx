import * as React from 'react';
import { Container } from 'reactstrap';
class Page404 extends React.PureComponent<any, any>{
    constructor(props: any){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <div className="page404" >
                <h2>404. Sorry! Page Does Not Exist!</h2>
                <h2>Make Sure that you have entered the right path</h2>
                </div>
            </React.Fragment>
        )
    }
}

export default Page404;