import { Accordion } from "flowbite-react";

function Suggestions({ data }) {
  return (
    <div className="h-[65vh] w-[100vw] max-w-2xl mx-auto pb-4` overflow-auto">
      <Accordion flush={true} collapseAll={true}>
        {data.opportunities.map((item, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title className="text-lg sm:text-xl md:text-2xl">
              {item.title}
            </Accordion.Title>
            <Accordion.Content className="md:text-lg">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
              <p className="text-gray-800 dark:text-gray-400">
                <span className="font-semibold">Savings:</span>{" "}
                {Math.round(item.savings)} ms
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
}

export default Suggestions;
