var haustyp = 2;

export const changeHaustyp = (typ: number) => {
    haustyp = typ;
};

export const getHaustyp = () => {
    return haustyp;
};


export const hausStrings = ["Apartmenthaus", "Reihenhaus", "Mehrfamilienhaus", "Einfamilienhaus"];

export const hausVbrlist = [0.5, 0.064, 0.346, 0.09];

export const prdlist = [12.5, 3.75, 8.75, 18.75];

export const tagesVbrlist = [2.85, 0.37, 2, 0.51];


export default null;