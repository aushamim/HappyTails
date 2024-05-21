import { useNavigate } from "react-router-dom";
import useGlobalState from "../../Hooks/useGlobalState";
import { toast } from "sonner";

const handleSubmit = (e, APIHost, navigate, setUser, userId) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const username = e.target.elements["username"].value;
  const first_name = e.target.elements["first_name"].value;
  const last_name = e.target.elements["last_name"].value;
  const email = e.target.elements["email"].value;
  const bio = e.target.elements["bio"].value;
  const phone_no = e.target.elements["phone_no"].value;
  const address = e.target.elements["address"].value;

  const promise = () => {
    return fetch(`${APIHost}/user/update/${userId}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        username,
        first_name,
        last_name,
        email,
        bio,
        phone_no,
        address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          setUser(data);
          navigate(`/shelter/${data?.id}`);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  toast.promise(promise, {
    loading: "Updating Information. Please wait.",
    success: "Information Updated successfully",
    error: (error) => {
      return error;
    },
  });
};

const EditProfile = () => {
  const { APIHost, userId, user, setUser } = useGlobalState();
  const navigate = useNavigate();
  return (
    <div className="mt-10 xl:mt-16 bg-white pt-8 xl:pt-14 pb-10 xl:pb-24 bg-opacity-80 rounded-lg shadow">
      <h1 className="text-3xl xl:text-5xl font-bold text-center">
        Update Personal Information
      </h1>
      <span className="w-44 h-1 bg-purple-300 block mx-auto mt-2"></span>

      <form
        className="mt-10 xl:mt-16 w-5/6 xl:w-1/2 mx-auto"
        onSubmit={(e) => {
          handleSubmit(e, APIHost, navigate, setUser, userId);
        }}
      >
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            id="username"
            type="text"
            className="grow"
            placeholder="Username"
            defaultValue={user?.username}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            id="first_name"
            type="text"
            className="grow"
            placeholder="First Name"
            defaultValue={user?.first_name}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            id="last_name"
            type="text"
            className="grow"
            placeholder="Last Name"
            defaultValue={user?.last_name}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            id="email"
            type="text"
            className="grow"
            placeholder="Email"
            defaultValue={user?.email}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>

          <input
            id="bio"
            type="text"
            className="grow"
            placeholder="Bio"
            defaultValue={user?.bio}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
          <input
            id="phone_no"
            type="text"
            className="grow"
            placeholder="Phone No"
            defaultValue={user?.phone_no}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <input
            id="address"
            type="text"
            className="grow"
            placeholder="Address"
            defaultValue={user?.address}
            required
          />
        </label>

        <div className="mt-8 flex justify-end items-center">
          <input className="btn-purple ml-3" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
