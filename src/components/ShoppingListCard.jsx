import Card from 'react-bootstrap/Card';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { ShoppingListsDataContext } from './ShoppingListsProvider';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import UserProfileIcon from './UserProfileIcon';

function ShoppingListCard(props) {

    const navTo = useNavigate();

    const { shoppingListsData, setShoppingListsData, shoppingListsHandlerMap } = useContext(ShoppingListsDataContext);
    const { userData } = useContext(UserContext);

    const list_data = props.data;

    let item_previews = [];
    const item_ids = Object.keys( list_data.items ); 

    for (var i=0; i<item_ids.length; i++) {
        var item = list_data.items[ item_ids[i] ]
        if (i<3) {
            item_previews.push(`${item.quantity}x ${item.name}`)
            item_previews.push( <br/> )
        }else{
            item_previews.push("...")
            item_previews.push( <br/> )
            break;
        }
    }

    let member_icons = []

    var max = Math.min(3,list_data.members.length)
    for (var i=0; i<max; i++) {
        member_icons.push( <UserProfileIcon username={userData.users[list_data.members[i]].name} style={{position:"absolute", right:String((max-i-1)*24)+"px", top:"-10px"}}/> )
    }

    let extra_members = list_data.members.length-max;
    if (extra_members>0) {
            member_icons.push( <div style={{position:"absolute", right:String(max*24+12)+"px", top:"-6px"}}>{"+"+extra_members}</div> )
    }

    return (
            <Card 
                className='List-Card' 
                style={{margin:"4px", justifyContent:"space-evenly", height:"180px", overflow:"hidden"}} 
                onClick={ (e) => {navTo("/detail")} }>
                <Stack direction="vertical">
                    <Stack direction="horizontal" style={{justifyContent:"space-between"}}>
                        <div style={{fontWeight:"500"}}>{list_data.name}</div>
                        <div>
                            { list_data.archived ? 
                                <div style={{color:"rgb(0,0,0,0.5)"}} >(Archived)</div>
                            : 
                                <div></div>
                            }
                        </div>
                    </Stack>     
                    <div style={{color:"rgb(0,0,0,0.5)"}} >{item_previews}</div>
                    
                </Stack>
                <Stack direction="horizontal" style={{position:"relative", bottom:"0%", justifyContent:"space-between"}}>
                    { list_data.owner === userData.authenticatedID ? 
                        <Badge>Owner</Badge>
                    : 
                        <Badge bg="secondary">Member</Badge>
                    }
                    <div>
                        {member_icons}
                    </div>
                </Stack>
            </Card>
    );
}

export default ShoppingListCard;
