import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Globe,
  MapPin,
  FileText,
  Upload,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { UPDATE_COMPANY_ROUTE } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/store/slices/companySlice";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { companyId } = useParams();
  useGetCompanyById(companyId);
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }));
  };
  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
        formData.append("file", input.file);
      }

      const response = await apiClient.put(
        `${UPDATE_COMPANY_ROUTE}/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setSingleCompany({ ...input, ...response?.data?.company }));
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
    >
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/companies")}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Company Setup
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="flex items-center text-gray-700 dark:text-gray-200"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Company Name
          </Label>
          <Input
            id="name"
            name="name"
            value={input.name}
            onChange={handleChange}
            placeholder="Enter company name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="flex items-center text-gray-700 dark:text-gray-200"
          >
            <FileText className="w-4 h-4 mr-2" />
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={input.description}
            onChange={handleChange}
            placeholder="Describe your company"
            rows={4}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="website"
            className="flex items-center text-gray-700 dark:text-gray-200"
          >
            <Globe className="w-4 h-4 mr-2" />
            Website
          </Label>
          <Input
            id="website"
            name="website"
            value={input.website}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="location"
            className="flex items-center text-gray-700 dark:text-gray-200"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={input.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="logo"
            className="flex items-center text-gray-700 dark:text-gray-200"
          >
            <Upload className="w-4 h-4 mr-2" />
            Company Logo
          </Label>
          <Input
            id="logo"
            name="logo"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-all ease-in-out duration-150"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Updating...
            </div>
          ) : (
            "Update Company Details"
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default CompanySetup;
