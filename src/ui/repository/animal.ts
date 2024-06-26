import { z as schema } from "zod";
import { Animal, AnimalSchema } from "@ui/schema/animal";

interface AnimalRepositoryGetParams {
    page: number;
    limit: number;
}
interface AnimalRepositoryGetOutput {
    animals: Animal[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: AnimalRepositoryGetParams): Promise<AnimalRepositoryGetOutput> {
    return fetch(`/api/animals?page=${page}&limit=${limit}`).then(
        async (serverAnswer) => {
            const animalsString = await serverAnswer.text();
            const responseParsed = parseServerAnimals(
                JSON.parse(animalsString)
            );

            return {
                animals: responseParsed.animals,
                total: responseParsed.total,
                pages: responseParsed.pages,
            };
        }
    );
}

export async function createAnimal(
    name: string,
    scientificName: string,
    image: string,
    imageDescription: string,
    characteristics: string,
    eating: string,
    location: string,
    iucnState: string,
    link: string
): Promise<Animal> {
    const response = await fetch("/api/animals", {
        method: "POST",
        headers: {
            // MIME Type
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            scientificName,
            image,
            imageDescription,
            characteristics,
            eating,
            location,
            iucnState,
            link,
        }),
    });

    if (response.ok) {
        const serverResponse = await response.json();
        const ServerResponseSchema = schema.object({
            animal: AnimalSchema,
        });
        const serverResponseParsed =
            ServerResponseSchema.safeParse(serverResponse);
        if (!serverResponseParsed.success) {
            throw new Error("Failed to create an animal");
        }

        const animal = serverResponseParsed.data.animal;
        return animal;
    }
    throw new Error("Failed to create an animal");
}

export const animalRepository = {
    get,
    createAnimal,
};

function parseServerAnimals(responseBody: unknown): {
    total: number;
    pages: number;
    animals: Array<Animal>;
} {
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "animals" in responseBody &&
        "total" in responseBody &&
        "pages" in responseBody &&
        Array.isArray(responseBody.animals)
    ) {
        return {
            total: Number(responseBody.total),
            pages: Number(responseBody.pages),
            animals: responseBody.animals.map((animal: unknown) => {
                if (animal === null && typeof animal !== "object") {
                    throw new Error("Invalid animal from API");
                }

                const {
                    id,
                    date,
                    image,
                    imageDescription,
                    name,
                    scientificName,
                    characteristics,
                    eating,
                    location,
                    iucnState,
                    link,
                } = animal as {
                    id: string;
                    date: string;
                    image: string;
                    imageDescription: string;
                    name: string;
                    scientificName: string;
                    characteristics: string;
                    eating: string;
                    location: string;
                    iucnState: string;
                    link: string;
                };

                return {
                    id,
                    date: date,
                    image,
                    imageDescription,
                    name,
                    scientificName,
                    characteristics,
                    eating,
                    location,
                    iucnState,
                    link,
                };
            }),
        };
    }
    return {
        pages: 1,
        total: 0,
        animals: [],
    };
}
