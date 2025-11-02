import { useContext } from "react";
import { ShoppingListDataContext } from "./ShoppingListProvider";
import ListItem from "./ListItem";
import MemberCard from "./MemberCard";
import { UserContext } from "./UserProvider";

function MemberList(props) {

    const { userData } = useContext(UserContext)

    let list_members = []
    for (var i=0; i<props.memberList.length; i++) {
        list_members.push( <MemberCard userID={props.memberList[i]} memberData={ userData.users[props.memberList[i]]} />  )
    }

    return (
        <div className="Member-List ">
            {list_members}
        </div>
    );
}

export default MemberList;
