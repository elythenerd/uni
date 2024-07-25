import React from "react";

interface EnrollmentYear {
    year: string;
    setYearError: React.Dispatch<React.SetStateAction<boolean>>;
    setBirthDate: React.Dispatch<React.SetStateAction<string>>;
}

export const checkEnrollmentYear = (
    year: string, 
    setYearError: React.Dispatch<React.SetStateAction<boolean|undefined>>, 
    setBirthDate: React.Dispatch<React.SetStateAction<string>>
): void => {
    if ((parseInt(year) && year.length === 4 && parseInt(year) > 1999) || year.length === 0) {
        setYearError(false);
        setBirthDate(year);
    } else {
        setYearError(true);
    }
};
