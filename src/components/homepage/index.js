"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  return (
    <>
      <div className="lg:px-0 w-full flex flex-col">
        <div className="block lg:flex w-full" id="section1">
          {/* <div class="hidden absolute left-[35.33%] right-[59.01%] top-[43.19%] bottom-[83.02%] ">
            <img src="heart.png" width={300}></img>
          </div> */}
          <div
            className="flex flex-col w-full drop-shadow-none lg:left-[107px]"
            id="section1-leftside"
            style={{ boxShadow: "none" }}
          >
            <div className="absolute px-5 p-3 text-wrap top-[120px] lg:left-[80px] lg:top-[140px] w-full font-exo text-[60px] font-bold leading-[72px] text-white">
              Know your{" "}
              <span className="bg-[#80ED99] bg-lime-500 p-2 w-[200px]">
                Health
              </span>
              <br /> Risks
            </div>

            <div className="absolute left-[20px] top-[350px] w-[340px] lg:w-[521px] h-[144px] lg:left-[107px] lg:top-[304px] font-exo text-[18px] lg:text-[30px] font-medium leading-[36px] text-white">
              Our free online health risk assessment will help you understand
              your risk for major diseases, so you can take action to prevent
              them.
            </div>

            <div className="absolute bg-none w-[218px] h-[50px] left-[30px] lg:left-[100px] top-[520px] lg:top-[471px] bg-white rounded-[30px] font-exo font-medium text-[20px] leading-[24px]"></div>
            <div className="absolute w-[166px] h-[24px] left-[60px] lg:left-[125px] top-[535px] lg:top-[483px] font-exo font-medium text-[20px] leading-[24px] text-[#113D3C]">
              Start Assessment
            </div>

            <div className="absolute w-[50px] h-[50px] left-[220px] lg:left-[296px] top-[519px] lg:top-[471px]">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="24"
                  fill="white"
                  stroke="#113D3C"
                  strokeWidth="2"
                />
              </svg>
              <svg
                className="absolute top-[18px] left-[16px]"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9134 1.58557C13.9131 1.18807 13.7551 0.806921 13.474 0.525845C13.193 0.244769 12.8118 0.0867525 12.4143 0.086505L4.4134 0.0843842C4.01545 0.084384 3.6338 0.24247 3.3524 0.523865C3.07101 0.805259 2.91292 1.18691 2.91292 1.58486C2.91292 1.98282 3.07101 2.36447 3.3524 2.64586C3.6338 2.92726 4.01545 3.08535 4.4134 3.08535L8.79251 3.08605L0.636038 11.2425C0.354733 11.5238 0.1967 11.9054 0.196699 12.3032C0.196698 12.701 0.354734 13.0825 0.636038 13.3638C0.917343 13.6452 1.29887 13.8032 1.6967 13.8032C2.09452 13.8032 2.47605 13.6452 2.75736 13.3638L10.9138 5.20737L10.9138 9.58578C10.9138 9.78282 10.9526 9.97794 11.0281 10.16C11.1035 10.342 11.214 10.5074 11.3533 10.6468C11.4926 10.7861 11.6581 10.8966 11.8401 10.972C12.0222 11.0474 12.2173 11.0863 12.4143 11.0863C12.6114 11.0863 12.8065 11.0474 12.9885 10.972C13.1706 10.8966 13.336 10.7861 13.4753 10.6468C13.6146 10.5074 13.7252 10.342 13.8006 10.16C13.876 9.97794 13.9148 9.78282 13.9148 9.58578L13.9134 1.58557Z"
                  fill="#113D3C"
                />
              </svg>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="relative lg:static left-auto right-auto top-[450px] w-full p-5 lg:p-20 mt-10 h-[500px]"
            id="section1-right-side"
          >
            <img src="homebanner1.png" alt="banner" height={500} />
          </div>
        </div>

        {/*  Section  2*/}
        <div className="block lg:flex mt-10 flex-col w-full" id="section2">
          {/* top heading */}
          <div
            className="flex w-full mb-[30px] drop-shadow-none"
            id="section2-topside"
            style={{ boxShadow: "none" }}
          >
            <div className="flex flex-col mx-[107px] text-wrap w-full font-exo text-[60px] font-bold leading-[72px] text-white">
              Why take our health risk <br />
              <span className="bg-[#80ED99] bg-lime-500 p-1 w-[400px]">
                assessment?
              </span>
            </div>
          </div>
          {/* left content container */}
          <div className="flex lg:flex-row md:flex-col sm:flex-col w-full h-[500px] px-[100px]">
            <div
              className="flex w-[50%] flex-col gap-[30px] w-full drop-shadow-none"
              id="section1-leftside"
              style={{ boxShadow: "none" }}
            >
              <div className="flex flex-col justify-center pl-5 w-[340px] lg:w-[521px] h-[150px] lg:left-[107px] lg:top-[304px] font-exo text-[18px] lg:text-[30px] font-medium leading-[36px] text-white border-l-4 border-[#80ED99] border-lime-500">
                <b className="text-[30px] mb-4">Early detection</b>
                <b className="text-[23px] leading-[30px]">
                  Early detection and prevention are key <br /> to maintaining
                  good health.
                </b>
              </div>

              <div className="flex flex-col justify-center pl-5 w-[340px] lg:w-[521px] h-[250px] lg:left-[107px] lg:top-[304px] font-exo text-[18px] lg:text-[30px] font-medium leading-[36px] text-white border-l-4">
                <b className="text-[30px] mb-4">
                  Help you understand to major
                  <br />
                  diseases
                </b>
                <b className="text-[23px] leading-[30px]">
                  Our health risk assessment is designed <br />
                  to help you understand your risk for <br />
                  major diseases, so you can take action to <br />
                  prevent them.
                </b>
              </div>
            </div>

            {/* Rigth content image conatiner */}
            <div
              className="flex w-[50%] items-start justify-center"
              id="section1-right-side"
            >
              <img src="homebanner1.png" alt="banner" width={600}/>
            </div>
          </div>
        </div>

        {/*  Section 3 */}
        <div className="block lg:flex mt-10 flex-col w-full" id="section3">
          <div
            className="flex items-center justify-center w-full  mb-[30px] drop-shadow-none"
            id="section3-topside"
            style={{ boxShadow: "none" }}
          >
            <div className="flex flex-row gap-[10px] justify-center mx-[107px] text-wrap w-full font-exo text-[60px] font-bold leading-[72px] text-white">
              <span className="bg-[#80ED99] bg-lime-500 pl-[30px] w-[155px] h-[80px]">
                {" "}
                why
              </span>
              you should take it
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
