import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from 'antd'; // Import Modal component from Ant Design

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data.success) {
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

    // update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage category</h1>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary ms-2"
                                                    onClick={() => {
                                                        setIsModalVisible(true);
                                                        setUpdatedName(c.name); // Set the updatedName state
                                                        setSelected(c);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => {
                                                        // Implement delete functionality here
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                            visible={isModalVisible}
                        >
                            {/* Add modal content here */}
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName} // Set the value using setValue
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
