import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Search, Plus } from "lucide-react";
import CompaniesTable from "./CompaniesTable";
import { motion } from "framer-motion";

const Companies = () => {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (e) => {
    setSearchedText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
  };

  return (
    <div className="w-full mx-auto my-10 px-5">
      <div className="bg-white dark:bg-gray-950/25 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Companies
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Search Form with Enter and Exit Animation */}
          <Form
            onSubmit={handleSearchSubmit}
            className="w-full md:w-2/3 lg:w-1/2"
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                className="w-full pl-10 pr-14 py-2 rounded-full border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                onChange={handleSearchChange}
                placeholder="Search companies..."
                value={searchedText}
              />
              {/* Search Icon inside the Input field */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

              {/* Search Icon Button Inside Input */}
              <Button
                type="submit"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-full transition duration-300 ease-in-out"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </motion.div>
          </Form>

          {/* New Company Button */}
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Company
          </Button>
        </div>
      </div>
      <CompaniesTable searchedText={searchedText} />
    </div>
  );
};

export default Companies;
