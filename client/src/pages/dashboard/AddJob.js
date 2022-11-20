import React from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* job position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChangeInput}
          />
          {/* job company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChangeInput}
          />
          {/* job location */}
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleChangeInput}
            labelText="Job Location"
          />
          {/* job type */}
          <FormRowSelect
            labelText="type"
            name="jobType"
            value={jobType}
            handleChange={handleChangeInput}
            list={jobTypeOptions}
          />

          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleChangeInput}
            list={statusOptions}
          />

          <div className="btn-container">
            <button className="btn btn-block submit-btn" type="submit">
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={clearValues}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
