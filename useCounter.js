import { useState } from "react"

export const useCounter = (initialValue) => {
    const [counter, setCounter] = useState(initialValue);
    
    const onAddCounter = () => {
        setCounter(counter+1);
    }

    const onRestCounter = () => {
        console.log("click");
        if (counter == 0) return;
        setCounter(counter - 1);
    }

    const onReset= () => {
        setCounter(initialValue);
    }

    return {
        counter,
        onAddCounter,
        onRestCounter,
        onReset
    };
}