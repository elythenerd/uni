import React from "react"

export const checkID = (id: string,setID:React.Dispatch<React.SetStateAction<string>>,setError:React.Dispatch<React.SetStateAction<boolean>>,setErrorMessage:React.Dispatch<React.SetStateAction<string>>) => {
     
    setID(id)
    // console.log(ErrorMessage)
    // console.log(Id.length)
    if (parseInt(id) && id.length === 9) {
        setError(false)
    } else {
        setError(true)
        if (!id.length) {
            setError(false)
        } else if (parseInt(id)) {
            setErrorMessage('ת.ז מכיל תשע ספרות')
        }
        else if (id.length) {
            setErrorMessage('ת.ז מכיל רק ספרות')
        }


    }
}