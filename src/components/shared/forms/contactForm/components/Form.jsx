import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ({ formData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isClicked, setIsClicked] = useState(false);

  const onSubmit = (data) => {
    const success = formData(data);
    if (success !== false) {
      setIsClicked(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full my-2 "
    >
      <input
        className="border border-gray-300 w-full py-2 px-6"
        placeholder="Your Business Name"
        {...register("Name", { required: true, maxLength: 20 })}
      />
      {errors.Name && <p>Name Required</p>}
      <input
        className="border border-gray-300 w-full py-2 px-6"
        placeholder="Your Business Email"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && <p>Email is Required</p>}
      {!isClicked && (
        <button
          onSubmit={() => setIsClicked(true)}
          type="submit"
          value=""
          className="flex justify-self-rigth self-end border bg-blue-800 text-white rounded border-blue-800 px-6 py-2 my-2"
        >
          Preview
        </button>
      )}
      {isClicked && (
        <button
          type="submit"
          value=""
          className="flex justify-self-rigth self-end border bg-blue-800 text-white rounded border-blue-800 px-6 py-2 my-2"
        >
          Update
        </button>
      )}
    </form>
  );
};
export default Form;
