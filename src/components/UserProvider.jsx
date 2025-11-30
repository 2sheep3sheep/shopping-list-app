import { createContext, useContext, useEffect, useState } from "react";
import FetchHelper from "../fetchHelper";
import { MockContext } from "./MockDataProvider";



export const UserContext = createContext();

function UserContextProvider({children}) {

    const mock = (process.env.REACT_APP_MOCK_DATA === "1")
    const { mockData, setMockData, mockDataHandlerMap } = useContext(MockContext)
    
    let default_user_data = {
        users:[],
        authenticatedID: "-1"        //for the purpose of the HW assignment, can choose which user to be authenticated as
    };

    const [userData, setUserData] = useState( {state:"pending", data:default_user_data} )

    function authenticate() {
        setUserData(
            {
                ...userData,
                data:{
                    ...userData.data,
                    authenticatedID: localStorage.getItem("userID")
                }
            }
        )
    }

    function changeAuthenticatedUser(new_ID) {
        loginUser(new_ID)
    }

    async function loginUser(new_ID) {
        if (mock) {
            localStorage.setItem("userID", new_ID)
            setUserData(
                {
                    ...userData,
                    state:"ready",
                    data:{
                        ...userData.data,
                        authenticatedID: new_ID
                    }
                }
            )
            return;
        }

        const result = await FetchHelper.loginUser( { userID:new_ID } )

        if ( result.ok ) {
            localStorage.setItem("token", result.data.token )
            localStorage.setItem("userID", new_ID)
            window.location.reload();
        }
    }

    async function getUsers() {
        if (mock) {
            setUserData(
                {
                    ...userData,
                    state:"ready",
                    data:{
                        ...userData.data,
                        users: mockData.users,
                        authenticatedID: localStorage.getItem("userID")
                    }
                }
            )
            return;
        }

        const result = await FetchHelper.users();

        console.log(result)
        if ( result.status === "error") {
            setUserData(
                {
                    ...userData,
                    state:"pending",
                    data:null
                }
            )
            return;
        }
        

        setUserData(
            {
                ...userData,
                state:"ready",
                data:{
                    ...userData.data,
                    users: result.data,
                    authenticatedID: localStorage.getItem("userID")
                }
            }
        )
    }

    useEffect( () => {getUsers()}, [] )

    const value = {
        userData,
        setUserData,
        userDataHandlerMap: { changeAuthenticatedUser, getUsers }
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;