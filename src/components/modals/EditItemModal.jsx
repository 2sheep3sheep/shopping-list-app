
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShoppingListDataContext } from '../ShoppingListProvider';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';

function EditItemModal(props) {

    const { shoppingListData, setShoppingListData, shoppingListHandlerMap } = useContext(ShoppingListDataContext);

    const [ validationState, setValidationState ] = useState({name:false, quantity:false});

    const is_editing = (props.editItemState.itemID == "")

    function changeItem() {
        var valid = true

        setValidationState({name:false, quantity:false});

        if ((props.editItemState.itemData.name ?? "") === "") {valid = false; setValidationState({...validationState, name:true})}
        if ((props.editItemState.itemData.quantity ?? "") === "") {valid = false; setValidationState({...validationState, quantity:"Please select a quantity."})}
        if (Number.isInteger(Number(props.editItemState.itemData.quantity)) === false) {valid = false; setValidationState({...validationState, quantity:"Please choose a whole number."})}

        if (valid) {
            shoppingListHandlerMap.editItem( props.editItemState.itemID !="" ? props.editItemState.itemID :shoppingListHandlerMap.newItemID() , props.editItemState.itemData)
            props.closeFunction()
        }
    }

    function setNewName(_name) {
        props.setEditItemState(
            {...props.editItemState,
                itemData: {...props.editItemState.itemData, name:_name}
            }
        )
    }
    function setNewQuantity(_quantity) {
        props.setEditItemState(
            {...props.editItemState,
                itemData: {...props.editItemState.itemData, quantity:_quantity}
            }
        )
    }

    return (
        <Modal show={props.editItemState["open"]} onHide={props.closeFunction}>
            <Modal.Dialog style={{width:"100%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>{is_editing ? "Add Item":"Edit Item"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width:"100%"}}>
                    <Form>
                    <FloatingLabel label="Name" controlId="Item-Name">
                        <Form.Control isInvalid={validationState.name ? true : false} value={props.editItemState.itemData["name"]} controlId="Item-Name" type="text" placeholder='Name'  onChange={ (e) => setNewName(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Please type a name for the item.</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Quantity" controlId="Item-Quantity" style={{marginTop:"12px"}}>
                        <Form.Control isInvalid={validationState.quantity ? true : false} value={props.editItemState.itemData["quantity"]} controlId="Item-Quantity" placeholder='Quantity' onChange={ (e) => setNewQuantity(e.target.value)}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{validationState.quantity}</Form.Control.Feedback>
                    </FloatingLabel>
                    </Form>
                </Modal.Body>   
                <Modal.Footer>
                <Button variant="secondary" onClick={props.closeFunction}>
                    Close
                </Button>
                <Button variant="primary" onClick={changeItem}>
                    {is_editing ? "Add Item":"Save Changes"}
                </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default EditItemModal;
