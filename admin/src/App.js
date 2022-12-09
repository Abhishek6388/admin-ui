import React, { useState, useEffect } from "react";

let SearchApi = () => {
  let [data, setData] = useState([]);
  let [apidata, setapidata] = useState([]);
  let [filterval, setfilterval] = useState("");

  useEffect(() => {
    let fetchData = () => {
      fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setapidata(json);
        });
    };
    fetchData();
  }, []);
  const handlefilter = (e) => {
    if (e.target.value == " ") {
      setData(apidata);
    } else {
      let filterresult = apidata.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filterresult);
    }
    setfilterval(e.target.value);
  };
  return (
    <>
      <input
        placeholder="search"
        onChange={(e) => handlefilter(e)}
        value={filterval}
      />
      <table>
        <th>id</th>
        <th>Name</th>
        <th>email</th>
        <th>role</th>
        {data.map((item) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};
export default SearchApi;
