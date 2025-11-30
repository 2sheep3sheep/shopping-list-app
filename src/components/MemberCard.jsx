import Card from 'react-bootstrap/Card';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { ShoppingListDataContext } from './ShoppingListProvider';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MemberCard(props) {

    const navTo = useNavigate();

    const { shoppingListData, setShoppingListData, shoppingListHandlerMap } = useContext(ShoppingListDataContext);
    const { userData } = useContext(UserContext);

    const data = props.memberData

    const can_remove = ( ( userData.data.authenticatedID === shoppingListData.data.owner) || userData.data.authenticatedID === data._id ) && data._id != shoppingListData.data.owner;
    const is_owner = (shoppingListData.data.owner === data._id);



    if (data === undefined) {
        return (
            <Spinner animation='border' style={{margin:"12px"}}/>
        );
    }

    function removeFromMembers() {
        shoppingListHandlerMap.removeMember(data._id);
        if (data._id === userData.data.authenticatedID) navTo("/")
    }

    return (
            <Card className='List-Item' style={{marginBottom:"12px", height:"72px", justifyContent:"space-evenly"}}>
                <Stack direction="horizontal"  >     
                    <div className='List-Item-Name' style={{width:"150%"}}>{data.name} {is_owner ? <Badge>Owner</Badge> : ""}</div>
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
