var haustyp = 3;

export const changeHaustyp = (typ: number) => {
    haustyp = typ;
};

export const getHaustyp = () => {
    return haustyp;
};

export const hausStrings = ["Apartmenthaus", "Reihenhaus", "Mehrfamilienhaus", "Einfamilienhaus"];

export default null;