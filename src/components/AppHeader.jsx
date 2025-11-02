import { useContext } from "react";
import { ShoppingListDataContext } from "./ShoppingListProvider";
import ListItem from "./ListItem";
import { UserContext } from "./UserProvider";
import Stack from "react-bootstrap/esm/Stack";
import Dropdown from 'react-bootstrap/Dropdown';

function AppHeader(props) {

    const { userData, setUserData, userDataHandlerMap } = useContext(UserContext);

    const user_list = []
    const user_ids = Object.keys(userData.users);
    for (var i=0; i<user_ids.length; i++) {
        user_list.push( <Dropdown.Item eventKey={user_ids[i]} >{userData.users[user_ids[i]].name}</Dropdown.Item> )
    }

    return (
        <div style={{backgroundColor:"var(--bs-gray)", padding:"12px 24px 12px 24px", color:"white", position:"fixed", zIndex:"999", width:"100%", boxShadow:"0 0px 48px 0px rgb(0 0 0 / 20%)"}}>
            <Stack direction="horizontal">
                <div>{"Shopping List App"}</div>
                <Dropdown className="ms-auto" onSelect={ (e) => userDataHandlerMap.changeAuthenticatedUser(e) }>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{boxShadow:"0 0px 12px 0px rgb(0 0 0 / 20%)"}}>
                        Logged in as: <b>{ userData.users[userData.authenticatedID].name }</b>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {user_list}
                    </Dropdown.Menu>
                </Dropdown>
            </Stack>
        </div>
    );
}

export default AppHeader;
