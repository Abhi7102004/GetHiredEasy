import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Briefcase,
  Search,
  User,
  Settings,
  LogOut,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import { DUMMY_PROFILE_URL } from "@/utils/constants";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location=useLocation();
  const { user } = useSelector((store) => store.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains('dark')
  );
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    if(darkMode){
      document.body.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
    else{
      document.body.classList.add('dark');
      localStorage.setItem('theme','dark');
    }
  };
  const isActive=(path)=>{
    return location.pathname===path;
  }
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    // Check what your device prefers by default at first render 
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" && (storedTheme!=='dark' && prefersDark)) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    const handleDarkModeChange = () => {
      setDarkMode(document.body.classList.contains("dark"));
    };
    const observer=new MutationObserver(handleDarkModeChange);
    observer.observe(document.body,{
       attributeFilter:['class'],
       attributes:true
    })
    return ()=> observer.disconnect();
  }, []);
  const NavItems = () => (
    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 font-medium items-start">
      {(user?.role !== "recruiter"
        ? [
            { name: "Home", icon: Home, path: "/home" },
            { name: "Jobs", icon: Briefcase, path: "/jobs" },
            { name: "Browse", icon: Search, path: "/browse" },
          ]
        : [
            { name: "Companies", icon: Building, path: "/admin/companies" },
            { name: "Jobs", icon: Briefcase, path: "/admin/jobs" },
          ]
      ).map((item) => (
        <li key={item.name}>
          <Link
            to={item.path}
            className={`flex ${isActive(item.path) ? "text-purple-700 dark:text-purple-400 ":"" } items-center space-x-2 hover:text-purple-500 transition-colors duration-300 dark:hover:text-purple-500`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const UserSection = () => (
    <div className="mt-8 md:mt-0">
      {!user ? (
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <Link to="/login">
            <Button
              variant="outline"
              className="text-gray-800 dark:text-white border-gray-800 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-purple-500 dark:bg-purple-600 hover:bg-purple-600 dark:hover:bg-purple-700 text-white transition-all duration-300">
              Signup
            </Button>
          </Link>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar className="hover:ring-2 hover:ring-purple-500 transition-all duration-300 shadow-md">
                <AvatarImage
                  src={user?.profile?.profilePicture || DUMMY_PROFILE_URL}
                  alt="@shadcn"
                />
              </Avatar>
              <span className={`font-medium ${isActive('/profile') ? "text-purple-700 dark:text-purple-400 ":"" } text-gray-800 `}>
                {user.fullName}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white shadow-lg rounded-lg">
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage
                  src={user?.profile?.profilePicture || DUMMY_PROFILE_URL}
                  alt="profile_picture"
                />
              </Avatar>
              <div>
                <h4 className="font-medium text-lg">{user?.fullName}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              {user?.role === "student" && (
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              )}
              <Link to="/settings">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                onClick={() => setOpen(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
      {open && <Logout open={open} onOpenChange={setOpen} />}
    </div>
  );

  return (
    <nav className="px-6 lg:px-24 bg-yellow-100 dark:bg-transparent border-b-2 py-6 shadow-md transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
          <h1 className="text-3xl font-extrabold tracking-wide">
            Get<span className="text-purple-500 mx-1">Hired</span>
            <span>Easy</span>
          </h1>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-12">
          <NavItems />
          <UserSection />
          <button
            onClick={toggleTheme}
            className={`rounded-full p-2 ${
              darkMode
                ? "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                : "bg-gray-100 text-[#736464] hover:bg-gray-200"
            } transition-all duration-300`}
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleTheme}
            className={`rounded-full p-2 ${
              darkMode
                ? "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                : "bg-gray-100 text-[#736464] hover:bg-gray-200"
            } transition-all duration-300`}
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-5/12 bg-white dark:bg-gray-900 shadow-lg lg:hidden"
          >
            <div className="p-4 h-full flex flex-col">
              <button onClick={toggleSidebar} className="self-end mb-4">
                <X className="h-6 w-6 text-gray-800 dark:text-white" />
              </button>
              <div className="flex-grow overflow-y-auto">
                <NavItems />
                <UserSection />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
