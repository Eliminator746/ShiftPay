import Button from "../components/Button"

export default function SendMoney() {

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="bg-white p-5">
                    <div className="font-bold text-4xl py-6 ">Send Money</div>

                    <div className="flex gap-1">
                        <div className="w-7 rounded-full text-center bg-green-500 text-gray-100 ">A</div>
                        <div className="font-semibold">Friend's Name</div>
                    </div>
                    <div className="text-xs">Amount (in Rs)</div>
                    <input className="text-xs bg-slate-200 mt-3 py-2 px-1 w-full rounded-sm" placeholder="Enter amount" />
                    <Button label={"Invite Transfer"} />
                </div>
            </div>
        </div>
    </div>
}