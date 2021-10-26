import { Component } from 'react';
import './test.css'
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render(){
        const { listItem } = this.props;
        var elmListItem = listItem.map((listItem,index)=>{
            return <div key={index} className='col-xs-4 col-sm-4 col-md-4 col-lg-4 mt-25 card-test'>
                        <div className='card'>
                            <div className=' ml-10 mr-10 mt-25'>
                                <div className='tieude'>
                                    <h4>Test: {index+1}</h4>
                                    <input type="checkbox" className='form-check-input'/>
                                </div>
                                <div className='thongso-test'>
                                    <div className='row'>
                                        <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8'>
                                            <h5>Name:&nbsp;{listItem.name}</h5>
                                            <h6>Point:&nbsp;{listItem.point}</h6>
                                            <h6>Time:&nbsp;{listItem.time}</h6>
                                        </div>
                                        <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4 start'>
                                            <button className='btn btn-success'>Bắt đầu</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <h6>
                                        <ul className="stars">
                                            <li><span className="fa fa-star" aria-hidden="true"></span></li>
                                            <li><span className="fa fa-star" aria-hidden="true"></span></li>
                                            <li><span className="fas fa-star-half-alt" aria-hidden="true"></span></li>
                                            <li><span className="fas fa-star-half-alt" aria-hidden="true"></span></li>
                                            <li><span className="fas fa-star-half-alt" aria-hidden="true"></span></li>
                                        </ul>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
        })
        return (
            <div className='row'>
                {elmListItem}
            </div>
        );
    }
}

export default Test;
