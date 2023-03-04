import { Accordion } from "flowbite-react";

function Suggestions({ data }) {
  return (
    <div className="h-[65vh] w-full max-w-2xl mx-auto px-4  overflow-auto">
      <Accordion flush={true} collapseAll={true}>
        {data.opportunities.map((item, index) => (
          <Accordion.Panel key={index}>
            <Accordion.Title>{item.title}</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
              <p className="text-gray-800 dark:text-gray-400">
                <span className="font-semibold">Savings:</span> {item.savings}{" "}
                ms
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  );
}

export default Suggestions;
