import React, { useEffect } from "react";

import { setAllApplicants } from "@/store/slices/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { APPLICATION_ROUTE } from "@/utils/constants";
import ApplicantsTable from "./ApplicantsTable";
import { apiClient } from "@/lib/apiClient";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await apiClient.get(
          `${APPLICATION_ROUTE}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div className="w-full mx-auto">
      <h1 className="font-bold text-xl my-5">
        Applicants {applicants?.applications?.length}
      </h1>
      <ApplicantsTable />
    </div>
  );
};

export default Applicants;
