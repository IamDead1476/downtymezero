const FeatureCard = ({ title, description, buttonLabel, to }) => {
  return (
    <div className="w-3/4 mx-auto bg-purple-200 hover:bg-purple-300 rounded-lg shadow-lg p-6 transition-all duration-500 hover:scale-105">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-800 mb-4">{description}</p>
      <a
        href={to}
        className="bg-pink-600 text-white px-4 py-2 rounded-md"
      >
        {buttonLabel}
      </a>
    </div>
  );
};

export default FeatureCard;
