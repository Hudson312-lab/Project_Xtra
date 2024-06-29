import { FaCheckCircle, FaMoneyBillWave, FaChartLine, FaDollarSign, FaPiggyBank } from 'react-icons/fa';
import data from "../assets/data.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-indigo-200 p-4 flex flex-col items-center">
      <div className="w-full max-w-md flexflex-col space-y-4">
        <div className="bg-gradient-to-b from-indigo-800 to-indigo-600 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col items-center space-y-4">
          <h2 className="text-3xl text-center font-bold bg-indigo-600 w-full p-2 rounded text-white"> Hamza Tariq</h2>
          <div className="w-full flex items-center ml-14">
            <div className="flex items-center space-x-4"> 
              <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-md mr-4"
                src={data}
                alt="Profile"
              />
              <div className="flex flex-col justify-center items-center sm:items-start">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">Status:</h3>
                    <p className="text-lg font-bold text-green-400">Active</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">Level:</h3>
                    <p className="text-lg font-bold text-yellow-400">Bronze</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">UID:</h3>
                    <p className="text-lg font-bold text-red-300">UN178293</p>
                  </div>
                  <p className="text-base text-white flex items-center mt-2">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full grid font-bold grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: FaMoneyBillWave, title: "Investment", value: "$1,000", color: "text-yellow-600", bgColor: "bg-gray-100" },
            { icon: FaChartLine, title: "ROI", value: "$0", color: "text-green-500", bgColor: "bg-gray-50" },
            { icon: FaDollarSign, title: "Affiliate Earnings", value: "$0", color: "text-purple-600", bgColor: "bg-gray-100" },
            { icon: FaDollarSign, title: "Total Income", value: "$0", color: "text-blue-600", bgColor: "bg-gray-100" },
            { icon: FaPiggyBank, title: " Withdrawals", value: "$0", color: "text-pink-600", bgColor: "bg-gray-100" },
          ].map((item, index) => (
            <div key={index} className={`shadow-lg rounded-lg overflow-hidden p-4 flex items-center ${item.bgColor}`}>
              <item.icon className={`w-8 h-8 mr-4 ${item.color}`} />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
