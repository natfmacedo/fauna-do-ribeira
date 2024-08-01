import fs from "fs"; //ES6
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

// especificação do tipo do ID
type UUID = string;

// tipagem do animal
interface Animal {
    id: UUID;
    date: string;
    name: string;
    scientificName: string;
    image: string;
    imageDescription: string;
    characteristics: string;
    eating: string;
    location: string;
    iucnState: string;
    link: string;
}

export function create(
    name: string,
    scientificName: string,
    image: string,
    imageDescription: string,
    characteristics: string,
    eating: string,
    location: string,
    iucnState: string,
    link: string
): Animal {
    const animal: Animal = {
        id: uuid(),
        date: new Date().toISOString(),
        name: name,
        scientificName: scientificName,
        image: image,
        imageDescription: imageDescription,
        characteristics: characteristics,
        eating: eating,
        location: location,
        iucnState: iucnState,
        link: link,
    };

    // Array da lista de animais
    const animals: Array<Animal> = [
        ...read(), // lista os animais já cadastrados
        animal,
    ];

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                animals,
            },
            null,
            2
        )
    );
    return animal;
}

export function read(): Array<Animal> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    // Fail Fast Validations
    if (!db.animals) {
        return [];
    }
    return db.animals;
}

export function getAnimalById(id: UUID) {
    const animals = read();

    animals.filter((animal) => {
        if (id === animal.id) {
            return true;
        }
        return false;
    });
    fs.readFileSync(DB_FILE_PATH, "utf-8");
}

export function update(id: UUID, partialAnimal: Partial<Animal>): Animal {
    let updatedAnimal;
    const animals = read();
    animals.forEach((currentAnimal) => {
        const isToUpdate = currentAnimal.id === id;
        if (isToUpdate) {
            updatedAnimal = Object.assign(currentAnimal, partialAnimal);
        }
    });
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                animals,
            },
            null,
            2
        )
    );
    if (!updatedAnimal) {
        throw new Error("Please, provide another ID!");
    }
    return updatedAnimal;
}

export function deleteById(id: UUID) {
    const animals = read();

    const animalsWithoutOne = animals.filter((animal) => {
        if (id === animal.id) {
            return false;
        }
        return true;
    });
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                animals: animalsWithoutOne,
            },
            null,
            2
        )
    );
}
