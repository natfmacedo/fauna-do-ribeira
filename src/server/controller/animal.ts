import { NextApiRequest, NextApiResponse } from "next";
import { z as schema } from "zod";
import { animalRepository } from "@server/repository/animal";

async function get(req: NextApiRequest, res: NextApiResponse) {
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

const AnimalCreateBodySchema = schema.object({
    name: schema.string(),
    scientificName: schema.string(),
    image: schema.string(),
    imageDescription: schema.string(),
    characteristics: schema.string(),
    eating: schema.string(),
    location: schema.string(),
    iucnState: schema.string(),
    link: schema.string(),
});

async function create(req: NextApiRequest, res: NextApiResponse) {
    // Fail Fast Validations
    const body = AnimalCreateBodySchema.safeParse(req.body);

    // Type Narrowing
    if (!body.success) {
        res.status(400).json({
            error: {
                message:
                    "You need to provide all the informations to create an animal",
                description: body.error.issues,
            },
        });
        return;
    }

    const createdAnimal = await animalRepository.createAnimal(
        body.data.name,
        body.data.scientificName,
        body.data.image,
        body.data.imageDescription,
        body.data.characteristics,
        body.data.eating,
        body.data.location,
        body.data.iucnState,
        body.data.link
    );

    res.status(201).json({
        animal: createdAnimal,
    });
}

export const animalController = {
    get,
    create,
};
