import { ReactElement } from "react";

type props = {
    content: string,
    icon: ReactElement<any, any>
}

export default function Timeline(prop: props) {
  return (
    <div className="w-10/12 md:w-7/12 lg:6/12 mx-auto relative">
      <div className="border-l-2 mt-10">
        <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-white text-black rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0 border-2">
          <div className="w-5 h-5 bg-[#22B573] absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div>

          <div className="w-10 h-1 bg-blue-300 absolute -left-10 z-0"></div>

          <div className="flex-auto">
            {/* <h1 className="text-lg">Day 1</h1> */}
            <h1 className="text-xl font-bold">
             {prop.content}
            </h1>
          </div>
          {prop.icon}
        </div>
      </div>
    </div>
  );
}
