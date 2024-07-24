import { animalRepository } from "@ui/repository/animal";
import { Animal } from "@ui/schema/animal";

interface AnimalControllerGetParams {
    page: number;
    limit?: number;
}

interface AnimalControllerGetByIdParams {
    id: string;
}
// async function get() {
//     return animalRepository.get({ animals });
// }

async function get() {
    return animalRepository.get();
}

async function getAnimalById(params: AnimalControllerGetByIdParams) {
    return animalRepository.getAnimalById({
        id: params.id,
    });
}
interface AnimalControllerCreateParams {
    id?: string;
    name?: string;
    scientificName?: string;
    image?: string;
    imageDescription?: string;
    characteristics?: string;
    eating?: string;
    location?: string;
    iucnState?: string;
    link?: string;
    onError: () => void;
    onSuccess: (animal: Animal) => void;
}
interface AnimalControllerUpdateParams {
    id: string;
    name: string;
    scientificName: string;
    image: string;
    imageDescription: string;
    characteristics: string;
    eating: string;
    location: string;
    iucnState: string;
    link: string;
    onError: () => void;
    onSuccess: (animal: Animal) => void;
}

function create({
    name,
    scientificName,
    image,
    imageDescription,
    characteristics,
    eating,
    location,
    iucnState,
    link,
    onError,
    onSuccess,
}: AnimalControllerCreateParams) {
    // Fail Fast Validation
    if (
        !name ||
        !scientificName ||
        !image ||
        !imageDescription ||
        !characteristics ||
        !eating ||
        !location ||
        !iucnState ||
        !link
    ) {
        onError();
        return;
    }

    animalRepository
        .createAnimal(
            name,
            scientificName,
            image,
            imageDescription,
            characteristics,
            eating,
            location,
            iucnState,
            link
        )
        .then((newAnimal) => {
            onSuccess(newAnimal);
        })
        .catch(() => {
            onError();
        });
}

function animalUpdate({
    id,
    name,
    scientificName,
    image,
    imageDescription,
    characteristics,
    eating,
    location,
    iucnState,
    link,
    onSuccess,
    onError,
}: AnimalControllerUpdateParams) {
    // Fail Fast Validations
    if (
        !id ||
        !name ||
        !scientificName ||
        !image ||
        !imageDescription ||
        !characteristics ||
        !eating ||
        !location ||
        !iucnState ||
        !link
    ) {
        onError();
        return;
    }
    animalRepository
        .animalUpdate(
            id,
            name,
            scientificName,
            image,
            imageDescription,
            characteristics,
            eating,
            location,
            iucnState,
            link
        )
        .then((updatedAnimal) => {
            onSuccess(updatedAnimal);
        })
        .catch(() => {
            onError();
        });
}

export const animalController = {
    get,
    getAnimalById,
    create,
    animalUpdate,
};
