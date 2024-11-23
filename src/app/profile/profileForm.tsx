import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";

interface ProfileFormProps {
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  handleImageChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
  setBannerPicture: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileForm({
  setDisplayName,
  setUserName,
  setBio,
  handleImageChange,
  setProfilePicture,
  setBannerPicture,
}: ProfileFormProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-10 items-center px-10 justify-center h-full text-[#adaeb7]">
      <div className="w-full  flex items-center justify-center text-2xl font-semibold">
        Please Create Your Profile
      </div>
      {/* input for DisplayName */}
      <div className="flex gap-4 w-full ">
        <label
          className="w-[50%] text-[#9696cd] font-semibold px-2 "
          htmlFor=""
        >
          Display Name
        </label>
        <input
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          className="bg-transparent focus:outline-none border-b-2 w-[50%] px-2 border-[#adaeb7]"
          placeholder="Enter Display Name"
        />
      </div>
      {/* input for UserName */}
      <div className="flex gap-4 w-full">
        <label className="w-[50%] text-[#9696cd] font-semibold px-2" htmlFor="">
          User Name
        </label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text "
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
          accept="image/png"
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
          onChange={(e) => handleImageChange(e, setBannerPicture)}
          type="file"
          className="bg-transparent w-[50%] text-sm"
          placeholder="Enter User Name"
          accept="image/png"
        />
      </div>
      <div>
        <button
          onClick={() => {
            router.push("/");
          }}
          value="save"
          className="bg-transparent hover:font-bold cursor-pointer tracking-wider focus:outline-none hover:bg-[#8F8FCA] hover:text-[#383a46] text-[#fff] px-6 py-1 rounded-lg login-box active:scale-95 transition-transform duration-150 active:bg-[#9696cd]  "
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;