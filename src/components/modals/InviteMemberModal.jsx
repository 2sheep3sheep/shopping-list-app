
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

    const memberToggles = Object.keys(userData.users).map( u => shoppingListData.members.findIndex( (m) => m===u )==-1 ? (
        <ToggleButton 
        id={`tbg-btn-${u}`} 
        variant="outline-primary" 
        value={u} 
        style={{textAlign:"left"}} 
        >{userData.users[u].name}</ToggleButton>) : <></>
    );

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
