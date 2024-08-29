import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { useSearchParams } from "next/navigation";
import { animalController } from "@ui/controller/animal";
import axios from "axios";
import {
    Breadcrumbs,
    Breadcrumb,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    TextArea,
    Button,
    DialogTrigger,
    Modal,
    Dialog,
} from "react-aria-components";
import Link from "next/link";

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
    // parâmetros vindos de admin.tsx
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";

    // animal infos
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

    const handleUpload = async () => {
        setUploading(true);
        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            await axios.post("/api/upload", formData);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
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
            <NextSeo
                title="Edição | Fauna do Ribeira"
                description="Página de edição dos dados dos animais cadastrados no site Fauna do Ribeira"
            />
            <section className="menu">
                <div className="menu__options" role="menu">
                    <Breadcrumbs>
                        <Breadcrumb>
                            <Link
                                id="backToTable"
                                className="menu__options__linkToPreviousPage"
                                href="/admin"
                            >
                                Tabela
                            </Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <Link
                                className="menu__options__currentPage"
                                href=""
                            >
                                Edição
                            </Link>
                        </Breadcrumb>
                    </Breadcrumbs>
                </div>
            </section>
            <section className="update">
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
                                },
                                onError() {
                                    alert(
                                        "Erro ao atualizar, verifique se todos os campos estão preenchidos corretamente."
                                    );
                                },
                            });
                        }}
                    >
                        <fieldset>
                            <legend>Dados da espécie</legend>
                            <TextField
                                name="animalName"
                                className="update__form__field"
                                isRequired
                            >
                                <Label>Nome:</Label>
                                <Input
                                    type="text"
                                    value={animalName}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
                                        setAnimalName(event.target.value);
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalScientificName"
                                className="update__form__field"
                                isRequired
                            >
                                <Label>Nome científico:</Label>
                                <Input
                                    type="text"
                                    value={animalScientificName}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
                                        setAnimalScientificName(
                                            event.target.value
                                        );
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalCharacteristics"
                                type="text"
                                className="update__form__field"
                                isRequired
                            >
                                <Label>Características:</Label>
                                <TextArea
                                    value={animalCharacteristics}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
                                        setAnimalCharacteristics(
                                            event.target.value
                                        );
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalEating"
                                className="update__form__field"
                                isRequired
                            >
                                <Label>Alimentação:</Label>
                                <Input
                                    type="text"
                                    value={animalEating}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
                                        setAnimalEating(event.target.value);
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalLocation"
                                className="update__form__field"
                                isRequired
                            >
                                <Label>Locais de avistamento:</Label>
                                <Input
                                    type="text"
                                    value={animalLocation}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
                                        setAnimalLocation(event.target.value);
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <div className="update__form__field">
                                <label htmlFor="animalIucnState">
                                    Estado de Conservação IUCN:
                                </label>
                                <select
                                    name="animalIucnState"
                                    id="animalIucnState"
                                    // value={newAnimalIUCNState}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
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
                                    <option value="Extinta (EX)">
                                        Extinta (EX)
                                    </option>
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
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Dados da imagem da espécie</legend>
                            <div className="update__form__field">
                                <label htmlFor="animalImage">
                                    Escolher nova imagem:
                                </label>
                                <input
                                    name="animalImage"
                                    id="animalImage"
                                    type="file"
                                    accept="image/png, image/jpeg"
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
                                <div className="animalImage">
                                    {selectedImage && (
                                        <img src={selectedImage} alt="" />
                                    )}
                                </div>
                            </div>
                            <TextField
                                name="animalImageDescription"
                                type="text"
                                className="update__form__field"
                                isRequired
                            >
                                <Label>Descrição da imagem:</Label>
                                <TextArea
                                    value={animalImageDescription}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
                                        setAnimalImageDescription(
                                            event.target.value
                                        );
                                    }}
                                />
                                <FieldError />
                            </TextField>
                        </fieldset>
                        <fieldset>
                            <legend>Dados adicionais</legend>
                            <TextField
                                name="animalLink"
                                className="update__form__field"
                                isRequired
                            >
                                <Label>Link para mais informações:</Label>
                                <Input
                                    type="url"
                                    value={animalLink}
                                    onChange={function updatedAnimalHandler(
                                        event
                                    ) {
                                        setAnimalLink(event.target.value);
                                    }}
                                />
                                <FieldError />
                            </TextField>
                        </fieldset>
                        <div className="update__form__buttons">
                            <DialogTrigger>
                                <Button
                                    className="update__form__buttons--cancel"
                                    name="cancelCreateAnimal"
                                >
                                    Cancelar
                                </Button>
                                <Modal>
                                    <Dialog>
                                        {({ close }) => (
                                            <Form>
                                                <h4 slot="title">
                                                    Descartar informações
                                                </h4>
                                                <p>
                                                    Deseja descartar as novas
                                                    informações inseridas em{" "}
                                                    {`"${animalName}"`}?
                                                </p>
                                                <div className="react-aria-Buttons">
                                                    <Button
                                                        className="noButton"
                                                        onPress={close}
                                                    >
                                                        Não
                                                    </Button>
                                                    <Link
                                                        className="yesButton"
                                                        href="/admin"
                                                        role="button"
                                                    >
                                                        Sim
                                                    </Link>
                                                </div>
                                            </Form>
                                        )}
                                    </Dialog>
                                </Modal>
                            </DialogTrigger>
                            <Button
                                className="update__form__buttons--update"
                                name="updateAnimal"
                                type="submit"
                            >
                                Atualizar
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}

export default UpdateAnimalPage;
