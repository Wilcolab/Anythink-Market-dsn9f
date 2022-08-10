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
  const handleClick = async (ev) => {
    const searchValue = ev.target.value;
    const page = props.currentPage;
    ev.preventDefault();
    if (searchValue.length < 3) {
      const data = await agent.Items.all(page);
      props.onSearch(page, {data});
    } else {
      const query = `title=${searchValue}`;
      const data = await agent.Items.filter(page, query);
      props.onSearch(page, {data, query: searchValue});
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

// export default Banner;
export default connect(null, mapDispatchToProps)(Banner);
