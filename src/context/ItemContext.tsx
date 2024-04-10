import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface Props {
  children?: ReactNode
}

interface ItemAction {
  type: {};
  payload: [];
}

interface ItemState {
  items: null[]
}

interface ContextType {
  items: [][];
  dispatch: Dispatch<ItemAction>;
}

export const ItemsContext = createContext<ContextType>({} as ContextType)

export const itemsReducer = (state: ItemState, action: ItemAction) => {
  console.log('Entering switch statement...')
  switch (action.type) {
    case 'SET_ITEMS':
      console.log('SET_ITEMS running...')
      console.log(action.payload)
      return {
        items: action.payload
      }
    case 'CREATE_ITEM':
      return {
        items: [action.payload, ...state.items]
      }
    default:
      return state
  }
}

export const ItemsContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(itemsReducer, {
    items: null
  })

  console.log("ItemsContextProvider State", state)

  return (
    <ItemsContext.Provider value={{...state, dispatch}}>
      {children}
    </ItemsContext.Provider>
  )
}