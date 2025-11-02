import { useContext } from "react";
import { ShoppingListDataContext } from "./ShoppingListProvider";
import ListItem from "./ListItem";

function ListItemList(props) {

    let list_items = []
    
    const item_ids = Object.keys( props.itemList );

    for (var i=0; i<item_ids.length; i++) {
        var key = item_ids[i]
        list_items.push( <ListItem itemID={key} itemData={props.itemList[key]} setEditItemState={props.setEditItemState} filterOption={props.filterOption}/> )
    }

    return (
        <div>
            {list_items}
        </div>
    );
}

export default ListItemList;
