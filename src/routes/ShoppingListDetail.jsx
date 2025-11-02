
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ListItem from '../components/ListItem';
import { useContext, useState } from 'react';
import { ShoppingListDataContext } from "../components/ShoppingListProvider.jsx";
import ListItemList from '../components/ListItemList.jsx';
import MemberList from '../components/MemberList.jsx';
import { UserContext } from '../components/UserProvider.jsx';
import InviteMemberModal from '../components/modals/InviteMemberModal.jsx';
import ShoppingListModals from '../components/ShoppingListModals.jsx';
import EditItemModal from '../components/modals/EditItemModal.jsx';
import EditShoppingListModal from '../components/modals/EditShoppingListModal.jsx';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup.js';
import ToggleButton from 'react-bootstrap/esm/ToggleButton.js';
import FilteringTab from '../components/FilteringTab.jsx';



function ShoppingListDetail() {

    // Modal Controls ----------------

    const [ inviteMemberState, setInviteMemberState ] = useState(false);
    const openInviteMemberModal = () => setInviteMemberState(true) ;
    const closeInviteMemberModal = () => setInviteMemberState(false) ;

    const [ editItemState, setEditItemState ] = useState({open:false, itemID:"", itemData:{name:undefined,quantity:0}});
    const openEditItemModal = () => setEditItemState({open:true, itemID:"", itemData:{name:undefined,quantity:1}}) ;
    const closeEditItemModal = () => setEditItemState({...editItemState,open:false}) ;

    const [ editListState, setEditListState ] = useState({open:false, listData:{name:undefined}});
    const openEditListModal = () => setEditListState({open:true, listData:{name:shoppingListData}}) ;
    const closeEditListModal = () => setEditListState({...editListState, open:false}) ;

    // -------------------------------

    const [ filterOption, setFilterOption ] = useState("2");

    const { shoppingListData } = useContext(ShoppingListDataContext);
    const { userData } = useContext(UserContext);

    const is_owner = (shoppingListData.owner === userData.authenticatedID);

    if ( shoppingListData.members.findIndex( (e) => e===userData.authenticatedID ) === -1 ) {
        return (
            <div className="Full-Page-Notice">
               {"You are not a member of this shopping list :("}
            </div>
        )

    }

    return (
        <div>
            <div className="Shopping-List-Header" style={{alignItems:"center", marginBottom:"12px", height:"40px"}}>
                <Stack direction='horizontal' gap={2} >

                    <div className='Shopping-List-Title Big-Label'>{shoppingListData.name}</div>
                
                    { is_owner ? 
                        <Stack direction='horizontal' gap={2} className="ms-auto">
                            <div > <Button variant='outline-secondary' onClick={openEditListModal}>Edit</Button> </div>
                            <div> <Button variant='outline-secondary'>Archive</Button> </div>
                            <div> <Button variant='outline-danger'>Delete</Button> </div>
                        </Stack>
                    : 
                        <div></div>
                    }

                </Stack>
            </div>

            <div className='Shopping-List-Body'>
                <FilteringTab filterOption={filterOption} setFilterOption={setFilterOption}/>

                <ListItemList itemList={shoppingListData.items} setEditItemState={setEditItemState} filterOption={filterOption}/>
                
                <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                    <Button style={{boxShadow:"0 4px 12px 0px rgb(0 0 0 / 20%)"}} onClick={openEditItemModal}>+ Add Item</Button>
                </div>
                
                <div className='Big-Label' style={{marginTop:"24px", marginBottom:"12px"}}>Member List</div>
            
                <MemberList memberList={shoppingListData.members}/>
                { is_owner ?
                <div style={{width:"100%", justifyContent:"center", display:"flex", }}>
                    <Button style={{boxShadow:"0 4px 12px 0px rgb(0 0 0 / 20%)"}} onClick={openInviteMemberModal} >+ Invite Members</Button>
                </div>
                :
                <div>
                    
                </div>
                }

            </div>
            <div className="Shopping-List-Modals">
                <InviteMemberModal visible={inviteMemberState} closeFunction={closeInviteMemberModal} />
                <EditItemModal editItemState={editItemState} setEditItemState={setEditItemState} closeFunction={closeEditItemModal} />
                <EditShoppingListModal editListState={editListState} setEditListState={setEditListState} closeFunction={closeEditListModal}  />
            </div>
        </div>
  );
}

export default ShoppingListDetail;
