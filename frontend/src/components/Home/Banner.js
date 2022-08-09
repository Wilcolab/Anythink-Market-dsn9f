import React from "react";
import { connect } from "react-redux";
import logo from "../../imgs/logo.png";
import agent from "../../agent";
import { APPLY_QUERY_FILTER } from "../../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  onSearch: (page, payload) =>
    dispatch({ type: APPLY_QUERY_FILTER, page, payload }),
});

const Banner = (props) => {
  const handleClick = (ev) => {
    const searchValue = ev.target.value;
    const page = props.currentPage;
    ev.preventDefault();
    if (searchValue.length < 3) {
      props.onSearch(page, agent.Items.all(page));
    } else {
      props.onSearch(page, agent.Items.filter(page, `title=${searchValue}`));
    }
  };
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
        <span id="get-part">A place to get </span>
          <input id="search-box" onChange={handleClick}></input>
        <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Banner);
