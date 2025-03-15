export default function Balance({value}){

    return <div className="flex gap-5 pb-4 bg-slate-50">

        <div className="font-bold text-lg">Your Balance</div>
       <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
}