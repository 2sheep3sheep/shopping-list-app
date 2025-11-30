import { createContext, useContext, useEffect, useState } from "react";
import FetchHelper from "../fetchHelper";
import { MockContext } from "./MockDataProvider";



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

    const mock = (process.env.REACT_APP_MOCK_DATA === "1")
    const { mockData, setMockData, mockDataHandlerMap } = useContext(MockContext)

    let default_lists_data = {
        shoppingLists : []
    };

    /*
    if (mock) {
        for (var i=0; i<10; i++) {
            default_lists_data.shoppingLists.push( generate_random_list() )
        }

    }*/

    const [shoppingListsData, setShoppingListsData] = useState( { state:"pending", data:default_lists_data } )
    
    async function getLists() {
        if (mock) {
            setShoppingListsData(
                {
                    ...shoppingListsData,
                    state:"ready",
                    data: {shoppingLists:mockData.shoppingLists}
                }
            )
            return;
        }

        const result = await FetchHelper.shoppingList.list();

        if ( result.status === "error") {
            setShoppingListsData(
                {
                    ...shoppingListsData,
                    state:"pending",
                    data:null
                }
            )
            return;
        }
        setShoppingListsData(
            {
                ...shoppingListsData,
                state:"ready",
                data:result.data
            }
        )
    }


    useEffect( () => {getLists()}, [] )


    async function createList(_list_data,_authID) {

        if (mock) {
            console.log(_authID)
            mockDataHandlerMap.createList(_list_data,_authID);
            return;
        }

        /*
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
        )*/
        const result = await FetchHelper.shoppingList.create( { name:_list_data.name } )

        if ( result.ok ) {
            var new_lists_list = shoppingListsData.data.shoppingLists;
            console.log(result.data)
            new_lists_list.push(result.data)

            setShoppingListsData(
                {
                    ...shoppingListsData,
                    data: {
                        shoppingLists: new_lists_list
                    }
                }
            )
        }
    }

    const value = {
        shoppingListsData,
        setShoppingListsData,
        shoppingListsHandlerMap: { createList, getLists }
    }

    return (
        <ShoppingListsDataContext.Provider value={value}>
            {children}
        </ShoppingListsDataContext.Provider>
    )

}

export default ShoppingListsProvider;
