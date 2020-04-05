import React, { Component } from 'react'

class Test extends Component {
    constructor(props){
        super(props);
        this.state={
            a: 10
        }
        console.log('Constructor');
    }
    componentDidMount() {
        console.log('componentDidMount')
        //API istekleri burda yazilacaq
        this.setState({
            a: 20
        })
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Did update');
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return false;
    }
    
    
    render() {
        console.log("Render")
        return (
            <div>
               
            </div>
        )
    }
}
export default Test;