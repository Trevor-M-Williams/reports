import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ statusFilter, setStatusFilter }) {
  const statusContent = [
    ["Email Error", "bg-red-500"],
    ["No Email", "bg-white"],
    ["Generating", "bg-yellow-300"],
    ["Report Ready", "bg-blue-400"],
    ["Email Sent", "bg-green-500"],
  ];

  function handleStatusFilter(i) {
    if (statusFilter.includes(i)) {
      setStatusFilter(statusFilter.filter((item) => item !== i));
    } else {
      setStatusFilter([...statusFilter, i]);
    }
  }

  return (
    <Menu as="div" className="relative inline-block w-32 text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Status
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {statusContent.map((content, i) => {
              let highlight = "";
              if (statusFilter.length === 0 || statusFilter.includes(i))
                highlight = "border-l-4 border-blue-200";
              return (
                <Menu.Item
                  key={i}
                  onClick={() => handleStatusFilter(i)}
                  className={`flex cursor-pointer select-none justify-between px-2 ${highlight}`}
                >
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block py-2 text-sm"
                      )}
                    >
                      <div>{content[0]}</div>
                      <div
                        className={`h-4 w-4 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${content[1]}`}
                      ></div>
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
