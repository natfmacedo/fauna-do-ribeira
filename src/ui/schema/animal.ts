import { z as schema } from "zod";

export const AnimalSchema = schema.object({
    id: schema.string().uuid(),
    date: schema.string().datetime(),
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

export type Animal = schema.infer<typeof AnimalSchema>;
