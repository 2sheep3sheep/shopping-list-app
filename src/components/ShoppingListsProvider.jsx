import { createContext, useState } from "react";



export const ShoppingListsDataContext = createContext();


function generate_random_list() {
    var new_list = {}
    new_list.name = `Shopping List #${Math.floor(1+Math.random()*99)}`
    new_list.items = {};

    new_list.members = [];

    new_list.members.push( String( Math.floor(1+Math.random()*5) ) );   // add at least one random member
    // add other randomized members
    for (var i=0; i<6; i++) {
        if ( Math.random()>0.5 && !new_list.members.includes(String(i+1)) ) new_list.members.push(String(i+1))
    }
    //choose owner randomly
    new_list.owner = new_list.members[ Math.floor(1+Math.random()*(new_list.members.length-1))  ]

    new_list.archived = Math.random()>0.5 ? true : false;

    for (var i=0; i<Math.floor(1+Math.random()*10); i++) {
        new_list.items[`${i}`] = {name:`Item ${i+1}`, quantity:Math.floor(1+Math.random()*9), complete: Math.random()>0.5 ? true : false };
    }

    return new_list
}

function ShoppingListsProvider({children}) {
    let default_lists_data = {
        shoppingLists : []
    };

    for (var i=0; i<10; i++) {
        default_lists_data.shoppingLists.push( generate_random_list() )
    }

    console.log(default_lists_data)

    const [shoppingListsData, setShoppingListsData] = useState( default_lists_data )


    function createList(_list_data,_authID) {
        var new_list = {
            ..._list_data,
            items:{},
            owner:_authID,
            archived: false
        }
        new_list.members = []
        new_list.members.push(_authID)

        var new_lists_list = shoppingListsData.shoppingLists;
        new_lists_list.push(new_list)

        setShoppingListsData(
            {
                ...shoppingListsData,
                shoppingLists: new_lists_list
            }
        )
    }

    const value = {
        shoppingListsData,
        setShoppingListsData,
        shoppingListsHandlerMap: { createList }
    }

    return (
        <ShoppingListsDataContext.Provider value={value}>
            {children}
        </ShoppingListsDataContext.Provider>
    )

}

export default ShoppingListsProvider;
