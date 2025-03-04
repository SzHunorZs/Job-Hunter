/* eslint-disable react/prop-types */
import JobFilterModal from "./JobFilterModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../state/authSlice.js";

const Joblist = ({ data, setSelectedJob }) => {
  const auth = useSelector(selectIsAuthenticated);
  const [filteredData, setFilteredData] = useState(data);
  const [searchInput, setSearchInput] = useState("");

  const [filters, setFilters] = useState({
    salaryFrom: "",
    salaryTo: "",
    type: "",
    city: "",
    homeOffice: false,
  });

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(searchKeyword);
  };

  const handleSearch = (keyword) => {
    setSearchInput(keyword);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = (text, filters) => {
    const filtered = data.filter((job) => {
      const matchedSearch =
        job.position.toLowerCase().includes(text.toLowerCase()) ||
        job.company.toLowerCase().includes(text.toLowerCase()) ||
        job.description.toLowerCase().includes(text.toLowerCase());

      const matchedFilters =
        (!filters.salaryFrom || job.salaryFrom >= filters.salaryFrom) &&
        (!filters.salaryTo || job.salaryTo <= filters.salaryTo) &&
        (!filters.type || job.type == filters.type) &&
        (!filters.city ||
          job.city.toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.homeOffice || job.homeOffice == filters.homeOffice);

      return matchedSearch && matchedFilters;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters(searchInput, filters);
  }, [data, searchInput, filters]);

  return (
    <>
    <div className="flex flex-col w-full justify-center">

      <div className="w-full h-1/5 p-5 shadow-md mb-5">
        <span className="font-bold text-4xl ">
          {auth ? "Álláshírdetések" : "Főoldal"}
        </span>
      </div>
      <div className="flex flex-col w-2/3 self-center justify-center">
        <div className="flex flex-col w-full justify-center">
          <div className="flex w-full">
            <p className="font-bold mb-2 mt-10">Böngéssz az állások között:</p>
          </div>

          <div className="flex flex-row">
            <input
              className=" bg-white rounded-md h-10 w-full outline-2 outline outline-slate-200 text-xl"
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              />
            <button
              className="bg-violet-700  hover:bg-violet-400 ease-linear transition-all duration-150 rounded-md h-10 outline-2 w-56 outline outline-black text-xl text-white ml-3"
              onClick={handleSearchClick}
              >
              Keresés
            </button>
            <JobFilterModal onFilter={handleFilter} />
          </div>
        </div>

        <div className="mt-7 mb-5">
          <span className="text-xl">Állás neve</span>
        </div>

        {filteredData.length === 0 && (
          <p className="font-bold">Nincs találat</p>
          )}

        <ul>
          {filteredData.map((job) => (
            <li key={job.id} onClick={() => setSelectedJob(job)}>
              <div className="flex flex-row  hover:bg-slate-200  ease-linear transition-all duration-150 justify-between shadow-md p-2">
                <div className="flex flex-col justify-start">
                  <p>
                    <strong>{job.position}</strong>
                  </p>
                  <p>{job.city}</p>
                </div>
                <div className="flex flex-col justify-end">
                  <span className="font-bold">
                    {job.salaryFrom}-{job.salaryTo} Ft
                  </span>
                  {job.type === "full-time" && <span>Teljes munkaidős</span>}
                  {job.type === "part-time" && <span>Részmunkaidős</span>}
                  {job.type === "internship" && <span>Gyakorlat</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
        </div>
    </>
  );
};

export default Joblist;
