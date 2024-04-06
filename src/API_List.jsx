import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function API_List({ list, isLoading, setIsLoading }) {
  // used to navigate - provided by react-dom
  const navigate = useNavigate();

  // performs deleting object from api
  const deleteAPI = async (id) => {
    await axios.delete(
      `https://65ed55ba0ddee626c9b1786b.mockapi.io/products/${id}`
    );
    setIsLoading(!isLoading);
    navigate("/");
  };

  return (
    <>
    {/* creating objects list screen */}
      <div className="api-home container-fluid m-0">
        <div className="api-list row">
          {list.map((it, index) => (
            <Card
              key={index}
              name={it.name}
              email={it.email}
              phone={it.phone}
              company_name={it.company.name}
              iObject={it}
              deleteAPI={deleteAPI}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// creating individual object
function Card({ name, email, phone, company_name, iObject, deleteAPI }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="host-cover col-lg-4 col-md-6 col-sm-12 p-2">
        <div className="host m-0 container-fluid row p-2">
          <div className="object-glimpse row col-8 m-0">
            <h5 className="object-glimpse-h4 col-12">{name}</h5>
            <h6 className="object-glimpse-h6 col-12">{company_name}</h6>
            <h6 className="object-glimpse-h6 col-12">{phone}</h6>
            <h6 className="object-glimpse-h6 col-12">{email}</h6>
          </div>
          <div className="opt-buttons row col-4 d-flex flex-column m-0">
            <button
              className="btn btn-success w-75"
              onClick={() => {
                navigate(`/${iObject.id}`);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger w-75"
              onClick={() => {
                deleteAPI(iObject.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
