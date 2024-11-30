"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const style = {
    backgroundImage: "url('back2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "auto", // Full height of the viewport
    margin: 0, // Remove default margin
  };
  return (
    <>
      <div
        style={style}
        className="lg:px-0 flex flex-1 justify-center lg:py-0 text-white mt-20"
      >
        <div className="layout-content-container flex flex-col  w-full flex-1">
          <div className="@container">
            <div className="@[480px]:p-4">
              {/* <div
                style={{
                  backgroundImage: ' url("be1.jpg")',
                }}
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded items-start justify-end px-4 pb-10 @[480px]:px-10"
              > */}
              <div
                className="flex min-h-[580px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded items-start justify-end px-4 pb-10 @[480px]:px-10"
                style={{
                  backgroundImage: "url('back.jpg')",
                }}
              >
                <div className="flex flex-col gap-2 text-left">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Know your health risks
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal lg:w-[600px] @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Our free online health risk assessment will help you
                    understand your risk for major diseases, so you can take
                    action to prevent them.{" "}
                  </h2>
                </div>
                <Link href="/assessment">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 @[480px]:h-12 @[480px]:px-5  bg-[#80ED99] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Start your risk assessment</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#111418] text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Why take our health risk assessment?
                </h1>
                <p className="text-[#111418] text-white text-base font-normal leading-normal max-w-[720px]">
                  Early detection and prevention are key to maintaining good
                  health. Our health risk assessment is designed to help you
                  understand your risk for major diseases, so you can take
                  action to prevent them. Here are some reasons why you should
                  take it.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/22451c4f-e6b3-4914-916b-3d68d4ee2080.png")',
                    }}
                  />
                  <div>
                    <p className="text-[#111418] text-white text-base font-medium leading-normal">
                      Quick and easy
                    </p>
                    <p className="text-[#617489] text-sm font-normal leading-normal">
                      Takes just 10-15 minutes to complete
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/8e113684-6932-4669-b7eb-4ebdbad31d0c.png")',
                    }}
                  />
                  <div>
                    <p className="text-[#111418] text-white text-base font-medium leading-normal">
                      Comprehensive
                    </p>
                    <p className="text-[#617489] text-sm font-normal leading-normal">
                      Assesses your risk for 12 major diseases
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/4eae42f8-2e6c-4916-98fa-39a5dd69a8d9.png")',
                    }}
                  />
                  <div>
                    <p className="text-[#111418] text-white text-base font-medium leading-normal">
                      Personalized recommendations
                    </p>
                    <p className="text-[#617489] text-sm font-normal leading-normal">
                      Based on your unique health profile
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/bc575209-ba6a-4f61-83c8-a4058bbe3114.png")',
                    }}
                  />
                  <div>
                    <p className="text-[#111418] text-white text-base font-medium leading-normal">
                      Track your progress
                    </p>
                    <p className="text-[#617489] text-sm font-normal leading-normal">
                      Follow up assessments to monitor changes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://cdn.usegalileo.ai/sdxl10/7dc05bdc-7109-41b1-ac42-eb6805885392.png")',
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://cdn.usegalileo.ai/sdxl10/e8896f43-93d8-47a3-8cce-548a58e287a3.png")',
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://cdn.usegalileo.ai/sdxl10/81795523-5873-4bf9-a60a-6e7236f30a71.png")',
                  }}
                />
              </div>
            </div>
            <div className="flex px-4 py-3">
              <Link href="/assessment">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#116cd4] text-white text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Start your assessment</span>
                </button>
              </Link>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
