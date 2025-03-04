/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";

const JobFilterModal = ({ onFilter }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const actualFilters = {
    salaryFrom: "",
    salaryTo: "",
    type: "",
    city: "",
    homeOffice: false,
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [filters, setFilters] = useState(actualFilters);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.type === "checkbox" ? (e.target.checked ? 1 : false) : e.target.value,
    });
  };

  const handleFilter = () => {
    onFilter(filters);
    closeModal();
  };

  const handleClear = () => {
    setFilters(actualFilters);
    onFilter(actualFilters);
    closeModal();
  };

  return (
    <>
      <button
        className="bg-white rounded-md  hover:bg-slate-600 hover:text-white ease-linear transition-all duration-150 h-10 outline-2 w-56 outline  outline-slate-200 text-xl text-gray-700 ml-3"
        onClick={openModal}
      >
        Szűrés
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            boxShadow: "2px 2px 5px 0px black",
          },
        }}
        contentLabel="Filter Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-row justify-between mb-5">
          <p className="text-xl font-bold">Szűrők</p>
          <button
            className="bg-slate-300 hover:bg-slate-600 hover:text-white ease-linear transition-all duration-150 rounded-md h-6 outline-2 w-6 outline outline-black text-sm text-black p-0,5"
            onClick={closeModal}
          >
            X
          </button>
        </div>

        <div className="flex w-full">
          <div className="flex flex-row w-full gap-3 mb-5">
            <div className="flex flex-col w-1/2">
              <span className="text-gray-700 font-bold text-md  my-2">
                Fizetési sáv alja
              </span>
              <input
                className="bg-white rounded-md h-8 w-full outline-2 outline outline-slate-200 text-md px-1"
                type="number"
                name="salaryFrom"
                placeholder="Fizetési sáv alja"
                value={filters.salaryFrom}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <span className="text-gray-700 font-bold text-md  my-2">
                Fizetési sáv teteje
              </span>
              <input
                className="bg-white rounded-md h-8 w-full outline-2 outline outline-slate-200 text-md px-1"
                type="number"
                name="salaryFrom"
                placeholder="Fizetési sáv teteje"
                value={filters.salaryFrom}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3 mb-5">
          <div className="flex flex-col w-2/3">
            <span className="text-gray-700 font-bold text-md  my-2">
              Foglalkozás típusa
            </span>
            <select
              className="bg-white rounded-md h-8  outline-2 outline outline-slate-200 text-md px-1"
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Foglalkoztatás típusa</option>
              <option value="full-time">Teljes munkaidős</option>
              <option value="part-time">Részmunkaidős</option>
              <option value="internship">Gyakornoki</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3">
            <span className="text-gray-700 font-bold text-md  my-2">
              Foglalkozás típusa
            </span>
            <input
              className="bg-white rounded-md h-8  outline-2 outline outline-slate-200 text-md px-1"
              type="text"
              name="city"
              placeholder="Település"
              value={filters.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
            <div className="flex justify-start gap-3 p-1">

          <input
            type="checkbox"
            name="homeOffice"
            checked={filters.homeOffice}
            onChange={handleChange}
            />
          {"Home Office Lehetőség"}
            </div>

        <div className="flex flex-row justify-end gap-5">
          <button className="bg-violet-700  hover:bg-violet-400 ease-linear transition-all duration-150 rounded-md h-8 outline-2 w-28 outline outline-black text-xl text-white ml-3" onClick={handleFilter}>Szűrés</button>
          <button className="bg-slate-300 hover:bg-slate-600 hover:text-white ease-linear transition-all duration-150 rounded-md h-8 outline-2 w-28 outline outline-black text-xl text-black p-0,5" onClick={handleClear}>Törlés</button>
        </div>
        </div>
      </Modal>
    </>
  );
};

export default JobFilterModal;
