import { useState } from "react";

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) => {
        // console.log("holis")
        const {name, value} = target;
        setFormState({
            ...formState, 
            [name]: value }
        )
            // console.log(formState);
    }

    const onClearInput = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onClearInput
    }
}