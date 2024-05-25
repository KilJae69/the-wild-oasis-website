import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "./TextExpander";


interface CabinProps {
  cabin: {
    name: string;
    maxCapacity: number;
    image: string;
    description: string;
  };
}

const Cabin = ({ cabin }: CabinProps) => {
  const { name, maxCapacity, image, description } = cabin;
  return (
    <div className="mb-24 grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 px-10 py-3">
      <div className="relative -translate-x-3 scale-[1.15]">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="mb-5 w-[150%] translate-x-[-254px] bg-primary-950 p-6 pb-1 text-7xl font-black text-accent-100">
          Cabin {name}
        </h3>

        <p className="mb-10 text-lg text-primary-300">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="size-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="size-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="size-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cabin;