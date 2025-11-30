import { useContext } from "react";
import { ShoppingListDataContext } from "./ShoppingListProvider";
import ListItem from "./ListItem";

function ListItemList(props) {

    let list_items = []
    
    const items = props.itemList;

    for (var i=0; i<items.length; i++) {
        var item = items[i]
        list_items.push( <ListItem itemData={item} setEditItemState={props.setEditItemState} filterOption={props.filterOption}/> )
    }

    return (
        <div>
            {list_items}
        </div>
    );
}

export default ListItemList;
