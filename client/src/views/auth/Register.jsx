import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../../state/api/authApiSlice.js";

const Register = () => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    fullname: "",
    role: "company",
  });
  const [register, mutationDetails] = useRegisterMutation();

  const handleChange = (event) => {
    setFormInputs({ ...formInputs, [event.target.name]: event.target.value });
  };

  const handleClick = async () => {
    try {
      await register({ ...formInputs }).unwrap();
    } catch (error) {
      console.error("Sikertelen regisztráció:", error);
    }
    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-1/5 p-5 shadow-md mb-5">
        <span className="font-bold text-4xl ">Regisztráció</span>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-gray-700 font-bold text-xl  my-2">
              Felhasználónév
            </span>
            <input
              className="bg-white rounded-md h-10 outline-2 outline outline-slate-200 text-xl px-1"
              name="fullname"
              onChange={handleChange}
              value={formInputs.fullname}
              required
              placeholder="Felhasználónév"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-gray-700 font-bold text-xl my-2">E-mail</span>
            <input
              className="bg-white rounded-md h-10 outline-2 outline outline-slate-200 text-xl px-1"
              name="email"
              type="email"
              onChange={handleChange}
              value={formInputs.email}
              required
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 font-bold text-xl my-2">Jelszó</span>
            <input
              className="bg-white rounded-md h-10 outline-2 outline outline-slate-200 text-xl px-1"
              name="password"
              type="password"
              onChange={handleChange}
              value={formInputs.password}
              required
              placeholder="Jelszó"
            />
          </div>
          <div className="flex felx-row gap-3 font-bold">
            <div className=" flex gap-3">
              <input
                id="jobseeker"
                name="role"
                type="radio"
                onChange={handleChange}
                value="jobseeker"
                checked={formInputs.role === "jobseeker"}
              />{"Munkavállaló"}
            </div>
            <input
              id="company"
              name="role"
              type="radio"
              onChange={handleChange}
              value="company"
              checked={formInputs.role === "company"}
            />{"Munkáltató"}
          </div>

          <button
            className=" bg-violet-700 rounded-md h-10 outline-2 w-50 outline outline-black text-xl text-white my-7"
            onClick={handleClick}
          >
            Regisztráció
          </button>

          {mutationDetails.isError && (
            <p className="flex justify-center text-red-600">
              Sikertelen regiszráció.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
