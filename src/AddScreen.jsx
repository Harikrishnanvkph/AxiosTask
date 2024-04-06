import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//to add new api object
export default function AddScreen({ isLoading, setIsLoading }) {
  // default API object schema
  const defaultAPI = {
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };
  const navigate = useNavigate();
  const [api, setApi] = useState(defaultAPI);

  //updating nested object values
  const updateNestedObject = (keys, value) => {
    setApi((prevState) => {
      const updatedState = { ...prevState }; // Copy the state to avoid mutation
      let currentLevel = updatedState;

      // Traverse through each key to reach the nested object
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        currentLevel[key] = { ...currentLevel[key] }; // Create a copy of the current level
        currentLevel = currentLevel[key]; // Move to the next level
      }

      // Update the target property dynamically
      currentLevel[keys[keys.length - 1]] = value;

      return updatedState;
    });
  };

  // Usage example
  const handleClick = (event) => {
    updateNestedObject(event.target.name.split("."), event.target.value);
  };

  const addAPI = async () => {
    try {
      await axios.post(
        `https://65ed55ba0ddee626c9b1786b.mockapi.io/products/`,
        api
      );
      setIsLoading(!isLoading);
      navigate("/");
    } catch (error) {
      console.error("Error updating API:", error);
    }
  };

  return (
    <>
      <div className="container edit">
        <div className="row edit-row">
          <InputMakeUp data={"name"} value={api.name} funcAPI={handleClick} />
          <InputMakeUp
            data={"username"}
            value={api.username}
            funcAPI={handleClick}
          />
          <InputMakeUp data={"email"} value={api.email} funcAPI={handleClick} />
          <div className="col-12 row form">
            <h5 className="col-12 mt-2">Address</h5>
            <InputMakeUp
              data={"address.street"}
              value={api.address.street}
              funcAPI={handleClick}
            />
            <InputMakeUp
              data={"address.suite"}
              value={api.address.suite}
              funcAPI={handleClick}
            />
            <InputMakeUp
              data={"address.city"}
              value={api.address.city}
              funcAPI={handleClick}
            />
            <InputMakeUp
              data={"address.zipcode"}
              value={api.address.zipcode}
              funcAPI={handleClick}
            />
            <div className="col-12 row form">
              <h5 className="col-12 mt-2">Geo</h5>
              <InputMakeUp
                data={"address.geo.lat"}
                value={api.address.geo.lat}
                funcAPI={handleClick}
              />
              <InputMakeUp
                data={"address.geo.lng"}
                value={api.address.geo.lng}
                funcAPI={handleClick}
              />
            </div>
          </div>
          <InputMakeUp data={"phone"} value={api.phone} funcAPI={handleClick} />
          <InputMakeUp
            data={"website"}
            value={api.website}
            funcAPI={handleClick}
          />
          <div className="col-12 row form">
            <h5 className="col-12 mt-2">Company</h5>
            <InputMakeUp
              data={"company.name"}
              value={api.company.name}
              funcAPI={handleClick}
            />
            <InputMakeUp
              data={"company.catchPhrase"}
              value={api.company.catchPhrase}
              funcAPI={handleClick}
            />
            <InputMakeUp
              data={"company.bs"}
              value={api.company.bs}
              funcAPI={handleClick}
            />
          </div>
        </div>
      </div>
      <div className="add m-3 update">
        <button className="button-update" onClick={addAPI}>
          Add
        </button>
      </div>
    </>
  );
}

function InputMakeUp({ data, value, funcAPI }) {
  const title =
    data.split(".").pop()[0].toUpperCase() + data.split(".").pop().slice(1);
  return (
    <>
      <div className="edit-name col-lg-4 col-sm-6">
        <h5 className="pb-1">{title}</h5>
        <input type="text" value={value} name={data} onChange={funcAPI} />
      </div>
    </>
  );
}
