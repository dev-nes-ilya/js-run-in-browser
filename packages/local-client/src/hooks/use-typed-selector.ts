import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootStore } from "../store/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootStore> = useSelector;

export default useTypedSelector;
