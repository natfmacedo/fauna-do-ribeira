import {
    read,
    create,
    update,
    getAnimalById as dbGetAnimalById,
} from "@db-crud-animals";

interface AnimalRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface AnimalRepositoryGetOutput {
    animals: Animal[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: AnimalRepositoryGetParams = {}): AnimalRepositoryGetOutput {
    const currentPage = page || 1;
    const currentLimit = limit || 4;

    const ALL_ANIMALS = read().reverse();

    // Paginação
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = currentPage * currentLimit;
    const paginatedAnimals = ALL_ANIMALS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_ANIMALS.length / currentLimit);

    return {
        animals: paginatedAnimals,
        total: ALL_ANIMALS.length,
        pages: totalPages,
    };
}

async function getAnimalById(id: string): Promise<Animal> {
    const ALL_ANIMALS = read();
    const animalId = ALL_ANIMALS.find((animal) => animal.id === id);
    if (!animalId) throw new Error(`Animal with id "${id}" not found`);
    dbGetAnimalById(JSON.stringify(animalId));
    return animalId;
}

async function createAnimal(
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
    const newAnimal = create(
        name,
        scientificName,
        image,
        imageDescription,
        characteristics,
        eating,
        location,
        iucnState,
        link
    );
    return newAnimal;
}

async function animalUpdate(
    id: string,
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
    const ALL_ANIMALS = read();

    const animal = ALL_ANIMALS.find((currentAnimal) => currentAnimal.id === id);

    if (!animal) throw new Error(`Animal with id "${id}" not found`);

    const updatedAnimal = update(animal.id, {
        name,
        scientificName,
        image,
        imageDescription,
        characteristics,
        eating,
        location,
        iucnState,
        link,
    });

    return updatedAnimal;
}

export const animalRepository = {
    get,
    getAnimalById,
    createAnimal,
    animalUpdate,
};

// Model/Schema
interface Animal {
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
}
