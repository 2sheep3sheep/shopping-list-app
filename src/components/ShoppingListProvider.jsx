import { createContext, useState } from "react";



export const ShoppingListDataContext = createContext();

function ShoppingListProvider({children}) {
    let default_list_data = {
        name: "My Shopping List",
        owner: "6",
        items: {},
        members: ["1","4","5","6"]
    };

    for (var i=0; i<5; i++) {
        default_list_data.items[`${i}`] = {name:`Item ${i+1}`, quantity:Math.floor(1+Math.random()*9), complete: Math.random()>0.5 ? true : false };
    }

    const [shoppingListData, setShoppingListData] = useState( default_list_data )


    function completeItem(item_id) {

        shoppingListData.items[item_id].complete = true;

        setShoppingListData(
            {...shoppingListData}
        )
    }

    function removeMember(user_id) {
        var index = shoppingListData.members.indexOf(user_id)
        if (index != -1) shoppingListData.members.splice(index, 1);
        setShoppingListData(
            {...shoppingListData}
        )
    }

    function inviteMembers(id_list) {
        for (var i=0; i<id_list.length; i++) {
            var id = id_list[i]
            shoppingListData.members.push(id);
        }
        setShoppingListData(
            {...shoppingListData}
        )
    }

    function editItem(itemID, itemData) {
        shoppingListData.items[itemID] = itemData
    }

    function deleteItem(itemID) {
        delete shoppingListData.items[itemID];
    }

    function editList(listData) {
        shoppingListData.name = listData.name
    }

    function newItemID() {
        return (Math.random()*(2^8)).toString();
    }

    const value = {
        shoppingListData,
        setShoppingListData,
        shoppingListHandlerMap: { completeItem, inviteMembers, removeMember, editItem, editList, deleteItem, newItemID }
    }

    return (
        <ShoppingListDataContext.Provider value={value}>
            {children}
        </ShoppingListDataContext.Provider>
    )

}

export default ShoppingListProvider;
