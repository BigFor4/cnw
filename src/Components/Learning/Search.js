import { Component } from 'react';
import {
    Filter
} from '../../constant/main';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
        };
    }

    render(){
        const {
            searchOnClick,
            searchKeyword,
            sortFilter,
            searchKeywordOnChange,
            sortFilterOnChange,
        } = this.props;
        return (
            
                <div className='row search'>
                    <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
                        <div className="input-group search-input">
                            <input type="text" className="form-control" placeholder="Nhập từ khóa..." value={searchKeyword}
                                onChange={(event) => searchKeywordOnChange( event.target.value) }/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button"  onClick={() => searchOnClick(searchKeyword)}>
                                    <span className="fa fa-search mr-5" />Tìm
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                        <select name="filter" className="form-select search-select"
                            id="filter"
                            value={sortFilter}
                            onChange={(event) => {
                                sortFilterOnChange(parseInt(event.target.value))
                            }} >
                            <option value={Filter.All}>All</option>
                            <option value={Filter.Time}>Time</option>
                            <option value={Filter.Point}>Point</option>
                        </select>
                    </div>
                </div>
            
        );
    }
}

export default Search;
