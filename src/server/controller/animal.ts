import { NextApiRequest, NextApiResponse } from "next";
import { z as schema } from "zod";
import { animalRepository } from "@server/repository/animal";
import { HttpNotFoundError } from "@server/infra/errors";

async function get(_: NextApiRequest, res: NextApiResponse) {
    const output = await animalRepository.get();

    res.status(200).json({
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

    try {
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
    } catch {
        res.status(400).json({
            error: {
                message: "Failed to create animal",
            },
        });
    }
}

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
        if (err instanceof HttpNotFoundError) {
            return res.status(err.status).json({
                error: {
                    message: err.message,
                },
            });
        }
    }
}

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
        if (err instanceof HttpNotFoundError) {
            res.status(err.status).json({
                error: {
                    message: err.message,
                },
            });
        }
    }
}

async function deleteById(req: NextApiRequest, res: NextApiResponse) {
    const QuerySchema = schema.object({
        id: schema.string().uuid().nonempty(),
    });

    // Fail Fast Validations
    const parsedQuery = QuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
        res.status(400).json({
            error: {
                message: "You must to provide a valid id",
            },
        });
        return;
    }

    try {
        const animalId = parsedQuery.data.id;
        await animalRepository.deleteById(animalId);
        res.status(204).end();
    } catch (err) {
        if (err instanceof HttpNotFoundError) {
            return res.status(err.status).json({
                error: {
                    message: err.message,
                },
            });
        }

        res.status(500).json({
            error: {
                message: "Internal server error",
            },
        });
    }
}

export const animalController = {
    get,
    create,
    getAnimalById,
    animalUpdate,
    deleteById,
};
