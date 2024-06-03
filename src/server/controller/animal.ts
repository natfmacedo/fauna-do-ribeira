import { animalRepository } from "@server/repository/animal";
import { NextApiRequest, NextApiResponse } from "next";

function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const page = Number(query.page);
    const limit = Number(query.limit);

    if (query.page && isNaN(page)) {
        res.status(400).json({
            error: {
                message: "`page` must be a number",
            },
        });
        return;
    }
    if (query.limit && isNaN(limit)) {
        res.status(400).json({
            error: {
                message: "`limit` must be a number",
            },
        });
        return;
    }

    const output = animalRepository.get({
        page,
        limit,
    });

    res.status(200).json({
        total: output.total,
        pages: output.pages,
        animals: output.animals,
    });
}

export const animalController = {
    get,
};
