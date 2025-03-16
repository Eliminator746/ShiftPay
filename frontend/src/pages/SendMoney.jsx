import Button from "../components/Button"

export default function SendMoney() {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
          <div className="bg-gray-50 shadow-2xl p-6 rounded-2xl max-w-md w-96">
            <div className="text-center font-bold text-3xl text-gray-800 pb-4">Send Money</div>
    
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow-inner">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">
                A
              </div>
              <div className="font-semibold text-gray-700">Friend's Name</div>
            </div>
    
            <label className="block text-gray-600 text-sm mt-4">Amount (in Rs)</label>
            <input 
              type="number"
              className="w-full mt-2 px-3 py-2 bg-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="Enter amount"
              
            />
    
            <Button 
              
              label="Invite Transfer" 
            />
          </div>
        </div>
      );
}