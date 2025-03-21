import { DropdownMenu } from "./DropdownMenu";

export default function Appbar({ user }) {
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50 shadow-md">
            <div className="text-2xl font-bold text-gray-800">ShiftPay</div>

            <div className="flex items-center gap-4">
                <div className="text-gray-700 text-xl font-semibold">Hello</div>
                <div className="flex items-center justify-center">
                    <DropdownMenu user={user} />
                </div>
            </div>
        </div>
    );
}
