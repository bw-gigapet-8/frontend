export const addFood = (data) =>{
    return {
        type: "ADD_FOOD",
        payload: data
    }
}
export const updateFood = (data) =>{
    return {
        type: "UPDATE_FOOD",
        payload: data
    }
}
export const deleteFood = (data) =>{
    return {
        type: "DELETE_FOOD",
        payload: data
    }
}
export const getFood = (data) =>{
    return {
        type: "GET_FOOD",
        payload: data
    }
}
export const addUser = (data) =>{
    return {
        type: "ADD_USER",
        payload: data
    }
}

export const setPet = (data) =>{
    return {
        type: "SET_PET_INFO",
        payload: data
    }
}

export const getPetInfo = (data) =>{
    return {
        type: "GET_PET_INFO",
        payload: data
    }
}