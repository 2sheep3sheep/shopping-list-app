
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShoppingListDataContext } from '../ShoppingListProvider';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { ShoppingListsDataContext } from '../ShoppingListsProvider';
import { UserContext } from '../UserProvider';

function CreateShoppingListModal(props) {

    const { shoppingListsData, setShoppingListsData, shoppingListsHandlerMap } = useContext(ShoppingListsDataContext);
    const { userData } = useContext(UserContext);

    const [ validationState, setValidationState ] = useState({name:false});

    const is_editing = true//(props.editItemState.itemID == "")

    
    function changeList() {
        var valid = true

        setValidationState({name:false});

        if ((props.createListState.listData.name ?? "") === "") {valid = false; setValidationState({...validationState, name:true})}

        if (valid) {
            shoppingListsHandlerMap.createList( props.createListState.listData, userData.data.authenticatedID )
            props.closeFunction()
        }
    }


    function setNewName(_name) {
        props.setCreateListState(
            {...props.createListState,
                listData: {...props.createListState.listData, name:_name}
            }
        )
    }


    return (
        <Modal show={props.createListState["open"]} onHide={props.closeFunction}>
            <Modal.Dialog style={{width:"100%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>{is_editing ? "Create Shopping List":"Edit Shopping List"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width:"100%"}}>
                    <Form>
                    <FloatingLabel label="Name" controlId="Item-Name">
                        <Form.Control isInvalid={validationState.name ? true : false} value={props.createListState.listData["name"]} controlId="Item-Name" type="text" placeholder='Name' onChange={ (e) => setNewName(e.target.value) }>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Please type a name for the list.</Form.Control.Feedback>
                    </FloatingLabel>
                    </Form>
                </Modal.Body>   
                <Modal.Footer>
                <Button variant="secondary" onClick={props.closeFunction}>
                    Close
                </Button>
                <Button variant="primary" onClick={changeList}>
                    {is_editing ? "Create Shopping List":"Save Changes"}
                </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default CreateShoppingListModal;
