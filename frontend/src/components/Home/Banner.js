import React from "react";
import { connect } from "react-redux";
import logo from "../../imgs/logo.png";
import agent from "../../agent";
import { APPLY_QUERY_FILTER } from "../../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  onSearch: (page, payload) =>
    dispatch({ type: APPLY_QUERY_FILTER, page, payload }),
});

function toggle() {
  const x = document.getElementById("search-box");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const Banner = (props) => {
  const handleClick = async (ev) => {
    const searchValue = ev.target.value;
    const page = props.currentPage;
    ev.preventDefault();
    if (searchValue.length < 3) {
      const data = await agent.Items.all(page);
      props.onSearch(page, { data });
    } else {
      const query = `title=${searchValue}`;
      const data = await agent.Items.filter(page, query);
      props.onSearch(page, { data, query: searchValue });
    }
  };

  const searchStyle = {
    display: "none",
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <table align="center">
            <tr>
              <td>A place to </td>
              <td onClick={toggle id="get-part"}>get </td>
              <td>
                <input
                  style={searchStyle}
                  id="search-box"
                  onChange={handleClick}
                ></input>
              </td>
              <td> the cool stuff.</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

// export default Banner;
export default connect(null, mapDispatchToProps)(Banner);
