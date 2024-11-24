import { useRouter } from "next/navigation";
import React from "react";

interface ProfileFormProps {
  isDisabled: boolean;
  updateProfile: () => void;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  handleImageChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
  setBanner: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileForm({
  isDisabled,
  updateProfile,
  setDisplayName,
  setUserName,
  setBio,
  handleImageChange,
  setProfilePicture,
  setBanner,
}: ProfileFormProps) {
  const router = useRouter();

  const handleFormSubmit = () => {
    // Call the updateProfile function to update the profile
    updateProfile();

    // Clear all the input fields by resetting the state
    setDisplayName("");
    setUserName("");
    setBio("");
    setProfilePicture("");
    setBanner("");
  };

  return (
    <div className="flex flex-col gap-10 items-center px-10 justify-center h-full text-[#adaeb7]">
      <div className="w-full flex items-center justify-center text-2xl font-semibold">
        Please Create Your Profile
      </div>
      {/* input for DisplayName */}
      <div className="flex gap-4 w-full ">
        <label
          className="w-[50%] text-[#9696cd] font-semibold px-2 "
          htmlFor="Display Name"
        >
          Display Name
        </label>
        <input
          required
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          className="bg-transparent focus:outline-none border-b-2 w-[50%] px-2 border-[#adaeb7]"
          placeholder="Enter Display Name"
        />
      </div>
      {/* input for UserName */}
      <div className="flex gap-4 w-full">
        <label
          className="w-[50%] text-[#9696cd] font-semibold px-2"
          htmlFor="label"
        >
          User Name
        </label>
        <input
          required
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          className="bg-transparent focus:outline-none border-b-2 w-[50%] px-2 border-[#adaeb7]"
          placeholder="Enter User Name"
        />
      </div>
      {/* input for Bio */}
      <div className="flex gap-4 w-full">
        <label
          className="w-[50%] text-[#9696cd] font-semibold px-2 flex item-center"
          htmlFor=""
        >
          Bio
        </label>
        <textarea
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter The Bio Details"
          className="bg-transparent focus:outline-none border-b-2 w-[50%] px-2 border-[#adaeb7]"
        />
      </div>
      {/* profile picture input */}
      <div className="flex gap-4 w-full">
        <label className="w-[50%] text-[#9696cd] font-semibold px-2" htmlFor="">
          Profile Picture
        </label>
        <input
          onChange={(e) => handleImageChange(e, setProfilePicture)}
          type="file"
          className="bg-transparent w-[50%] text-sm"
          placeholder="Enter User Name"
          accept="image/*"
        />
      </div>
      {/* banner picture input */}
      <div className="flex gap-4 w-full">
        <label
          className="w-[50%] text-[#9696cd] font-semibold px-2 "
          htmlFor=""
        >
          Banner
        </label>
        <input
          onChange={(e) => handleImageChange(e, setBanner)}
          type="file"
          className="bg-transparent w-[50%] text-sm"
          placeholder="Enter User Name"
          accept="image/*"
        />
      </div>
      <div>
        <button
          disabled={isDisabled}
          onClick={handleFormSubmit}
          value="save"
          className={`bg-transparent tracking-wider cursor-pointer focus:outline-none text-[#fff] px-6 py-1 rounded-lg login-box transition-transform duration-150 
    ${
      isDisabled
        ? "cursor-not-allowed opacity-50"
        : "hover:font-bold hover:bg-[#8F8FCA] hover:text-[#383a46] active:scale-95 active:bg-[#9696cd]"
    }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;
