"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import OnboardCard from "../onboard-card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function UpdateProfile({ ProfileUser }) {
  const initialData = {
    age: ProfileUser?.age,
    weight: ProfileUser?.weight,
    height: ProfileUser?.height,
  };
  const router = useRouter();
  const [dialogBtn, setDialgobtn] = useState(false);
  const [currentData, setCurrentData] = useState(initialData);
  function handleUpdate() {
    fetch("/api/updateProfile", {
      method: "POST",
      body: JSON.stringify({ id: ProfileUser?._id, data: currentData }),
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
        <DialogContent className="overflow-auto  h-[300px]  lg:w-[450px] lg:w-auto">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
            <Button onClick={handleUpdate} type="submit" className="mt-10 px-5">
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => {
          setDialgobtn(true);
        }}
        className="lg:absolute mt-5 right-5 text-[15px] text-[#80ED99]"
      >
        Update Profile
      </Button>
    </>
  );
}
