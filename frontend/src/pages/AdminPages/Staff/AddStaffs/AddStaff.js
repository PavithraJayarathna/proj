import React, { useState } from 'react';
import AdminSidebar from '../../../../component/AdminNavBar/AdminBar'; 
import './AddStaff.css'; 

const apiUrl = process.env.HOST_ADDRESS

const AddStaffForm = () => {
    const [formData, setFormData] = useState({
        Afirstname: '',
        Alastname: '',
        Aemail: '',
        Apassword: '',
        Agender: '',
        Adob: '',
        Adepartment: '',
        Aaddress: '',
        Auser_role: '',
        Aphonenumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.trim(),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        try {
            const response = await fetch(`${apiUrl}/api/addStaff`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                alert('Staff Records Successfully Added');
                setFormData({
                  Afirstname: '',
                  Alastname: '',
                  Aemail: '',
                  Apassword: '',
                  Agender: '',
                  Adob: '',
                  Adepartment: '',
                  Aaddress: '',
                  Auser_role: '',
                  Aphonenumber: '',
              });
            
              } else {
                alert(data.message || 'Data Already Exist');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding staff. Please try again.');
        }
    };

    return (
        <div>
            <AdminSidebar />
            <div className="Amain-container">
                <div className="Apd-ltr-20">
                    <div className="Apage-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="Atitle">
                                    <h4>Leave Safe</h4>
                                </div>
                                <nav aria-label="breadcrumb" role="navigation">
                                    <ol className="Abreadcrumb">
                                        <li className="Abreadcrumb-item">
                                            <a href="/dashboard">Dashboard</a>
                                        </li>
                                        <li className="Abreadcrumb-item REactive" aria-current="page">
                                            Add Staff
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="Acard-box form-container">
                        <div className="Apd-20">
                            <h2 className="Atext-BLACK h4">ADD STAFF</h2>
                        </div>
                        <div className="Apb-20">
                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                    <legend>Personal Information</legend>
                                    <div className="Aform-group-row">
                                        <div className="Aform-group">
                                            <label>First Name:</label>
                                            <input
                                                name="Afirstname"
                                                type="text"
                                                className="Aform-control"
                                                required
                                                value={formData.Afirstname}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="Aform-group">
                                            <label>Last Name:</label>
                                            <input
                                                name="Alastname"
                                                type="text"
                                                className="Aform-control"
                                                required
                                                value={formData.Alastname}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="Aform-group-row">
                                        <div className="Aform-group">
                                            <label>Email Address:</label>
                                            <input
                                                name="Aemail"
                                                type="email"
                                                className="Aform-control"
                                                required
                                                value={formData.Aemail}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="Aform-group">
                                            <label>Password:</label>
                                            <input
                                                name="Apassword"
                                                type="password"
                                                placeholder="**********"
                                                className="Aform-control"
                                                required
                                                value={formData.Apassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="Aform-group-row">
                                        <div className="Aform-group">
                                            <label>Gender:</label>
                                            <select
                                                name="Agender"
                                                className="Acustom-select Aform-control"
                                                required
                                                value={formData.Agender}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div className="Aform-group">
                                            <label>Date of Birth:</label>
                                            <input
                                                name="Adob"
                                                type="date"
                                                className="Aform-control"
                                                required
                                                value={formData.Adob}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="Aform-group-row">
                                        <div className="Aform-group">
                                            <label>Department:</label>
                                            <input
                                                name="Adepartment"
                                                type="text"
                                                className="Aform-control"
                                                required
                                                value={formData.Adepartment}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="Aform-group">
                                            <label>Address:</label>
                                            <input
                                                name="Aaddress"
                                                type="text"
                                                className="Aform-control"
                                                required
                                                value={formData.Aaddress}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="Aform-group-row">
                                        <div className="Aform-group">
                                            <label>User Role:</label>
                                            <input
                                                name="Auser_role"
                                                type="text"
                                                className="Aform-control"
                                                required
                                                value={formData.Auser_role}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="Aform-group">
                                            <label>Phone Number:</label>
                                            <input
                                                name="Aphonenumber"
                                                type="tel"
                                                className="Aform-control"
                                                required
                                                value={formData.Aphonenumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="Aform-group-row">
                                    <button type="submit" className="Abtn-primary">
                                        S U B M I T
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStaffForm;


