"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import OnboardCard from "../onboard-card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function UpdateProfile({ ProfileUser }) {
  const id = ProfileUser?._id;
  const initialData = {
    age: ProfileUser?.age,
    weight: ProfileUser?.weight,
    height: ProfileUser?.height,
  };
  console.log(ProfileUser?._id);

  const router = useRouter();
  const [dialogBtn, setDialgobtn] = useState(false);
  const [currentData, setCurrentData] = useState(initialData);
  function handleUpdate() {
    fetch("/api/updateProfile", {
      method: "POST",
      body: JSON.stringify({ id: id, data: currentData }),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          alert("Profile Updated");
          router.refresh("/dashboard");
          setDialgobtn(false);
        } else {
          alert("Somthing Wrong");
          setDialgobtn(false);
        }
      })
    );
  }
  return (
    <>
      <Dialog open={dialogBtn} onOpenChange={setDialgobtn}>
        <DialogContent classNameName="overflow-auto  h-[400px]  lg:w-[650px] ">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <div classNameName="flex flex-col gap-5">
            <div classNameName="grid  w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Age">Age</Label>
              <Input
                type="number"
                value={currentData.age}
                onChange={(e) =>
                  setCurrentData({ ...currentData, age: e.target.value })
                }
                id="Age"
                placeholder="Age"
              />
            </div>
            <div classNameName="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="w">Weight</Label>
              <Input
                type="number"
                value={currentData.weight}
                onChange={(e) =>
                  setCurrentData({ ...currentData, weight: e.target.value })
                }
                id="w"
                placeholder="Weight in Kg"
              />
            </div>
            <div classNameName="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="height">Height </Label>
              <Input
                type="number"
                value={currentData.height}
                onChange={(e) =>
                  setCurrentData({ ...currentData, height: e.target.value })
                }
                id="height"
                placeholder="Height in Cm"
              />
            </div>
            <Button onClick={handleUpdate} type="submit" classNameName="mt-10 px-5">
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <button
        onClick={() => {
          setDialgobtn(true);
        }}
        classNameName="inline-block py-2 px-4 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition duration-200"
      >
        Edit Profile
      </button>
    </>
  );
}
