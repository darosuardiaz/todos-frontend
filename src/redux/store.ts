import { combineReducers, configureStore } from "@reduxjs/toolkit"
import todosReducer from "./reducers/todosReducer"


const appReducer = combineReducers({
    todos: todosReducer,
})


export const store = configureStore({
    reducer: { app: appReducer },
    middleware: (getdefaultMiddleware) => 
        getdefaultMiddleware({ serializableCheck: false })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store