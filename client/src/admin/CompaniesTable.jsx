import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2, MoreHorizontal, Trash2, Eye } from "lucide-react";
import { DUMMY_PROFILE_URL } from "@/utils/constants";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="text-center py-10">
      <img
        src="/api/placeholder/400/300"
        alt="No companies"
        className="mx-auto mb-4 w-64 h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        No companies registered yet
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Get started by adding your first company.
      </p>
    </div>
  );
};

const CompanyRow = ({ company, onDelete }) => {
  const navigate = useNavigate();
  return (
    <motion.tr
      key={company.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors duration-200"
    >
      <TableCell>
        <Avatar>
          <AvatarImage
            className="w-10 h-10 rounded-full"
            src={company?.logo || DUMMY_PROFILE_URL}
            alt={`${company.name} logo`}
          />
        </Avatar>
      </TableCell>
      <TableCell className="text-gray-600 dark:text-gray-400">
        {company.name}
      </TableCell>
      <TableCell className="hidden sm:table-cell text-gray-600 dark:text-gray-400">
        {moment(company.createdAt).format("YYYY-MM-DD")}
      </TableCell>
      <TableCell className="text-right">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                onClick={() => navigate(`/admin/companies/${company._id}/details`)}
                className="justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate(`/admin/companies/${company._id}`)}
                className="justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit2
                  className="mr-2 h-4 w-4"
                />
                Edit
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                onClick={() => onDelete(company.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </TableCell>
    </motion.tr>
  );
};

const CompaniesTable = ({ searchedText }) => {
  useGetAllCompanies();
  const { companies } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  const handleDelete = (id) => {
    console.log(`Delete company with id: ${id}`);
  };

  useEffect(() => {
    const filterCompanies =
      companies?.length > 0 &&
      companies?.filter((company) => {
        if (!searchedText) return true;
        return company?.name.toLowerCase().includes(searchedText.toLowerCase());
      });
    setFilteredCompanies(filterCompanies);
  }, [searchedText, companies]);

  if (companies && companies?.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-950/25 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Registered Companies
      </h2>
      <Table>
        <TableCaption className="text-gray-600 dark:text-gray-400">
          A list of your registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Logo
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">
              Name
            </TableHead>
            <TableHead className="hidden sm:table-cell text-gray-700 dark:text-gray-300">
              Date
            </TableHead>
            <TableHead className="text-right text-gray-700 dark:text-gray-300">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredCompanies?.map((company) => (
              <CompanyRow
                key={company._id}
                company={company}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
