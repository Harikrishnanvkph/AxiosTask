import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// this component display properties of choosen element
export default function Mapper({ map, isLoading, setIsLoading }) {
  const navigate = useNavigate();
  //used to update the choose object
  const [api, setApi] = useState(map);

  // updating nested object
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

// Updating object in api
  const updateAPI = async () => {
    console.log(api)
    try {
      await axios.put(
        `https://65ed55ba0ddee626c9b1786b.mockapi.io/products/${api.id}`,
        api
      );
      setIsLoading(!isLoading);
      setTimeout(()=>navigate("/"),1000)
    } catch (error) {
      console.error("Error updating API:", error);
    }
  };

  return (
    <>
      <div className="container edit">
        <div className="row edit-row">
          <InputMakeUp
            data={"name"}
            value={api.name}
            funcAPI={handleClick}
          />
          <InputMakeUp
            data={"username"}
            value={api.username}
            funcAPI={handleClick}
          />
          <InputMakeUp
            data={"email"}
            value={api.email}
            funcAPI={handleClick}
          />
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
          <InputMakeUp
            data={"phone"}
            value={api.phone}
            funcAPI={handleClick}
          />
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
      <div className="update m-3">
        <button className="button-update" onClick={updateAPI}>
          Update
        </button>
      </div>
    </>
  );
}

// Input component creates input field and heading
function InputMakeUp({ data, value, funcAPI }) {
  const title = data.split(".").pop()[0].toUpperCase() + data.split(".").pop().slice(1);
  return (
    <>
      <div className="edit-name col-lg-4 col-sm-6">
        <h5 className="pb-1">{title}</h5>
        <input
          type="text"
          id={data}
          value={value}
          name={data}
          onChange={funcAPI}
        />
      </div>
    </>
  );
}


/*
  const handleAPIChange = (event) => {
    const { name, value } = event.target;
    const llm = name.split(".");
    console.log(llm);
    switch (llm.length) {
      case 1:
        setApi({ ...api, [name]: value });
        break;
      case 2:
        if (llm[0] == "address") {
          setApi({
            ...api,
            address: {
              ...api.address,
              [name]: value,
            },
          });
        } else if (llm[0] == "company") {
          setApi({
            ...api,
            company: {
              ...api.company,
              [name]: value,
            },
          });
        }
        break;
      case 3:
        console.log("got in", llm);
        if (llm[0] == "address") {
          console.log("got in");
          if (llm[1] == "geo") {
            console.log("got in");
            setApi({
              ...api,
              address: {
                ...api.address,
                geo: {
                  ...api.address.geo,
                  lat: value,
                },
              },
            });
          }
        }
        break;
    }
  }; */