/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) =>{

    const currency = 'MMK'

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = [
        "",
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
    
    
      // Utility function to format date
      const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("-");
        return (
          dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
        );
      };

    const value = { 
        calculateAge,
        slotDateFormat,
        currency,
        // Add other necessary state and functions here...
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider