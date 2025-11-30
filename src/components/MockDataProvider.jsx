import { createContext, useEffect, useState } from "react";
import FetchHelper from "../fetchHelper";




export const MockContext = createContext();

function MockDataProvider({children}) {

    const loggedInUser = localStorage.getItem("userID")

    function randomID() {
        return (Math.random()*(2^8)).toString();
    }

  
    let default_mock_data = {
        shoppingLists:[
            {
                _id:"1",
                owner:"1",
                items:[
                    {   _id:"1",
                        name:"Normal Item",
                        quantity:"1"
                    },
                    {   _id:"2",
                        name:"Completed Item",
                        quantity:"1",
                        complete: true
                    }
                ],
                members:["1","2"],
                name:"Shopping List"
            },
            
            {
                _id:"2",
                owner:"2",
                items:[],
                members:["2","3","4","5"],
                name:"Archived List",
                archived: true
            }
        ],
        users:[
            {_id:"1",name:"Bořek"},
            {_id:"2",name:"Julie"},
            {_id:"3",name:"Zubr"},
            {_id:"4",name:"Libor"},
            {_id:"5",name:"Pavlína"}
        ]
    };

    const [mockData, setMockData] = useState( default_mock_data )


    function getList(_id) {
        return mockData.shoppingLists.find( (e) => e._id === _id );
    }

    function addItem(_item_data,_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;
        mockData.shoppingLists[index].items.push(
            {
                _id: randomID(),
                name: _item_data.name,
                quantity: _item_data.quantity
            }
        )
    }

    function editItem(_item_data,_item_id,_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;
        var item_index = mockData.shoppingLists[index].items.findIndex( (e) => e._id === _item_id )
        if (item_index === -1) return null;
        mockData.shoppingLists[index].items[item_index] = {
            ..._item_data,
            _id : _item_id
        }
    }

    function completeItem(_item_id,_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;
        var item_index = mockData.shoppingLists[index].items.findIndex( (e) => e._id === _item_id )
        if (item_index === -1) return null;
        mockData.shoppingLists[index].items[item_index].complete = true
        
    }

    function archiveList(_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;
        mockData.shoppingLists[index].archived = true
    }
    
    function deleteList(_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;
        mockData.shoppingLists.splice(index, 1)
    }
    
    function editList(_list_data,_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;
        mockData.shoppingLists[index] = {
            ...mockData.shoppingLists[index],
            name : _list_data.name
        }
    }
    

    function deleteItem(_item_id,_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;
        var item_index = mockData.shoppingLists[index].items.findIndex( (e) => e._id === _item_id )
        if (item_index === -1) return null;
        mockData.shoppingLists[index].items.splice(item_index, 1 )
    }

    function inviteMember(_member_id,_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;

        var member_index = mockData.shoppingLists[index].members.findIndex( (e) => e === _member_id )
        if (member_index !== -1) return null;
        mockData.shoppingLists[index].members.push(_member_id)
    }
    
    function removeMember(_member_id,_list_id) {
        var index = mockData.shoppingLists.findIndex( (e) => e._id === _list_id )
        if (index === -1) return null;

        var member_index = mockData.shoppingLists[index].members.findIndex( (e) => e === _member_id )
        if (member_index === -1) return null;
        mockData.shoppingLists[index].members.splice(member_index, 1 )
    }

    function createList(_list_data,_authID) {
        const data = {
            _id: randomID(),
            name: _list_data.name,
            owner: _authID,
            members: [
                _authID
            ],
            items: []
        }
        mockData.shoppingLists.push(data)
    }

    const value = {
        mockData,
        setMockData,
        mockDataHandlerMap: { createList, getList, addItem, editItem, deleteItem, completeItem, inviteMember, removeMember, archiveList, deleteList, editList }
    }

    return (
        <MockContext.Provider value={value}>
            {children}
        </MockContext.Provider>
    )

}

export default MockDataProvider;