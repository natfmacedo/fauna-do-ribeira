import { animalRepository } from "@ui/repository/animal";
import { Animal } from "@ui/schema/animal";

interface AnimalControllerGetByIdParams {
    id: string;
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

async function get() {
    return animalRepository.get();
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

async function getAnimalById(params: AnimalControllerGetByIdParams) {
    return animalRepository.getAnimalById({
        id: params.id,
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

async function deleteById(id: string): Promise<void> {
    const animalId = id;
    await animalRepository.deleteById(animalId);
}

export const animalController = {
    get,
    getAnimalById,
    create,
    animalUpdate,
    deleteById,
};
