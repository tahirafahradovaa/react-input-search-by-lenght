import React, { useEffect, useState } from "react";

function Template() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const getData = () => {
    setOrders([]);
    fetch("https://northwind.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilter(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const handleEvent = () => {
    if (!search) {
      setFilter([...orders]);
    } else {
      setFilter(orders.slice(0, +search));
    }
  };
  return (
    <>
      <div>
        <input
          onChange={(e) => {
            setSearch(e.target.value.trim(""));
          }}
          type="number"
          placeholder="search"
        />
        <button onClick={handleEvent}>Get</button>
        <table className="w3-table w3-striped w3-border">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Employee ID</th>
              <th>Ship Name</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((element) => {
              return (
                <>
                  <tr>
                    <td>{element.customerId}</td>
                    <td>{element.employeeId}</td>
                    <td>{element.shipName}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Template;
