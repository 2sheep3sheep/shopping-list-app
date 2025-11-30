import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FetchHelper from "../fetchHelper";
import { MockContext } from "./MockDataProvider";


export const ShoppingListDataContext = createContext();

function ShoppingListProvider({children}) {
 
     const mock = (process.env.REACT_APP_MOCK_DATA === "1")
     const { mockData, setMockData, mockDataHandlerMap } = useContext(MockContext)

    const navTo = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    
    
    const list_id = searchParams.get("id") ?? null;

    let default_list_data = {
        name: "",
        owner: "-1",
        items: [],
        members: ["-1"]
    };

    

    const [shoppingListData, setShoppingListData] = useState( { state:"pending", data:default_list_data } )


    async function getList() {
        if (mock) {
            const data = mockDataHandlerMap.getList(list_id);
            console.log(data)
            if (data) {
                setShoppingListData({
                    ...shoppingListData,
                    state:"ready",
                    data: data
                })
            }else{
                setShoppingListData({
                    ...shoppingListData,
                    state:"error",
                    data: default_list_data
                })
            }
            return
        }

        const result = await FetchHelper.shoppingList.get({id:list_id});

        if (result.ok) {
            setShoppingListData({
                ...shoppingListData,
                state:"ready",
                data: result.data
            })
        }else{
            setShoppingListData({
                ...shoppingListData,
                state:"error",
                data: default_list_data
            })
        }

    }

    useEffect( () => {getList()}, [])


    async function completeItem(item_id) {
        if (mock) {
            const result = mockDataHandlerMap.completeItem(item_id,shoppingListData.data._id)
            setShoppingListData( {...shoppingListData} )
            return
        }

        const result = await FetchHelper.item.markComplete(
            {
                shoppingListID: shoppingListData.data._id,
                itemID:item_id
            }
        )
        
        if (result.ok) {

            setShoppingListData(
                {
                    ...shoppingListData,
                    data:result.data
                }
            )
        }
    }

    async function removeMember(user_id) {
   
        if (mock) {
            const result = mockDataHandlerMap.removeMember(user_id,shoppingListData.data._id)
            setShoppingListData( {...shoppingListData} )
            return
        }

        const result = await FetchHelper.member.remove(
            {
                shoppingListID: shoppingListData.data._id,
                userID: user_id
            }
        )
        
        if (result.ok) {

            setShoppingListData(
                {
                    ...shoppingListData,
                    data:result.data
                }
            )
        }
    }

    async function inviteMembers(id_list) {
        for (var i=0; i<id_list.length; i++) {
            var id = id_list[i]

                
            if (mock) {
                const result = mockDataHandlerMap.inviteMember(id,shoppingListData.data._id)
                setShoppingListData( {...shoppingListData} )
                continue
            }

            const result = await FetchHelper.member.add(
                {
                    shoppingListID: shoppingListData.data._id,
                    userID: id
                }
            )
            
            if (result.ok) {

                setShoppingListData(
                    {
                        ...shoppingListData,
                        data:result.data
                    }
                )
            }
        }
    }


    
    async function addItem(itemData) {
        if (mock) {
            const result = mockDataHandlerMap.addItem(itemData,shoppingListData.data._id)
            return
        }

        const result = await FetchHelper.item.add(
            {
                shoppingListID: shoppingListData.data._id,
                data: {
                    name: itemData.name,
                    quantity: Number(itemData.quantity),
                }
            }
        )

        if (result.ok) {

            setShoppingListData(
                {
                    ...shoppingListData,
                    data:result.data
                }
            )
        }
    }

    async function editItem(itemData) {
        if (mock) {
            const result = mockDataHandlerMap.editItem(itemData,itemData._id,shoppingListData.data._id)
            return
        }

        const result = await FetchHelper.item.edit(
            {
                shoppingListID: shoppingListData.data._id,
                itemID:itemData._id,
                data: {
                    name: itemData.name,
                    quantity: Number(itemData.quantity),
                }
            }
        )
        
        if (result.ok) {

            setShoppingListData(
                {
                    ...shoppingListData,
                    data:result.data
                }
            )
        }
    }



    async function deleteItem(itemID) {
        if (mock) {
            const result = mockDataHandlerMap.deleteItem(itemID,shoppingListData.data._id)
            setShoppingListData( {...shoppingListData} )
            return
        }

        const result = await FetchHelper.item.remove(
            {
                shoppingListID: shoppingListData.data._id,
                itemID:itemID
            }
        )
        
        if (result.ok) {

            setShoppingListData(
                {
                    ...shoppingListData,
                    data:result.data
                }
            )
        }
    }

    async function archiveList() {
        if (mock) {
            const result = mockDataHandlerMap.archiveList(shoppingListData.data._id)
            navTo("/")
            return
        }

        const result = await FetchHelper.shoppingList.archive(
            {
                _id: shoppingListData.data._id,
            }
        )
        if (result.ok) {
            navTo("/")
        }
    }

    async function deleteList() {
        if (mock) {
            const result = mockDataHandlerMap.deleteList(shoppingListData.data._id)
            navTo("/")
            return
        }

        const result = await FetchHelper.shoppingList.delete(
            {
                _id: shoppingListData.data._id,
            }
        )
        if (result.ok) {
            navTo("/")
        }
    }
    
    async function editList(listData) {
        if (mock) {
            const result = mockDataHandlerMap.editList(listData,shoppingListData.data._id)
            setShoppingListData( {
                ...shoppingListData,
                data: {
                    ...shoppingListData.data,
                    name: listData.name
                }

            } )
            return
        }

        const result = await FetchHelper.shoppingList.edit(
            {
                _id: shoppingListData.data._id,
                data : {
                    name: listData.name
                }
            }
        )
        
        if (result.ok) {

            setShoppingListData(
                {
                    ...shoppingListData,
                    data:result.data
                }
            )
        }
    }

    function newItemID() {
        return (Math.random()*(2^8)).toString();
    }

    const value = {
        shoppingListData,
        setShoppingListData,
        shoppingListHandlerMap: { completeItem, inviteMembers, removeMember, addItem, editItem, editList, deleteItem, deleteList, newItemID, archiveList }
    }

    return (
        <ShoppingListDataContext.Provider value={value}>
            {children}
        </ShoppingListDataContext.Provider>
    )

}

export default ShoppingListProvider;
