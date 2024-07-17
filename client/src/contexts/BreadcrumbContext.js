import { createContext, useContext, useState } from "react";

export const BreadcrumbContext = createContext();

export default function BreadcrumbProvider({ children }) {
    const [breadcrumb, setBreadcrumb] = useState([]);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export const useBreadcrumb = () => {
    return useContext(BreadcrumbContext);
};
