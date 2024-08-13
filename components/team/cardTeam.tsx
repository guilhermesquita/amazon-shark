import { FaLinkedinIn } from "react-icons/fa";

type props = {
    name: string,
    linkedin: string,
    photo: string
}

export default function CardTeam(props: props) {
  return (
    <div className="w-80 h-72 flex flex-col justify-center">
      <img
        src={props.photo}
        alt="Team Member"
        className="w-full h-72 object-cover
        rounded-t-md
        "
      />
      <div className="bg-white text-black rounded-ee-lg p-5 flex flex-col gap-4">
        <h2 className="text-xl font-medium">{props.name}</h2>
        <a href={props.linkedin} target="_blank">
          <FaLinkedinIn
            size={"20px"}
            className="text-black hover:text-[#0e76a8]"
          />
        </a>
      </div>
    </div>
  );
}
