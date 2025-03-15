import Appbar from "../components/appbar";
import Balance from "../components/balance";
import Users from "../components/Users";

export default function Dashboard(){

    return <div>
        <Appbar />
        <div className="px-8 pt-5">
            <Balance value={10000} />
            <Users/>
        </div>
    </div>
}

//searchIndb