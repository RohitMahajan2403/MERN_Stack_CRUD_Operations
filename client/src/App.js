import { useEffect, useState } from 'react';
import './App.css';
import { MdClose } from 'react-icons/md';
import axios from "axios";
import Form from './component/Form';

// Ensure Axios uses the correct base URL
axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/create", formData);
      if (data.success) {
        setAddSection(false);
        alert(data.message);
        getFetchData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFetchData = async () => {
    try {
      const { data } = await axios.get("/");
      if (data.success) {
        setDataList(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete("/delete/" + id);
      if (data.success) {
        getFetchData();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/update", formDataEdit);
      if (data.success) {
        getFetchData();
        alert(data.message);
        setEditSection(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditOnchange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>ADD</button>

      {addSection && (
        <Form
          handleSubmit={handleSubmit}
          handleOnchange={handleOnchange}
          handleClose={() => setAddSection(false)}
          rest={formData}
        />
      )}

      {editSection && (
        <Form
          handleSubmit={handleUpdate}
          handleOnchange={handleEditOnchange}
          handleClose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No Data Found...!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
