
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShoppingListDataContext } from '../ShoppingListProvider';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';

function EditShoppingListModal(props) {

    const { shoppingListData, setShoppingListData, shoppingListHandlerMap } = useContext(ShoppingListDataContext);

    const [ validationState, setValidationState ] = useState({name:false});

    const is_editing = false//(props.editItemState.itemID == "")

    
    function changeList() {
        var valid = true

        setValidationState({name:false, quantity:false});

        if ((props.editListState.listData.name ?? "") === "") {valid = false; setValidationState({...validationState, name:true})}

        if (valid) {
            shoppingListHandlerMap.editList( props.editListState.listData )
            props.closeFunction()
        }
    }


    function setNewName(_name) {
        props.setEditListState(
            {...props.editListState,
                listData: {...props.editListState.listData, name:_name}
            }
        )
    }


    return (
        <Modal show={props.editListState["open"]} onHide={props.closeFunction}>
            <Modal.Dialog style={{width:"100%"}}>
                <Modal.Header closeButton>
                    <Modal.Title>{is_editing ? "Create Shopping List":"Edit Shopping List"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width:"100%"}}>
                    <Form>
                    <FloatingLabel label="Name" controlId="Item-Name">
                        <Form.Control isInvalid={validationState.name ? true : false} value={props.editListState.listData["name"]} controlId="Item-Name" type="text" placeholder='Name' onChange={ (e) => setNewName(e.target.value) }>
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

export default EditShoppingListModal;
