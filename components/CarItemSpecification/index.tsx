type CarItemSpecificationProps = {
  icon?: React.ReactNode;
  text: string;
};

export const CarItemSpecification = ({
  icon,
  text,
}: CarItemSpecificationProps) => (
  <div className="flex items-center space-x-1 text-gray-800">
    {icon}
    <p>{text}</p>
  </div>
);

export const CarItemTextSpecification = ({
  text,
}: CarItemSpecificationProps) => (
  <p className="text-lg py-3 text-gray-800">{text}</p>
);
