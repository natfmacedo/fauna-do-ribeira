import {
    read,
    create,
    update,
    getAnimalById as dbGetAnimalById,
    deleteById as dbDeleteById,
} from "@db-crud-animals";
import { HttpNotFoundError } from "@server/infra/errors";

interface AnimalRepositoryGetOutput {
    animals: Animal[];
}

function get(): AnimalRepositoryGetOutput {
    const ALL_ANIMALS = read().reverse();
    return {
        animals: ALL_ANIMALS,
    };
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

async function getAnimalById(id: string): Promise<Animal> {
    const ALL_ANIMALS = read();
    const animalId = ALL_ANIMALS.find((animal) => animal.id === id);
    if (!animalId)
        throw new HttpNotFoundError(`Animal with id "${id}" not found`);
    dbGetAnimalById(JSON.stringify(animalId));
    return animalId;
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

    if (!animal)
        throw new HttpNotFoundError(`Animal with id "${id}" not found`);

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

async function deleteById(id: string) {
    const ALL_ANIMALS = read();
    const animal = ALL_ANIMALS.find((animal) => animal.id === id);

    if (!animal)
        throw new HttpNotFoundError(`Animal with id "${id}" not found`);
    dbDeleteById(id);
}

export const animalRepository = {
    get,
    getAnimalById,
    createAnimal,
    animalUpdate,
    deleteById,
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
