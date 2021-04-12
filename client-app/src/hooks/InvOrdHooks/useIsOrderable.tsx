import { useState } from "react"

const useIsOrderable = () => {

const [orderable, setIsOrderable] = useState(true);

const toggleIsOrderable = () => {
    setIsOrderable(false)
}

return [orderable, toggleIsOrderable] as const;
}
export default useIsOrderable;