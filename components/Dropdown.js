import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  statusFilter,
  setStatusFilter,
  statusColors,
}) {
  useEffect(() => {
    console.log(statusFilter);
  }, [statusFilter]);

  function handleStatusFilter(e, i) {
    e.preventDefault();
    setStatusFilter(i);
  }

  return (
    <Menu as="div" className="relative inline-block w-32 text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Status
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          {open && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-6 z-10  w-max origin-top-right rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  <Menu.Item
                    onClick={(e) => handleStatusFilter(e, "all")}
                    className={`flex cursor-pointer select-none justify-center px-2`}
                  >
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block py-2 text-sm"
                        )}
                      >
                        <div
                          className={`h-4 w-4 cursor-pointer rounded-full outline outline-1 outline-gray-700`}
                        >
                          <svg
                            viewBox="-20 -20 49.97504 50.185385"
                            width="100%"
                            height="100%"
                          >
                            <ellipse
                              fill="none"
                              stroke="#de0000"
                              stroke-width="1.54092622"
                              stroke-opacity="1"
                              cy="5.0926924"
                              cx="4.9875193"
                              id="circle2"
                              rx="24.217056"
                              ry="24.322229"
                            />
                            <ellipse
                              fill="none"
                              stroke=" #ff6230"
                              stroke-width=" 1.54092622"
                              stroke-opacity=" 1"
                              cy="5.0926924"
                              cx="4.9875193"
                              id="circle4"
                              rx="22.935732"
                              ry="23.035339"
                            />
                            <ellipse
                              fill="none"
                              stroke=" #fef600"
                              stroke-width=" 1.54092622"
                              stroke-opacity=" 1"
                              cy="5.0926924"
                              cx="4.9875193"
                              id="circle6"
                              rx="21.654406"
                              ry="21.748449"
                            />
                            <ellipse
                              fill="none"
                              stroke=" #00bd00"
                              stroke-width=" 1.54092622"
                              stroke-opacity=" 1"
                              cy="5.0926924"
                              cx="4.9875193"
                              id="circle8"
                              rx="20.373079"
                              ry="20.461559"
                            />
                            <ellipse
                              fill="none"
                              stroke=" #009dfe"
                              stroke-width=" 1.54092622"
                              stroke-opacity=" 1"
                              cy="5.0926924"
                              cx="4.9875193"
                              id="circle10"
                              rx="19.091753"
                              ry="19.174667"
                            />
                            <ellipse
                              fill="none"
                              stroke=" #000084"
                              stroke-width=" 1.54092622"
                              stroke-opacity=" 1"
                              cy="5.0926924"
                              cx="4.9875193"
                              id="circle12"
                              rx="17.810429"
                              ry="17.887777"
                            />
                            <ellipse
                              fill="none"
                              stroke=" #30009c"
                              stroke-width=" 1.54092622"
                              stroke-opacity=" 1"
                              cy="5.0926924"
                              cx="4.9875193"
                              id="circle16"
                              rx="16.657236"
                              ry="16.729576"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  {statusColors.map((color, i) => (
                    <Menu.Item
                      key={i}
                      onClick={(e) => handleStatusFilter(e, i)}
                      className={`flex cursor-pointer select-none justify-center px-2`}
                    >
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block py-2 text-sm"
                          )}
                        >
                          <div
                            className={`h-4 w-4 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${color}`}
                          ></div>
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          )}
        </>
      )}
    </Menu>
  );
}
