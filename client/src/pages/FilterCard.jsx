import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocationData } from "@/hooks/useLocationData";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { FILTER_ROUTE } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllJobs, setAllSearchedJobs } from "@/store/slices/jobSlice";

const FilterCard = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  } = useLocationData();

  const [filters, setFilters] = useState({
    jobType: "",
    titleList: [],
    experienceLevel: "",
    salary: "",
    location: "",
  });

  useEffect(() => {
    const formattedAddress = [selectedCity, selectedState, selectedCountry]
      .filter(Boolean)
      .join(", ");

    setFilters((prev) => ({
      ...prev,
      location: formattedAddress,
    }));
  }, [selectedCountry, selectedState, selectedCity]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleTitleChange = (fullTitle) => {
    const title = fullTitle.split(" ")[0].toLowerCase();
    setFilters((prev) => {
      const updatedTitleList = prev.titleList.includes(title)
        ? prev.titleList.filter((i) => i !== title)
        : [...prev.titleList, title];
      return { ...prev, titleList: updatedTitleList };
    });
  };
  const handleSubmit = async (req, res) => {
    try {
      const response = await apiClient.post(FILTER_ROUTE, filters, {
        withCredentials: true,
      });
      if(response.data.success){
        dispatch(setAllSearchedJobs(response.data.jobs));
        navigate('/browse')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const jobTitles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "UI/UX Designer",
  ];
 
  return (
    <Card className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl text-center font-bold">
          Filter Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Location</Label>
          <Select onValueChange={handleCountryChange} value={selectedCountry}>
            <SelectTrigger className="bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem
                  key={country.country_name}
                  value={country.country_name}
                >
                  {country.country_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedCountry && (
            <Select onValueChange={handleStateChange} value={selectedState}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.state_name} value={state.state_name}>
                    {state.state_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {selectedState && (
            <Select onValueChange={handleCityChange} value={selectedCity}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.city_name} value={city.city_name}>
                    {city.city_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Job Type</Label>
          <Select
            onValueChange={(value) => handleFilterChange("jobType", value)}
            value={filters.jobType}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Title */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Job Title</Label>
          <div className="space-y-2">
            {jobTitles.map((fullTitle) => {
              const title = fullTitle.split(" ")[0].toLowerCase();
              return (
                <div key={fullTitle} className="flex items-center space-x-2">
                  <Checkbox
                    id={title}
                    checked={filters.titleList.includes(title)}
                    onCheckedChange={() => handleTitleChange(fullTitle)}
                  />
                  <Label htmlFor={title}>
                    {fullTitle}{" "}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
        {/* Experience Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Experience Level (Years)
          </Label>
          <Input
            type="text"
            placeholder="e.g., 2-5 years"
            value={filters.experienceLevel}
            onChange={(e) =>
              handleFilterChange("experienceLevel", e.target.value)
            }
            className="bg-white dark:bg-gray-800"
          />
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Salary Range (₹)</Label>
          <Select
            onValueChange={(value) => handleFilterChange("salary", value)}
            value={filters.salary}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select Salary Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-3">0-3 Lakh</SelectItem>
              <SelectItem value="3-6">3-6 Lakh</SelectItem>
              <SelectItem value="6-10">6-10 Lakh</SelectItem>
              <SelectItem value="10+">10+ Lakh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
