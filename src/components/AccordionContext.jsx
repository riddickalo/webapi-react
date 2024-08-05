import React, { createContext, useState, useContext } from "react";

const AccordionContext = createContext();
export const AccordionProvider = ({ children }) => {
    const [accordionState, setAccordionState] = useState({
        nc: false,
        alarm: false,
        order: false,
        setting: false,
        sys: false,
    });

    const toggleAccordion = (section) => {
        setAccordionState((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <AccordionContext.Provider value={{ accordionState, toggleAccordion }}>
            {children}
        </AccordionContext.Provider>
    );
};

export const useAccordion = () => useContext(AccordionContext);