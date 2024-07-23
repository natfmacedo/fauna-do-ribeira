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

const AnimalBodySchema = schema.object({
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

const AnimalQuerySchema = schema.object({
    id: schema.string().uuid(),
});

async function getAnimalById(req: NextApiRequest, res: NextApiResponse) {
    const QuerySchema = schema.object({
        id: schema.string().uuid().nonempty(),
    });

    // Fail Fast Validation
    const parsedQuery = QuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
        res.status(400).json({
            error: {
                message: `You must to provid a valid id`,
            },
        });
        return;
    }

    try {
        const animalId = parsedQuery.data.id;
        const animalById = await animalRepository.getAnimalById(animalId);
        res.status(200).json({
            animal: animalById,
        });
    } catch (err) {
        return res.status(404).json({
            error: {
                message: `Id not found`,
            },
        });
    }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
    // Fail Fast Validations
    const body = AnimalBodySchema.safeParse(req.body);

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

// async function getAnimalById(req: NextApiRequest, res: NextApiResponse) {
//     const query =
// }

async function animalUpdate(req: NextApiRequest, res: NextApiResponse) {
    // Fail Fast Validations
    const body = AnimalBodySchema.safeParse(req.body);
    const query = AnimalQuerySchema.safeParse(req.query);

    // Type Narrowing
    if (!body.success) {
        res.status(400).json({
            error: {
                message:
                    "You need to provide all the informations to update an animal",
                description: body.error.issues,
            },
        });
        return;
    }
    if (!query.success) {
        res.status(400).json({
            error: {
                message: "You need to provide a valid ID",
                description: query.error.issues,
            },
        });
        return;
    }
    try {
        const updatedAnimal = await animalRepository.animalUpdate(
            query.data.id,
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
        res.status(200).json({
            animal: updatedAnimal,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                error: {
                    message: err.message,
                },
            });
        }
    }
    // if (!animalId || typeof animalId !== "string") {
    //     res.status(400).json({
    //         error: {
    //             message: "You must to provide a string ID.",
    //         },
    //     });
    //     return;
    // }
}

export const animalController = {
    get,
    create,
    getAnimalById,
    animalUpdate,
};
