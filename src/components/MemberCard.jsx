import Card from 'react-bootstrap/Card';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { ShoppingListDataContext } from './ShoppingListProvider';

function MemberCard(props) {

    const { shoppingListData, setShoppingListData, shoppingListHandlerMap } = useContext(ShoppingListDataContext);
    const { userData } = useContext(UserContext);

    const data = props.memberData

    const can_remove = ( userData.authenticatedID === shoppingListData.owner || userData.authenticatedID === props.userID ) && props.userID != shoppingListData.owner;
    const is_owner = (shoppingListData.owner === props.userID);

    if (data === undefined) {
        return (
            <Spinner animation='border' style={{margin:"12px"}}/>
        );
    }

    function removeFromMembers() {
        shoppingListHandlerMap.removeMember(props.userID);
    }

    return (
            <Card className='List-Item' style={{marginBottom:"12px", height:"72px", justifyContent:"space-evenly"}}>
                <Stack direction="horizontal"  >     
                    <div className='List-Item-Name' style={{width:"150%"}}>{data.name} {is_owner ? <span style={{opacity:"50%"}}>(owner)</span> : ""}</div>
                    { can_remove ?
                    <div className="ms-auto shrink-response">
                        <Button style={{width:"100%"}} variant='outline-danger' onClick={removeFromMembers}><div className='verbose-label'>Remove</div><div className='compact-label'>X</div></Button>
                    </div>
                    :
                    <div>
                    </div>
                    }
                </Stack>

            </Card>
    );
}

export default MemberCard;
