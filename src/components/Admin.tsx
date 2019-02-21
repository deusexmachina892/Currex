import * as React from 'react';

class Admin extends React.PureComponent<any, any>{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <React.Fragment>
                <section className='admin'>
                    <header>Settings</header>
                    <main>  
                    <form>
                        <label>Refresh currency Exchange Rate every</label>
                        <input type="text" /> seconds
                        <label>Commission</label>
                        <input type="text" />
                        <label>Surcharge</label>
                        <input type="text" />
                        <label>Minimum Commission</label>
                        <input type="text" />
                        <label>Buy/Sell Margin</label>
                        <input type="text" />
                        <input type="submit" className="btn" value="Update" />
                    </form>
                    </main> 
                </section>
            </React.Fragment>
        )
    }
}

export default Admin;