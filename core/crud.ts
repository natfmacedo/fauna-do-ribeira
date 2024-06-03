import fs from "fs"; //ES6
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

// tipagem do animal
interface Animal {
    id: string;
    date: string;
    name: string;
    image: string;
    imageDescription: string;
    scientificName: string;
    characteristics: string;
    eating: string;
    location: string;
    iucnState: string;
    link: string;
}

function create(
    name: string,
    image: string,
    imageDescription: string,
    scientificName: string,
    characteristics: string,
    eating: string,
    location: string,
    iucnState: string,
    link: string
) {
    const animal: Animal = {
        id: uuid(),
        date: new Date().toISOString(),
        name: name,
        image: image,
        imageDescription: imageDescription,
        scientificName: scientificName,
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
    return name;
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

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULAÇÃO]
CLEAR_DB();
create(
    "Maria-leque-do-sudeste",
    "",
    "",
    "Onychorhynchus swainsoni",
    "Pertencente ao Reino Animalia e à Ordem dos Passeiformes, a Maria-leque-do-sudeste tem entre 16 e 17,5 centímetros de comprimento e pesa entre 13 e 21 gramas. O nome vem da presença de uma plumagem na cabeça em formato de leque nas cores escarlate, preto e azul no macho e laranja, preto e azul na fêmea.",
    "Borboletas, libélulas, vespas e mamangavas.",
    "Apiaí, Barra do Turvo e Eldorado.",
    "Vulnerável (VU)",
    ""
);
create(
    "Tucano-de-bico-preto",
    "",
    "",
    "Ramphastos vitellinus",
    "Pertencente ao Reino Animalia e à Ordem dos Paciformes, possui aproximadamente 46 centímetros de comprimento.",
    "Frutos, artrópodes em geral, aranhas, ovos, filhotes de outras aves, anfíbios, morcegos e gambás.",
    "Apiaí, Cananéia e Eldorado.",
    "Pouco preocupante (LC)",
    ""
);
create(
    "Papagaio-de-cara-roxa",
    "",
    "",
    "Amazona brasiliensis",
    "Pertencente ao Reino Animalia e à Ordem dos Psittaciformes, trata-se de uma espécie caiçara na cor verde com vértice e garganta arroxeados.",
    "Frutos, insetos e larvas.",
    "Cananéia, Iguape, Ilha Comprida, Itariri, Jacupiranga e Pariquera-Açu.",
    "Quase ameaçada (NT)",
    ""
);
create(
    "Jacutinga",
    "",
    "",
    "Aburria jacutinga",
    "Pertencente ao Reino Animalia e à Ordem dos Galliformes, possui entre 64 e 74 centímetros de comprimento e pesa cerca de 1,1 a 1,4 quilogramas.",
    "Polpa de frutos carnosos e palmito-juçara.",
    "Apiaí, Cananéia, Iporanga e Pedro de Toledo.",
    "Em perigo (EN)",
    ""
);
create(
    "Queixada",
    "",
    "",
    "Tayassu pecari",
    "Pertencente ao Reino Animalia e à Ordem Artiodactyla, o Queixada é o maior animal da família de porcos selvagens da América do Sul. Possui cerca de 1,1 metro de comprimento e pesa entre 20 e 40 quilos.",
    "Frutos, raízes, sementes, larvas de insetos e minhocas.",
    "Cananéia, Juquiá, Miracatu e Tapiraí.",
    "Vulnerável (VU)",
    ""
);
create(
    "Anta",
    "",
    "",
    "Tapirus terrestris",
    "Pertencente ao Reino Animalia e à Ordem Perissodactyla, trata-se do mamífero terrestre mais pesado da América do Sul com 180 a 300 quilogramas e 1 a 2 metros de comprimento.",
    "Frutas, plantas, flores, folhas e cascas.",
    "Juquiá, Miracatu e Tapiraí.",
    "Vulnerável (VU)",
    ""
);
//eslint-disable-next-line no-console
console.log(read());
