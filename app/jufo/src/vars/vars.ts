import { useState } from "react";

const [haustyp, setHaustyp] = useState<number>(0);

export const changeHaustyp = (typ: number) => {
    setHaustyp(typ);
};

export default haustyp;