import { supabase } from "@server/infra/db/supabase";
import { HttpNotFoundError } from "@server/infra/errors";
import { Animal, AnimalSchema } from "@server/schema/animal";

interface AnimalRepositoryGetOutput {
    animals: Animal[];
}

async function get(): Promise<AnimalRepositoryGetOutput> {
    const { data, error } = await supabase
        .from("animal")
        .select("*")
        .order("date", { ascending: false });
    if (error) throw new Error("Failed to fetch data");

    const parsedData = AnimalSchema.array().safeParse(data);

    if (!parsedData.success) {
        throw new Error("Failed to parse animal from database");
    }

    const animals = parsedData.data;
    return {
        animals,
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
    const { data, error } = await supabase
        .from("animal")
        .insert([
            {
                name,
                scientificName,
                image,
                imageDescription,
                characteristics,
                eating,
                location,
                iucnState,
                link,
            },
        ])
        .select()
        .single();

    if (error) throw new Error("Failed to create animal");

    const parsedData = AnimalSchema.parse(data);

    return parsedData;
}

async function getAnimalById(id: string): Promise<Animal> {
    const { data, error } = await supabase
        .from("animal")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw new Error("Failed to get animal by id");

    const parsedData = AnimalSchema.safeParse(data);
    if (!parsedData.success) throw new Error("Failed to parse animal created");

    return parsedData.data;
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
    const { data, error } = await supabase
        .from("animal")
        .update({
            name,
            scientificName,
            image,
            imageDescription,
            characteristics,
            eating,
            location,
            iucnState,
            link,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error("Failed to get animal by id");

    const parsedData = AnimalSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error("Failed to return updated animal");
    }

    return parsedData.data;
}

async function deleteById(id: string) {
    const { error } = await supabase.from("animal").delete().match({
        id,
    });

    if (error) throw new HttpNotFoundError(`Animal with id "${id}" not found`);
}

export const animalRepository = {
    get,
    getAnimalById,
    createAnimal,
    animalUpdate,
    deleteById,
};
