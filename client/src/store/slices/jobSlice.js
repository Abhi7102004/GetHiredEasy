import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    singleJob: null,
    allAdminJobs: [],
    allAppliedJobs: [],
    allSearchedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    getAllJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setAllSearchedJobs: (state, action) => {
      state.allSearchedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const { getAllJobs, setSingleJob, setAllAdminJobs, setAllAppliedJobs,setSearchedQuery,setAllSearchedJobs } =
  jobSlice.actions;
export default jobSlice.reducer;
