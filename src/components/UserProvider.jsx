import { createContext, useState } from "react";



export const UserContext = createContext();

function UserContextProvider({children}) {

    let default_user_data = {
        users:{
            "1":{name:"Bořek"},
            "2":{name:"Pavlína"},
            "3":{name:"Rudolf"},
            "4":{name:"Magdalena"},
            "5":{name:"Prokop"},
            "6":{name:"Julie"}
        },
        authenticatedID: "1"        //for the purpose of the HW assignment, can choose which user to be authenticated as
    };

    const [userData, setUserData] = useState( default_user_data )

    function changeAuthenticatedUser(new_ID) {
        setUserData( {...userData, authenticatedID:new_ID} )
    }


    const value = {
        userData,
        setUserData,
        userDataHandlerMap: { changeAuthenticatedUser }
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;