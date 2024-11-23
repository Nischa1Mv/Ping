"use client";
import React, { useState } from "react";
import ImageOverlay from "../imageOverlay";
import { useRouter } from "next/navigation";
import { Profile } from "../profile";
import ContactHeader from "../contact/ContactHeader";
import ProfileForm from "./profileForm";

function ProfileSetup() {
  const router = useRouter();
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const ProfilePicture =
    "https://media-hyd1-1.cdn.whatsapp.net/v/t61.24694-24/379619630_6949750128379753_6172259427711619252_n.jpg?ccb=11-4&oh=01_Q5AaIO2kBGB6JkOO1GOwTcvG9XIDmY-5Vitx5Oo9Mv7P_lPp&oe=674A8A31&_nc_sid=5e03e0&_nc_cat=108";
  const BannerPic =
    "https://media.licdn.com/dms/image/v2/D4D16AQGiuVbiEdaPAg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1711031992791?e=1737590400&v=beta&t=L6veoyCxeddYWy2STt-4ABQGsbXWvZzwMzWNluS7xok";

  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [bannerPicture, setBannerPicture] = useState<string>("");

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
      {showImageOverlay && (
        <div
          className="w-full h-full bg-[rgba(25,26,34,0.9)] absolute top-0 right-0 flex justify-center items-center z-50"
          onClick={() => {
            setShowImageOverlay(false);
          }}
        >
          <ImageOverlay src={ProfilePicture} />
        </div>
      )}
      <div className="w-screen h-screen p-4 flex  bg-[#191a22]">
        <div
          className={` w-[35%] border-4 border-[#1E1E1E] border-r-2  flex flex-col gap-2`}
        >
          <ContactHeader />
          <ProfileForm
            setUserName={setUserName}
            setDisplayName={setDisplayName}
            setBio={setBio}
            handleImageChange={handleImageChange}
            setProfilePicture={setProfilePicture}
            setBannerPicture={setBannerPicture}
          />
        </div>
        <div className="grow flex flex-col  border-4 border-l-2 border-[#1E1E1E] ">
          <Profile
            setIsProfileOpen={setIsProfileOpen}
            profilePicture={profilePicture}
            bannerPicture={bannerPicture}
            userName={userName}
            displayName={displayName}
            bio={bio}
          />
        </div>
      </div>
    </>
  );
}
export default ProfileSetup;
