export default function InputBox({label,placeholder,onChange}){

    return <div className="pt-4">
        <div className="pb-1 ">{label}</div>
        <input onChange={onChange} className="w-full rounded-sm py-1 px-2 border-slate-200" placeholder={placeholder} />
    </div>
}