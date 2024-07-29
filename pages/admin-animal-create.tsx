import React, { useState } from "react";
import { animalController } from "@ui/controller/animal";
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Button,
    TextArea,
    SearchField,
    Text,
} from "react-aria-components";
import axios from "axios";
import Link from "next/link";
import { NextSeo } from "next-seo";

interface CreateAnimal {
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

function CreateAnimalPage() {
    // animal infos
    const [newAnimalName, setNewAnimalName] = useState("");
    const [newAnimalScientificName, setNewAnimalScientificName] = useState("");
    const [newAnimalImage, setNewAnimalImage] = useState("");
    const [newAnimalImageDescription, setNewAnimalImageDescription] =
        useState("");
    const [newAnimalCharacteristics, setNewAnimalCharacteristics] =
        useState("");
    const [newAnimalEating, setNewAnimalEating] = useState("");
    const [newAnimalLocation, setNewAnimalLocation] = useState("");
    const [newAnimalIUCNState, setNewAnimalIUCNState] = useState("");
    const [newAnimalLink, setNewAnimalLink] = useState("");

    // CreatePage infos
    const [animals, setAnimals] = useState<CreateAnimal[]>([]);

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
            const { data } = await axios.post("/api/upload", formData);
        } catch (error: any) {
            console.error(error.response?.data);
        }
        setUploading(false);
    };

    return (
        <>
            <NextSeo
                title="Cadastro | Fauna do Ribeira"
                description="Página de cadastro de novos animais no site Fauna do Ribeira"
            />
            <section className="create">
                <div className="create__menu">
                    <Link
                        className="create__menu__linkToPreviousPage"
                        href="/admin"
                    >
                        Voltar para a tabela
                    </Link>
                </div>
                <h2 className="create__title">Cadastrar animal</h2>
                <div className="create__form">
                    <Form
                        onSubmit={(event) => {
                            event.preventDefault();
                            animalController.create({
                                name: newAnimalName,
                                scientificName: newAnimalScientificName,
                                image: newAnimalImage,
                                imageDescription: newAnimalImageDescription,
                                characteristics: newAnimalCharacteristics,
                                eating: newAnimalEating,
                                location: newAnimalLocation,
                                iucnState: newAnimalIUCNState,
                                link: newAnimalLink,
                                onSuccess(animal: CreateAnimal) {
                                    handleUpload();
                                    alert("Animal cadastrado com sucesso!");
                                    setAnimals((oldAnimals) => {
                                        return [animal, ...oldAnimals];
                                    });
                                    setNewAnimalName("");
                                    setNewAnimalScientificName("");
                                    setNewAnimalImage("");
                                    setSelectedImage("");
                                    setNewAnimalImageDescription("");
                                    setNewAnimalCharacteristics("");
                                    setNewAnimalEating("");
                                    setNewAnimalLocation("");
                                    setNewAnimalIUCNState("");
                                    setNewAnimalLink("");
                                },
                                onError() {
                                    alert(
                                        "Você precisa preencher todos os campos para cadastrar um novo animal."
                                    );
                                },
                            });
                        }}
                    >
                        <TextField name="nome" type="text" isRequired>
                            <Label>Nome:</Label>
                            <Input
                                value={newAnimalName}
                                onChange={function newAnimalHandler(event) {
                                    setNewAnimalName(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField name="nomeCientifico" type="text" isRequired>
                            <Label>Nome científico:</Label>
                            <Input
                                value={newAnimalScientificName}
                                onChange={function newAnimalHandler(event) {
                                    setNewAnimalScientificName(
                                        event.target.value
                                    );
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <label htmlFor="imagem">Imagem:</label>
                        <input
                            id="imagem"
                            type="file"
                            name="image"
                            accept="image/png, image/jpeg"
                            onChange={({ target }) => {
                                if (target.files) {
                                    const file = target.files[0];
                                    try {
                                        setSelectedImage(
                                            URL.createObjectURL(file)
                                        );
                                        setSelectedFile(file);
                                        setNewAnimalImage(file.name);
                                    } catch {
                                        alert(
                                            "Selecione uma imagem para continuar"
                                        );
                                    }
                                }
                            }}
                        />
                        {selectedImage && <img src={selectedImage} alt="" />}
                        <TextField
                            name="descricaoImagem"
                            type="text"
                            isRequired
                        >
                            <Label>Descrição da imagem:</Label>
                            <TextArea
                                value={newAnimalImageDescription}
                                onChange={function newAnimalHandler(event) {
                                    setNewAnimalImageDescription(
                                        event.target.value
                                    );
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField
                            name="caracteristicas"
                            type="text"
                            isRequired
                        >
                            <Label>Características:</Label>
                            <TextArea
                                value={newAnimalCharacteristics}
                                onChange={function newAnimalHandler(event) {
                                    setNewAnimalCharacteristics(
                                        event.target.value
                                    );
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField name="alimentacao" type="text" isRequired>
                            <Label>Alimentação:</Label>
                            <Input
                                value={newAnimalEating}
                                onChange={function newAnimalHandler(event) {
                                    setNewAnimalEating(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <TextField
                            name="locaisAvistamento"
                            type="text"
                            isRequired
                        >
                            <Label>Locais de avistamento:</Label>
                            <Input
                                value={newAnimalLocation}
                                onChange={function newAnimalHandler(event) {
                                    setNewAnimalLocation(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <label htmlFor="estadoIUCN">
                            Estado de Conservação IUCN:
                        </label>
                        <select
                            name="estadoIUCN"
                            id="estadoIUCN"
                            // value={newAnimalIUCNState}
                            onChange={function newAnimalHandler(event) {
                                setNewAnimalIUCNState(event.target.value);
                            }}
                            defaultValue="defaultOption"
                            required
                        >
                            <option
                                value="defaultOption"
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
                        {/* <Select name="estadoIUCN" isRequired>
                            <Label>Estado de Conservação IUCN</Label>
                            <Button>
                                <SelectValue
                                    onChange={function newAnimalHandler(
                                        event: HTMLSelectElement
                                    ) {
                                        setNewAnimalIUCNState(
                                            event.target.value
                                        );
                                    }}
                                />
                                <span aria-hidden="true">▼</span>
                            </Button>
                            <FieldError />
                            <Popover>
                                <ListBox>
                                    <ListBoxItem>Extinta (EX)</ListBoxItem>
                                    <ListBoxItem>
                                        Extinta na natureza (EW)
                                    </ListBoxItem>
                                    <ListBoxItem>
                                        Criticamente em perigo (CR)
                                    </ListBoxItem>
                                    <ListBoxItem>Em perigo (EN)</ListBoxItem>
                                    <ListBoxItem>Vulnerável (VU)</ListBoxItem>
                                    <ListBoxItem>
                                        Quase ameaçada (NT)
                                    </ListBoxItem>
                                    <ListBoxItem>
                                        Pouco preocupante (LC)
                                    </ListBoxItem>
                                    <ListBoxItem>
                                        Deficiente de dados (DD)
                                    </ListBoxItem>
                                    <ListBoxItem>Não avaliada (NE)</ListBoxItem>
                                </ListBox>
                            </Popover>
                        </Select> */}
                        <TextField name="link" type="url" isRequired>
                            <Label>Link para mais informações:</Label>
                            <Input
                                value={newAnimalLink}
                                onChange={function newAnimalHandler(event) {
                                    setNewAnimalLink(event.target.value);
                                }}
                            />
                            <FieldError />
                        </TextField>
                        <div className="cadastro__formulario__botoes">
                            <Button
                                name="cancelarCadastro"
                                type="reset"
                                onPress={function resetAnimalImage() {
                                    setSelectedImage("");
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                name="cadastrarAnimal"
                                type="submit"
                                // onPress={handleUpload}
                            >
                                Cadastrar
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

export default CreateAnimalPage;
