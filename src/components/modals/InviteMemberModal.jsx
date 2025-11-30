
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShoppingListDataContext } from '../ShoppingListProvider';
import { UserContext } from '../UserProvider';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function InviteMemberModal(props) {

    const { shoppingListData, setShoppingListData, shoppingListHandlerMap } = useContext(ShoppingListDataContext);
    const { userData } = useContext(UserContext);

    const [selectedMembers, setSelectedMembers] = useState([]);
    const handleSelection = (val) => setSelectedMembers(val);

    let memberToggles = []

    for (var i=0; i<userData.data.users.length; i++) {
        var user = userData.data.users[i]
        if ( shoppingListData.data.members.findIndex( (e)=> e===user._id ) === -1 ) {
            memberToggles.push(
                <ToggleButton 
                id={`tbg-btn-${user._id}`} 
                variant="outline-primary" 
                value={user._id} 
                style={{textAlign:"left"}} 
                >{user.name}</ToggleButton>
            )
        }
    }


    function inviteSelectedMembers() {
        shoppingListHandlerMap.inviteMembers(selectedMembers);
        props.closeFunction();
        setSelectedMembers([]);
    }

    return (
        <Modal show={props.visible} onHide={props.closeFunction}>
            <Modal.Dialog style={{width:"100%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite Members</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width:"100%"}}>
                    <p>Select users to invite</p>
                    <ToggleButtonGroup vertical={true} type="checkbox" value={selectedMembers} onChange={handleSelection} style={{width:"50%"}}>
                        {memberToggles}
                    </ToggleButtonGroup>
                </Modal.Body>   
                <Modal.Footer>
                <Button variant="secondary" onClick={props.closeFunction}>
                    Close
                </Button>
                <Button variant="primary" disabled={ selectedMembers.length==0 ? true : false } onClick={inviteSelectedMembers} >
                    Invite Selected { selectedMembers.length==0 ? "" : `(${selectedMembers.length})` }
                </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default InviteMemberModal;
