import { Component } from 'react';
import './Learning.css'
import Information from './Information';
import Search from './Search';
import Test from './Test';
import { Filter } from '../../constant/main';
import api from "../../services/api";
import { Pagination } from '@mui/material';
class Learning extends Component {
    constructor(props){
        super(props);
        const data = [];
        this.state = {
            isDislayForm: false,
            username: 'Nguyễn Hải Đăng',
            birthDay: '11/08/2001',
            address: 'Hà Nội',
            university: 'Thằng Long University',
            searchKeyword: '',
            sortFilter: Filter.All,
            currentPage: 1,
            perPage: 10,
            totalPage: 10,
            listTest: data,
            listVisible: data,
        }
    }
    onInformation = () =>{
        this.setState({
            isDislayForm: !this.state.isDislayForm
        })
    }
    onCloseForm = ()=>{
        this.setState({
            isDislayForm: false
        })
    }
        componentDidMount() {
            const {
                currentPage,
                perPage,
            } = this.state;
            api.create().fetchListTest1(currentPage, perPage)
            .then(response => {
                
                this.setState({ listTest: response.data.data}, () => this.getVisible());
            })
            .catch((error) => {
            const { message } = error;
            console.log('error: ', message);
            });
        }
        
        searchOnClick(key) {
            console.log('search key ', key);
            this.getVisible();
        }
        
        searchKeywordOnChange(key) {
            this.setState({ searchKeyword : key })
        }
        
        sortFilterOnChange(key) {
            this.setState({ sortFilter : key }, () => {
            this.getVisible();
            })
        }
        
        getVisible() {
            const { searchKeyword, sortFilter, listTest } = this.state;
            const listVisible = [];
            for(let i = 0; i < listTest.length; i ++) {
            if(listTest[i].name.includes(searchKeyword)) {
                listVisible.push(listTest[i]);
            }
            }
        
            if(sortFilter === Filter.Point)
            {
                listVisible.sort(function (a, b) {
                return a.point - b.point;
                });
            }
            if(sortFilter === Filter.Time)
            {
                listVisible.sort(function (a, b) {
                return a.time - b.time;
                });
            }
        
            this.setState({ listVisible });
        }
    render(){
        var {isDislayForm ,username,
            birthDay,
            university,
            address,
            searchKeyword,
            sortFilter,
            currentPage,
            perPage,
            totalPage,
            listVisible,
        } = this.state ;
        totalPage = parseInt(this.state.totalPage / 5) + 1;
        var elmInformation = isDislayForm === true ? <Information onCloseForm = {this.onCloseForm}
                                                username = {username}
                                                birthDay={birthDay}
                                                address={address}
                                                university={university}
                                                ></Information> : '';
        return (
            <div className="row wraper-learning">
                <div className={isDislayForm === true ? 'col-xs-2 col-sm-2 col-md-2 col-lg-2':''}>
                    {elmInformation}
                </div>
                <div className={isDislayForm === true ? 'col-xs-10 col-sm-10 col-md-10 col-lg-10 khoahoc':'col-xs-12 col-sm-12 col-md-12 col-lg-12 khoahoc'}>
                    <div className='container'>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 search mt-25">
                                <div className='row'>
                                        {isDislayForm === false ?  <div className='col-xs-1 col-sm-1 col-md-1 col-lg-1'>
                                                                <div className='control-icon1'
                                                                onClick={this.onInformation}
                                                                ><i className="fas fa-bars" /></div>
                                                                </div>:''}
                                    
                                    <div className={isDislayForm === false ?'col-xs-11 col-sm-11 col-md-11 col-lg-11':'col-xs-12 col-sm-12 col-md-12 col-lg-12'} >
                                        <Search searchKeyword={searchKeyword}
                                                sortFilter={sortFilter}
                                                searchOnClick={(value) => this.searchOnClick(value)}
                                                searchKeywordOnChange = {(value) => this.searchKeywordOnChange(value)}
                                                sortFilterOnChange = {(value) => this.sortFilterOnChange(value)}
                                                currentPage={currentPage}
                                                perPage={perPage}
                                                totalPage={totalPage}
                                                listItem={listVisible}>
                                        </Search>
                                    </div>
                                
                                </div>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                <Test
                                    listItem={listVisible}
                                >
                                </Test>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 page'>
                                <Pagination count={totalPage}
                                            page={this.props.currentPage}
                                            variant="outlined"
                                            shape="rounded"
                                            style={{marginBottom: '1em',marginTop: '3em', backgroundColor: 'white',borderRadius: '5px'}}
                                            ></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Learning;
