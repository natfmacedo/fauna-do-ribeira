import { read } from "@db-crud-animais";
import { NextApiRequest, NextApiResponse } from "next";

function get(_: NextApiRequest, res: NextApiResponse) {
    const ALL_ANIMALS = read();
    res.status(200).json({
        animals: ALL_ANIMALS,
    });
}

export const animalController = {
    get,
};
