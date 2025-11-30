import { useContext } from "react";
import { ShoppingListDataContext } from "./ShoppingListProvider";
import ListItem from "./ListItem";
import MemberCard from "./MemberCard";
import { UserContext } from "./UserProvider";
import { Spinner } from "react-bootstrap";

function MemberList(props) {

    const { userData } = useContext(UserContext)

    if (userData.state != "ready") {
        return (
            <Spinner animation='border' style={{margin:"12px"}}/>
        );
    }

    let list_members = []
    for (var i=0; i<props.memberList.length; i++) {
        var id = props.memberList[i]
        list_members.push( <MemberCard memberData={ userData.data.users.find( (e) => e._id === id ) } />  )
    }

    
    return (
        <div className="Member-List ">
            {list_members}
        </div>
    );
}

export default MemberList;
