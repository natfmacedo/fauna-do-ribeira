import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import {
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    TextArea,
    Button,
} from "react-aria-components";
import Link from "next/link";
import { animalController } from "@ui/controller/animal";
import axios from "axios";

interface UpdateAnimalPage {
    id: string;
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

function UpdateAnimalPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const [animal, setAnimal] = React.useState<UpdateAnimalPage[]>([]);
    const [animalName, setAnimalName] = useState("");
    const [animalScientificName, setAnimalScientificName] = useState("");
    const [animalImage, setAnimalImage] = useState("");
    const [animalImageDescription, setAnimalImageDescription] = useState("");
    const [animalCharacteristics, setAnimalCharacteristics] = useState("");
    const [animalEating, setAnimalEating] = useState("");
    const [animalLocation, setAnimalLocation] = useState("");
    const [animalIucnState, setAnimalIucnState] = useState("");
    const [animalLink, setAnimalLink] = useState("");

    // upload de imagens
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    // const [updatedAnimalImage, setUpdatedAnimalImage] = useState("");

    const handleUpload = async () => {
        setUploading(true);
        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            const { data } = await axios.post("/api/upload", formData);
        } catch (error: any) {
            console.error(error.response?.data);
        }
        setUploading(false);
    };

    useEffect(() => {
        animalController.getAnimalById({ id }).then(({ animal }) => {
            setAnimal(animal);
            animal.filter((currentAnimal) => {
                if (currentAnimal.id === id) {
                    setAnimalName(currentAnimal.name);
                    setAnimalScientificName(currentAnimal.scientificName);
                    setAnimalImage(currentAnimal.image);
                    setAnimalImageDescription(currentAnimal.imageDescription);
                    setAnimalCharacteristics(currentAnimal.characteristics);
                    setAnimalEating(currentAnimal.eating);
                    setAnimalLocation(currentAnimal.location);
                    setAnimalIucnState(currentAnimal.iucnState);
                    setAnimalLink(currentAnimal.link);
                }
            });
        });
    }, []);

    return (
        <>
            <section className="update">
                <Link className="update__buttom" href="/admin" role="button">
                    Voltar para a tabela
                </Link>
                <h2 className="update__title">Editar animal</h2>
                <div className="update__form">
                    <Form
                        onSubmit={(event) => {
                            event.preventDefault();
                            animalController.animalUpdate({
                                id: id,
                                name: animalName,
                                scientificName: animalScientificName,
                                image: animalImage,
                                imageDescription: animalImageDescription,
                                characteristics: animalCharacteristics,
                                eating: animalEating,
                                location: animalLocation,
                                iucnState: animalIucnState,
                                link: animalLink,
                                onSuccess(animal: UpdateAnimalPage) {
                                    handleUpload();
                                    alert("Animal atualizado com sucesso!");
                                    setAnimal((oldAnimals) => {
                                        return [animal, ...oldAnimals];
                                    });
                                    // redirect("/admin");
                                },
                                onError() {
                                    alert(
                                        "Erro ao atualizar, verifique se todos os campos estão preenchidos corretamente."
                                    );
                                },
                            });
                        }}
                    >
                        <TextField name="animalName" isRequired>
                            <Label>Nome:</Label>
                            <Input
                                type="text"
                                value={animalName}
                                onChange={function updatedAnimalHandler(event) {
                                    setAnimalName(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField name="animalScientificName" isRequired>
                            <Label>Nome científico:</Label>
                            <Input
                                type="text"
                                value={animalScientificName}
                                onChange={function updatedAnimalHandler(event) {
                                    setAnimalScientificName(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <div>
                            <label htmlFor="animalImage">
                                Escolher nova imagem:
                            </label>
                            <input
                                name="animalImage"
                                id="animalImage"
                                type="file"
                                onChange={({ target }) => {
                                    if (target.files) {
                                        const file = target.files[0];
                                        try {
                                            setSelectedImage(
                                                URL.createObjectURL(file)
                                            );
                                            setSelectedFile(file);
                                            setAnimalImage(file.name);
                                        } catch {
                                            alert(
                                                "Selecione uma imagem para continuar"
                                            );
                                        }
                                    }
                                }}
                            />
                            {selectedImage && (
                                <img src={selectedImage} alt="" />
                            )}
                            {/* {!selectedImage && (
                                <div>
                                    <label htmlFor="oldAnimalImage">
                                        Imagem atual:
                                    </label>
                                    <img
                                        // id="animalImage"
                                        src={`../images/fauna-do-ribeira-${animalImage}`}
                                        alt=""
                                    />
                                </div>
                            )} */}
                        </div>
                        <TextField
                            name="animalImageDescription"
                            type="text"
                            isRequired
                        >
                            <Label>Descrição da imagem:</Label>
                            <TextArea
                                value={animalImageDescription}
                                onChange={function updatedAnimalHandler(event) {
                                    setAnimalImageDescription(
                                        event.target.value
                                    );
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField
                            name="animalCharacteristics"
                            type="text"
                            isRequired
                        >
                            <Label>Características:</Label>
                            <TextArea
                                value={animalCharacteristics}
                                onChange={function updatedAnimalHandler(event) {
                                    setAnimalCharacteristics(
                                        event.target.value
                                    );
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField name="animalEating" isRequired>
                            <Label>Alimentação:</Label>
                            <Input
                                type="text"
                                value={animalEating}
                                onChange={function updatedAnimalHandler(event) {
                                    setAnimalEating(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField name="animalLocation" isRequired>
                            <Label>Locais de avistamento:</Label>
                            <Input
                                type="text"
                                value={animalLocation}
                                onChange={function updatedAnimalHandler(event) {
                                    setAnimalLocation(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <label htmlFor="animalIucnState">
                            Estado de Conservação IUCN:
                        </label>
                        <select
                            name="animalIucnState"
                            id="animalIucnState"
                            // value={newAnimalIUCNState}
                            onChange={function updatedAnimalHandler(event) {
                                setAnimalIucnState(event.target.value);
                            }}
                            value={animalIucnState}
                            required
                        >
                            <option
                                value="Selecione uma opção"
                                disabled
                                aria-disabled="true"
                            >
                                Selecione uma opção
                            </option>
                            <option value="Extinta (EX)">Extinta (EX)</option>
                            <option value="Extinta na natureza (EW)">
                                Extinta na natureza (EW)
                            </option>
                            <option value="Criticamente em perigo (CR)">
                                Criticamente em perigo (CR)
                            </option>
                            <option value="Em perigo (EN)">
                                Em perigo (EN)
                            </option>
                            <option value="Vulnerável (VU)">
                                Vulnerável (VU)
                            </option>
                            <option value="Quase ameaçada (NT)">
                                Quase ameaçada (NT)
                            </option>
                            <option value="Pouco preocupante (LC)">
                                Pouco preocupante (LC)
                            </option>
                            <option value="Deficiente de dados (DD)">
                                Deficiente de dados (DD)
                            </option>
                            <option value="Não avaliada (NE)">
                                Não avaliada (NE)
                            </option>
                        </select>
                        <TextField name="animalLink" isRequired>
                            <Label>Link para mais informações:</Label>
                            <Input
                                type="url"
                                value={animalLink}
                                onChange={function updatedAnimalHandler(event) {
                                    setAnimalLink(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <div className="update__form__buttons">
                            <Link href="/admin" role="button">
                                Cancelar
                            </Link>
                            <Button
                                name="cadastrarAnimal"
                                type="submit"
                                // onPress={handleUpload}
                            >
                                Atualizar
                            </Button>
                            {/* <button onClick={handleUpload} type="submit">
                                Upload
                            </button> */}
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}

export default UpdateAnimalPage;
