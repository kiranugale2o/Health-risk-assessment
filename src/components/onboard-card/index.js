"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { initialUserData, storage } from "@/utils";
import { createClient } from "@supabase/supabase-js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardCard({ userid, email }) {
  const { toast } = useToast();
  const [currentOnboardData, setOnboardData] = useState(initialUserData);
  // State to store the selected radio button value
  const [selectedValue, setSelectedValue] = useState("");
  const [image, setImage] = useState(null); // Store the selected image

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      handleUpload();
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`); // Create a reference to the storage location

    const uploadTask = uploadBytes(storageRef, image); // Upload the image

    uploadTask
      .then((snapshot) => {
        // After upload completes, get the download URL
        getDownloadURL(snapshot.ref).then((url) => {
          setOnboardData({ ...currentOnboardData, profile_image: url }); // Store the URL
          console.log("Image uploaded at: ", url); // Log the URL
        });
      })
      .catch((error) => {
        console.error("Upload failed: ", error);
        alert("Upload failed. Please try again.");
      });
  };

  const router = useRouter();

  async function handleOnboard() {
    handleUpload();
    setOnboardData({ ...currentOnboardData, gender: selectedValue });
    const data = {
      ...currentOnboardData,
      userId: userid,
      email: email,
    };

    fetch("/api/onboard", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          description: "success !",
        });
        alert("success");
        router.refresh("/");
      })
      .catch((er) => {
        console.log(er);
      });
  }
  console.log(currentOnboardData);

  function buttonDisabled() {
    if (
      currentOnboardData.LastName === "" ||
      currentOnboardData.firstName === "" ||
      currentOnboardData.age === "" ||
      currentOnboardData.weight === "" ||
      currentOnboardData.height === "" ||
      selectedValue === ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  const style = {
    backgroundImage: "url('back2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "120vh", // Full height of the viewport
    margin: 0, // Remove default margin
  };
  return (
    <>
      <div classNameName="lg:px-40 flex flex-1 justify-center py-5" style={style}>
        <div classNameName="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
          <h1 classNameName="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">
            Let's get started with some basic information.
          </h1>
          <div classNameName="lg:flex max-w-[480px]">
            <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label classNameName="flex flex-col min-w-40 flex-1">
                <input
                  value={currentOnboardData.firstName}
                  onChange={(e) => {
                    setOnboardData({
                      ...currentOnboardData,
                      firstName: e.target.value,
                    });
                  }}
                  placeholder="First name"
                  classNameName="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>
            <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label classNameName="flex flex-col min-w-30 flex-1">
                <input
                  value={currentOnboardData.LastName}
                  onChange={(e) => {
                    setOnboardData({
                      ...currentOnboardData,
                      LastName: e.target.value,
                    });
                  }}
                  placeholder="Last name"
                  classNameName="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
                />
              </label>
            </div>
          </div>
          <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label classNameName="flex flex-col min-w-40 flex-1">
              <input
                value={currentOnboardData.age}
                onChange={(e) => {
                  setOnboardData({
                    ...currentOnboardData,
                    age: e.target.value,
                  });
                }}
                placeholder="Age"
                classNameName="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label classNameName="flex flex-col min-w-40 flex-1">
              <input
                value={currentOnboardData.weight}
                onChange={(e) => {
                  setOnboardData({
                    ...currentOnboardData,
                    weight: e.target.value,
                  });
                }}
                placeholder="Weight in Kg"
                classNameName="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label classNameName="flex flex-col min-w-40 flex-1">
              <input
                value={currentOnboardData.height}
                onChange={(e) => {
                  setOnboardData({
                    ...currentOnboardData,
                    height: e.target.value,
                  });
                }}
                placeholder="Height in CM"
                classNameName="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637488] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 text-white">
            <label classNameName="flex flex-col min-w-40 flex-1">
              {" "}
              Gender :
              <br />
              <RadioGroup
                classNameName="mt-2 flex "
                value={selectedValue} // Controlled component
                onChange={() =>
                  setOnboardData({
                    ...currentOnboardData,
                    gender: selectedValue,
                  })
                }
                onValueChange={setSelectedValue}
                //  onChange={handleChange} // Update state on change
              >
                <div classNameName="flex items-center space-x-2 ">
                  <RadioGroupItem value="male" id="r1" classNameName="bg-white" />
                  <Label htmlFor="r1">Male</Label>
                </div>
                <div classNameName="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="r2" classNameName="bg-white" />
                  <Label htmlFor="r2">Female</Label>
                </div>
                <div classNameName="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="r3" classNameName="bg-white" />
                  <Label htmlFor="r3">Other</Label>
                </div>
              </RadioGroup>
            </label>
          </div>
          <div classNameName="flex ">
            <Label
              htmlFor="img"
              classNameName="flex items-center gap-4  px-4 min-h-[72px] py-2 bg-none"
            >
              <div
                classNameName="text-gray text-[#637488] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12"
                data-icon="Image"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" />
                </svg>
              </div>
              <div classNameName="flex flex-col justify-center">
                <p classNameName="text-white text-base font-medium leading-normal line-clamp-1">
                  Profile Photo
                </p>
                <p classNameName="text-[#637488] text-sm font-normal leading-normal line-clamp-2">
                  Upload a photo of yourself (optional)
                </p>
              </div>
            </Label>
            <input
              type="file"
              id="img"
              onChange={handleFileChange}
              classNameName="hidden"
            />
          </div>

          <div classNameName="flex px-4 py-3">
            <button
              onClick={handleOnboard}
              disabled={buttonDisabled()}
              classNameName="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
            >
              <span classNameName="truncate">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
