import Modal from "react-modal";
import { useGetApplicantsQuery } from "../../state/api/jobsApiSlice";

const ApplicantsListModal = ({ jobId, modalIsOpen, setModalIsOpen }) => {
  const { data, error, isLoading } = useGetApplicantsQuery(jobId);
  console.log(jobId, data);
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
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
        contentLabel="Applicants List"
        ariaHideApp={false}
      >
        <div className="flex flex-row justify-between mb-5">
          <p className="text-xl font-bold">Jelentkezők</p>
          <button
            className="bg-slate-300 hover:bg-slate-600 hover:text-white ease-linear transition-all duration-150 rounded-md h-6 outline-2 w-6 outline outline-black text-sm text-black p-0,5"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <ul>
        {data.map((applicant, index) => (
            <li key={index}>
              <div className="flex flex-row  hover:bg-slate-200  ease-linear transition-all duration-150 justify-between shadow-md p-2">
                <div className="flex flex-col justify-start">
                  <span>{applicant.user.fullname}</span>
                </div>
                <div className="flex flex-col justify-end">
                  <span className="font-bold">{applicant.user.email}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default ApplicantsListModal;
