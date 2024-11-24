"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TempProfile from "../tempProfile";
import ProfileForm from "../profileForm";
import TempHeader from "../TempHeader";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //   form states
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [banner, setBanner] = useState<string>("");

  const [user, setUser] = useState({
    username: "",
    displayName: "",
    bio: "",
    profilePicture: "",
    banner: "",
  });

  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    displayName: "",
    bio: "",
    profilePicture: "",
    banner: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        console.log("User Data", response.data);
        setUser(response.data.user);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (id) fetchUser();
  }, [id]); // Fetch user data on page load

  const updateProfile = async () => {
    const updatedUser = {
      username: userName ? userName : user.username,
      displayName: displayName ? displayName : user.displayName,
      bio: bio ? bio : user.bio,
      profilePicture: profilePicture ? profilePicture : user.profilePicture,
      banner: banner ? banner : user.banner,
    };
    setUpdatedUser(updatedUser);
    console.log("Updated User", updatedUser);
    try {
      setError(false);
      setIsDisabled(true);
      setIsLoading(true);
      const response = await axios.post("/api/users/profile", updatedUser);
      console.log("Profile Updated", response.data);
      toast.success("Profile Updated");

      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUser,
      }));
      setUserName("");
      setDisplayName("");
      setBio("");
      setProfilePicture("");
      setBanner("");
      //   router.push("/");
    } catch (error: any) {
      setError(true);
      toast.error("Coudn't Update Profile.");
      console.log(error);
    } finally {
      setIsDisabled(false);
      setIsLoading(false);
    }
  };
  const [showImageOverlay, setShowImageOverlay] = useState(false);

  // Handle file input changes
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0]; // Optional chaining to handle undefined
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          setImage(reader.result); // Set base64 string for preview
        }
      };
      reader.readAsDataURL(file); // Read file as a Data URL
    }
  };

  return (
    <>
      <div className="w-screen h-screen p-4 flex  bg-[#191a22]">
        <div
          className={` w-[35%] border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
        >
          <TempHeader />
          <ProfileForm
            updateProfile={updateProfile}
            setUserName={setUserName}
            setDisplayName={setDisplayName}
            setBio={setBio}
            handleImageChange={handleImageChange}
            setProfilePicture={setProfilePicture}
            setBanner={setBanner}
          />
        </div>
        <div className="grow flex flex-col  border-4 border-l-2 border-[#1E1E1E] ">
          <TempProfile
            profilePicture={
              profilePicture ? profilePicture : user.profilePicture
            }
            bannerPicture={banner ? banner : user.banner}
            userName={userName || user.username}
            displayName={displayName || user.displayName}
            bio={bio || user.bio}
          />
        </div>

        {/*remove this later*/}
      </div>
    </>
  );
}
