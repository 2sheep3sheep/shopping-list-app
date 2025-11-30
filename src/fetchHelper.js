
const token = localStorage.getItem("token")

async function Call(baseUri, useCase, dtoIn, method) {

    let response;

    try {
        if (!method || method === "get") {
            if (dtoIn) {
                response = await fetch(`${baseUri}/${useCase}?${new URLSearchParams(dtoIn)}`, { headers: { "Authorization": `Bearer ${token}` } }  )
            } else {
                response = await fetch(`${baseUri}/${useCase}`, { headers: { "Authorization": `Bearer ${token}` } } )
            }
        } else {
            console.log( dtoIn )
            response = await fetch(`${baseUri}/${useCase}`,
                {
                    method: "POST",
                    headers: { 
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(dtoIn)
                }
            );
        }

        const data = await response.json();

        console.log(data);

        return { ok: response.ok, status: response.status, data };
    } catch (e) {
        return { ok: false, status: "error"}
    }

}

const baseUri = "http://localhost:8000";


const FetchHelper = {
    shoppingList: {
        list: async (dtoIn) => {
            return await Call(baseUri, "shoppingList/list", dtoIn, "get")
        },
        create: async (dtoIn) => {
            return await Call(baseUri, "shoppingList/create", dtoIn, "post")
        },
        edit: async (dtoIn) => {
            return await Call(baseUri, "shoppingList/edit", dtoIn, "post")
        },
        get: async (dtoIn) => {
            return await Call(baseUri, "shoppingList/get", dtoIn, "get")
        },
        delete: async (dtoIn) => {
            return await Call(baseUri, "shoppingList/delete", dtoIn, "post")
        },
        archive: async (dtoIn) => {
            return await Call(baseUri, "shoppingList/archive", dtoIn, "post")
        },
    },
    item: {
        add: async (dtoIn) => {
            return await Call(baseUri, "item/add", dtoIn, "post")
        },
        edit: async (dtoIn) => {
            return await Call(baseUri, "item/edit", dtoIn, "post")
        },
        markComplete: async (dtoIn) => {
            return await Call(baseUri, "item/markComplete", dtoIn, "post")
        },
        remove: async (dtoIn) => {
            return await Call(baseUri, "item/remove", dtoIn, "post")
        },
    },
    member: {
        add: async (dtoIn) => {
            return await Call(baseUri, "member/add", dtoIn, "post")
        },
        remove: async (dtoIn) => {
            return await Call(baseUri, "member/remove", dtoIn, "post")
        },
    },
    users:  async (dtoIn) => {
        return await Call(baseUri, "users", dtoIn, "get")
    },
    loginUser:  async (dtoIn) => {
        return await Call(baseUri, "login", dtoIn, "post")
    },
}

export default FetchHelper;