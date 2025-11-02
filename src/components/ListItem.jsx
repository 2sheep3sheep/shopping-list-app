import Card from 'react-bootstrap/Card';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import { ShoppingListDataContext } from './ShoppingListProvider';

function ListItem(props) {

    const { shoppingListData, setShoppingListData, shoppingListHandlerMap } = useContext(ShoppingListDataContext)

    const data = props.itemData

    if (data === undefined) {
        return (
            <Spinner animation='border' style={{margin:"12px"}}/>
        );
    }

    function completeSelf() {
        shoppingListHandlerMap.completeItem(props.itemID);
        setShoppingListData({...shoppingListData});
    }

    function deleteSelf() {
        shoppingListHandlerMap.deleteItem(props.itemID);
        setShoppingListData({...shoppingListData});
    }

    function editSelf() {
        props.setEditItemState(
            {open:true, itemID:props.itemID, itemData:props.itemData}
        )
    }

    if (!shoppingListData.items[props.itemID]) {
        return (
            <div>
            </div>
        )
    }

    return (
            <Card className='List-Item' style={{marginBottom:"12px", height:"115px", justifyContent:"space-evenly"}}>
                <Stack direction="horizontal" style={{ marginBottom:"12px" }} >     
                    <div className='List-Item-Name'> {data.name} </div>
                    <Stack direction="horizontal" className="ms-auto shrink-response"  gap={2}>
                        <Button style={{width:"100%"}} variant='outline-secondary' onClick={editSelf}>Edit</Button>
                        <Button style={{width:`100%`}} variant='outline-danger' onClick={deleteSelf}><div className='verbose-label'>Remove</div><div className='compact-label'>X</div></Button>
                    </Stack>
                </Stack>
                <Stack direction='horizontal' gap={2}>     
                    <div>Quantity: {data.quantity}</div>
                    { !data.complete ? <Button className="ms-auto shrink-response"  variant='success' onClick={completeSelf} >Complete</Button> : <div/> }
                </Stack>
                         

                            
            </Card>
    );
}

export default ListItem;
