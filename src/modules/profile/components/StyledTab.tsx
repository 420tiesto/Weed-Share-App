import { Tab } from "@headlessui/react";

type StyledTabProps = {
  children: React.ReactNode;
};

const StyledTab = ({ children }: StyledTabProps) => (
  <Tab
      className={({ selected }) =>
          selected
              ? ' text-white py-4 px-6 border-b-2 border-primary'
              : ' text-gray-400 py-4 px-6 hover:text-white '
      }>
      {children}
  </Tab>
);

export default StyledTab