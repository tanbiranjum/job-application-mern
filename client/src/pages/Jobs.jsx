import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Filter from "../components/Filter";
import JobDetails from "./JobDetails.jsx";
import { toast } from "react-toastify";
import FilterByType from "../components/FilterByType.jsx";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("An error occurred while fetching jobs.");
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async (keyword) => {
    setSelectedCategory("");
    setSelectedType("");
    setIsFiltering(false);

    if (keyword.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      setCurrentPage(1);
      navigate("/jobs");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5500/api/jobs/search?keyword=${keyword}`
      );
      if (response.data.length === 0) {
        toast.info("No jobs found for the given keyword.");
        setSearchResults([]);
        setIsSearching(true);
      } else {
        setSearchResults(response.data);
        setIsSearching(true);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching jobs:", error);
      toast.error("An error occurred while searching.");
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedType("");
    setIsSearching(false);

    if (category === "") {
      setFilteredJobs([]);
      setIsFiltering(false);
      setCurrentPage(1);
      navigate("/jobs");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5500/api/jobs/filter?Category=${category}`
      );
      if (response.data.length === 0) {
        setFilteredJobs([]);
        setIsFiltering(true);
        toast.info(`No jobs found for the "${category}" category.`);
      } else {
        setFilteredJobs(response.data);
        setIsFiltering(true);
        toast.success("Jobs filtered successfully!");
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering jobs by category:", error);
      toast.error("An error occurred while filtering jobs.");
    }
  };

  const handleTypeChange = async (e) => {
    const job_type = e.target.value;
    setSelectedType(job_type);
    setSelectedCategory("");
    setIsSearching(false);

    if (job_type === "") {
      setFilteredJobs([]);
      setIsFiltering(false);
      setCurrentPage(1);
      navigate("/jobs");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5500/api/jobs/type?job_type=${job_type}`
      );
      if (response.data.length === 0) {
        setFilteredJobs([]);
        setIsFiltering(true);
        toast.info(`No jobs found for the "${job_type}" type.`);
      } else {
        setFilteredJobs(response.data);
        setIsFiltering(true);
        toast.success("Jobs filtered successfully!");
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering jobs by type:", error);
      toast.error("An error occurred while filtering jobs.");
    }
  };

  const handleJobClick = (job) => {
    setSelectedJobId(job._id);
  };

  const handleCloseDetails = () => {
    setSelectedJobId(null);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = isSearching
    ? searchResults.slice(indexOfFirstJob, indexOfLastJob)
    : isFiltering
    ? filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
    : jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalJobs = isSearching
    ? searchResults.length
    : isFiltering
    ? filteredJobs.length
    : jobs.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between items-center p-4 space-x-4">
        <h2 className="text-lg font-bold items-center text-center p-2">
          Browse Jobs
        </h2>
        <Filter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <FilterByType
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
        <Search onSearch={handleSearch} />
      </div>

      <div className="mx-4 grid grid-cols-1 min-h-[50vh] items-center justify-items-center">
        {currentJobs.length === 0 ? (
          <div className="text-center text-gray-500 col-span-1">
            {isFiltering && (selectedCategory || selectedType)
              ? `No jobs found for the "${selectedCategory || selectedType}" ${
                  selectedCategory ? "category" : "type"
                }.`
              : isSearching
              ? "No such jobs match your input."
              : "No jobs found."}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
            {currentJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg border-2 shadow-md p-2 hover:shadow-lg hover:scale-105 transition duration-300"
                style={{
                  background: `linear-gradient(135deg, white 50%, #cbd5e1 50%)`,
                  height: "180px",
                }}
                onClick={() => handleJobClick(job)}
              >
                <h3 className="text-sm font-semibold mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {job.description
                    ? job.description.slice(0, 30) + "..."
                    : "No description available"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Location: {job.location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Category: {job.Category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Type: {job.job_type}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        companiesPerPage={jobsPerPage}
        totalCompanies={totalJobs}
        paginate={paginate}
        currentPage={currentPage}
      />

      {selectedJobId && (
        <JobDetails jobId={selectedJobId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Jobs;
