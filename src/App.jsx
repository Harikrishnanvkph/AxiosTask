import { useState, useEffect } from "react";
import axios from "axios";
import API_List from "./API_List";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Mapper from "./Mapper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddScreen from "./AddScreen";

function App() {
  const navigate = useNavigate();
  // Updating state after fetching api from mockapi
  const [apidata, setAPIData] = useState([]);
  // State to control the switching of page after load
  const [isLoading, setIsLoading] = useState(false);


  //to fetch the api and set it
  useEffect(() => {
    axios
      .get("https://65ed55ba0ddee626c9b1786b.mockapi.io/products")
      .then((res) => setAPIData(res.data));
  }, [isLoading]);

  return (
    <>
    {/* its the nav bar showing nav links */}
      <nav>
        <ul className="d-flex justify-content-around col-9">
          <li>
            <Link to="/">API Data</Link>
          </li>
        </ul>
        <ul className="col-3 d-flex justify-content-center">
          <li className="d-flex justify-content-center align-items-center"
          onClick={() => {
            navigate("/add");
          }}>
            <p className="pr-2 m-0 addSymbol">Add API</p>
            <AddCircleIcon
              fontSize="large"
              className="icon"
            />
          </li>
        </ul>
      </nav>
      <Routes>
        {/* This Route is used to navigate to home page to display products from object */}
        <Route element={<API_List list={apidata} isLoading={isLoading}
                setIsLoading={setIsLoading} />} path="/" />
        {apidata.map((it, index) => (
          <Route
            key={index}
            path={`/${it.id}`}
            element={
              <Mapper
                map={it}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isAdd={false}
              />
            }
          />
        ))}
        {/* to route to page to add data to api */}
        <Route
          path={`/add`}
          element={
            <AddScreen
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
