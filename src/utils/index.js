import { Weight } from "lucide-react";

export const CandidateRequireField = [
  {
    label: "profile_image",
    name: "image",
    placeholder: "Upload Profile image",
    contentType: "file",
  },
  {
    label: "name",
    name: "name",
    placeholder: "Enter your full Name",
    contentType: "input",
  },
  {
    label: "age",
    name: "age",
    placeholder: "Enter your Age",
    contentType: "input",
  },
  {
    label: "gender",
    name: "gender",
    placeholder: "Enter your Gender ",
    contentType: "input",
  },
  {
    label: "Weight",
    name: "Weight",
    placeholder: "Enter your Weight ",
    contentType: "input",
  },
  {
    label: "height",
    name: "height",
    placeholder: "Enter your height ",
    contentType: "input",
  },
];

export const initialCandidateData = {
  name: "",
  age: "",
  gender: "",
  weight: "",
  height: "",
  email: "",
  profile_image: "",
};
