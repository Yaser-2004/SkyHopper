import { motion, useTransform } from "framer-motion";

export const DestinationCard = ({ destination, range, progress}) => {

    const opacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center w-full max-w-xs" style={{opacity: opacity}}>
      <div className="w-full h-48 rounded-full overflow-hidden mb-4">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={destination.city}
          className="w-full h-full object-fit"
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">{destination.route}</p>
        <h2 className="text-xl font-bold mb-1">{destination.city}</h2>
        <p className="text-xs text-gray-500">{destination.travelClass}</p>
      </div>
    </motion.div>
  );
};
