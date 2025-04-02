import React from 'react';

const JobPostForm = () => {
  return (
    <form className="grid grid-cols-2 grid-rows-[maxContent_maxContent_maxContent_maxContent] p-5 gap-y-3 gap-x-5 bg-black">
      <div className="col-span-2">
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter Job Title"
          className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
        />
      </div>
      <div>
        <label htmlFor="companyName">Company Name</label>
        <br />
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Enter Company Name"
          className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <br />
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter Job Location"
          className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
        />
      </div>
      <div>
        <label htmlFor="experience">Experience</label>
        <br />
        <input
          type="text"
          id="experience"
          name="experience"
          placeholder="Enter Required Experiance"
          className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
        />
      </div>
      <div>
        <label htmlFor="salary">Salary</label>
        <br />
        <input
          type="text"
          id="salary"
          name="salary"
          placeholder="Enter Salary"
          className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
        />
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email Address"
          className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
        />
      </div>
      <div>
        <label htmlFor="experience">Expiry Date</label>
        <br />
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          placeholder="Enter Expiry Date"
          className="w-full shadow-[inset_0px_0px_5px_1px_#f7fafc90] text-sm px-4 py-3 mt-2 rounded-xl"
        />
      </div>
      <button
        type="submit"
        className="w-full col-span-2 self-center cursor-pointer text-base bg-[#7e6bd2] px-5 py-2 rounded-xl"
      >
        Submit
      </button>
    </form>
  );
};

export default JobPostForm;
