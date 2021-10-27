import React, { Component } from "react";
import axios from "axios";
import "./Learning.css";
import Information from "./Information";
import Search from "./Search";
import Test from "./Test";
import { Filter } from "../../constant/main";

import Panigation from "./Panigation";

class Learning extends Component {
  constructor(props) {
    super(props);
    const data = [];
    this.state = {
      isDislayForm: false,
      username: "Nguyễn Hải Đăng",
      birthDay: "11/08/2001",
      address: "Hà Nội",
      university: "Thằng Long University",
      searchKeyword: "",
      sortFilter: Filter.All,
      currentPage: 1,
      perPage: 9,
      totalPage: 0,
      listTest: data,
      listVisible: data,
    };
  }
  onInformation = () => {
    this.setState({
      isDislayForm: !this.state.isDislayForm,
    });
  };
  onCloseForm = () => {
    this.setState({
      isDislayForm: false,
    });
  };
  async componentDidMount() {

    const data = await axios.get(
      "https://617821c99c328300175f5e3d.mockapi.io/data"
    );
    this.setState({ listTest: data.data });
  }


  searchKeywordOnChange(key) {
    this.setState({ searchKeyword: key });
  }

  sortFilterOnChange(key) {
    this.setState({ sortFilter: key });
  }

  handleNumberPage = (page,totolPage) => {
    if(page > 0 &&   page <= totolPage){
      this.setState({ currentPage: page });
    }
  };
  render() {
    var {
      isDislayForm,
      username,
      birthDay,
      university,
      address,
      searchKeyword,
      sortFilter,
      currentPage,
      perPage,
      totalPage,
      listVisible,
      listTest,
    } = this.state;
    const totalItem = listTest.length;
    const numberOnePage = 9;
    const indexOfLastPage = currentPage * perPage;

    const indexOfFirstPage = indexOfLastPage - perPage;
    var listItem = listTest.slice(indexOfFirstPage, indexOfLastPage);
    if (searchKeyword !== "") {
      listItem = [];
      for (let i = 0; i < listTest.length; i++) {
        if (listTest[i].name.includes(searchKeyword)) {
          listItem.push(listTest[i]);
        }
      }
    }
    if (sortFilter !== null) {
      if (sortFilter === Filter.Point) {
        listItem.sort(function (a, b) {
          return a.point - b.point;
        });
      }
      if (sortFilter === Filter.Time) {
        listItem.sort(function (a, b) {
          return a.time - b.time;
        });
      }
    }

    var elmInformation =
      isDislayForm === true ? (
        <Information
          onCloseForm={this.onCloseForm}
          username={username}
          birthDay={birthDay}
          address={address}
          university={university}
        ></Information>
      ) : (
        ""
      );
    return (
      <div className="row wraper-learning">
        <div
          className={
            isDislayForm === true ? "col-xs-2 col-sm-2 col-md-2 col-lg-2" : ""
          }
        >
          {elmInformation}
        </div>
        <div
          className={
            isDislayForm === true
              ? "col-xs-10 col-sm-10 col-md-10 col-lg-10 khoahoc"
              : "col-xs-12 col-sm-12 col-md-12 col-lg-12 khoahoc"
          }
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12  mt-50">
                <div className="row">
                  {isDislayForm === false ? (
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                      <div
                        className="control-icon1"
                        onClick={this.onInformation}
                      >
                        <i className="fas fa-bars" />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className={
                      isDislayForm === false
                        ? "col-xs-11 col-sm-11 col-md-11 col-lg-11"
                        : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
                    }
                  >
                    <Search
                      searchKeyword={searchKeyword}
                      sortFilter={sortFilter}
                      searchOnClick={(value) => this.searchOnClick(value)}
                      searchKeywordOnChange={(value) =>
                        this.searchKeywordOnChange(value)
                      }
                      sortFilterOnChange={(value) =>
                        this.sortFilterOnChange(value)
                      }
                      currentPage={currentPage}
                      perPage={perPage}
                      totalPage={totalPage}
                      listItem={listVisible}
                    ></Search>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Test listItem={listItem}></Test>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 page">
                <Panigation
                  totalItem={totalItem}
                  numberOnePage={numberOnePage}
                  numberPage={this.handleNumberPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Learning;
