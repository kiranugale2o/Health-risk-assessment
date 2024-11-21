import Image from "next/image";

export default function Home() {
  return (
    <div className="lg:px-0 flex flex-1 justify-center lg:py-0">
      <div className="layout-content-container flex flex-col  w-full flex-1">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded items-start justify-end px-4 pb-10 @[480px]:px-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("be1.jpg")',
              }}
            >
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  Understand your health risks
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Get personalized insights and recommendations from top doctors
                  to help you make informed decisions about your health
                </h2>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 @[480px]:h-12 @[480px]:px-5  bg-[#80ED99] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                <span className="truncate">Start your risk assessment</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <h1 className="text-[#141414] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
            How it works
          </h1>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 flex-wrap">
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/sdxl10/d4501149-1dd9-415e-8dbf-65ceef1c8ddf.png")',
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/sdxl10/42510950-8fed-4a65-94fd-7ee24d1a428e.png")',
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/sdxl10/77a2414d-9f47-4074-b08d-b657c998fe1c.png")',
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/78c2d39b-e69e-4ac0-a5d6-4a8b311ff810.png")',
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/a8b74b4f-04e6-4385-8d4e-7b8f7e08f4e4.png")',
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/f8dfab6a-1181-4f85-8a33-9549b3ff5752.png")',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
