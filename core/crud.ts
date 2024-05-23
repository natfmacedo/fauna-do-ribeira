import fs from "fs"; //ES6
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

// tipagem do animal
interface Animal {
    id: string;
    date: string;
    name: string;
    image: string;
    scientificName: string;
    characteristics: string;
    eating: string;
    location: string;
    iucnState: string;
}

function create(
    name: string,
    image: string,
    scientificName: string,
    characteristics: string,
    eating: string,
    location: string,
    iucnState: string
) {
    const animal: Animal = {
        id: uuid(),
        date: new Date().toISOString(),
        name: name,
        image: image,
        scientificName: scientificName,
        characteristics: characteristics,
        eating: eating,
        location: location,
        iucnState: iucnState,
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
    return name;
}

function read(): Array<Animal> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    // Fail Fast Validations
    if (!db.animals) {
        return [];
    }
    return db.animals;
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULAÇÃO]
CLEAR_DB();
create("Maria-leque-do-sudeste", "", "", "", "", "", "");
create("Tucano-de-bico-preto", "", "", "", "", "", "");
// eslint-disable-next-line no-console
console.log(read());
