import { Component } from 'react';

class TaskSearchControl extends Component {
    constructor(props){
        super(props);
        this.state ={
            filterName: ''
        }
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })

    }
    onClickFilter = () =>{
        this.props.onClickFilter(this.state.filterName)
    }
    render(){
        var {filterName} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..."  name='filterName' value={filterName}
                                onChange={this.onChange}/>
                    <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={this.onClickFilter}>
                        <span className="fa fa-search mr-5" />Tìm
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}

export default TaskSearchControl;
