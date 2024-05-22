import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import ShelterMenu from "../../components/Layout/ShelterMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const { Option } = Select;

const CreateProduct = (user) => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState(""); // Add age state
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [shelterId, setShelterId] = useState(null);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    // Assuming `user` has a `shelterId` property.
    if (auth?.user?.shelterId) {
      setShelterId(user.shelterId);
    }
  }, [user]);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("photo", photo);
      productData.append("age", age);
      productData.append("breed", breed);
      productData.append("category", category);
      productData.append("shelterId", shelterId);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Pet Added Successfully");
        navigate("/dashboard/shelter/products");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container m-3 p-3 mt-4">
        <div className="row">
          <div className="col-md-3">
            {/* <AdminMenu /> */}
            <ShelterMenu />
          </div>
          <div className="col-md-9  ">
            <h1>Add Pet Info</h1>
            <div className="m-1 w-75">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <h6>Enter Name:</h6>
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <h6>Write a Description:</h6>
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <h6>Enter Age:</h6>
                <input
                  type="number"
                  value={age}
                  placeholder="Enter age"
                  className="form-control"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <h6>Enter Breed:</h6>
                <input
                  type="text"
                  value={breed}
                  placeholder="Enter breed"
                  className="form-control"
                  onChange={(e) => setBreed(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Add Pet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
