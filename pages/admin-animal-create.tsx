import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { animalController } from "@ui/controller/animal";
import {
    Breadcrumbs,
    Breadcrumb,
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Button,
    TextArea,
    DialogTrigger,
    Dialog,
    Modal,
} from "react-aria-components";
import axios from "axios";
import Link from "next/link";

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
            await axios.post("/api/upload", formData);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
        }
        setUploading(false);
    };

    return (
        <>
            <NextSeo
                title="Cadastro | Fauna do Ribeira"
                description="Página de cadastro de novos animais no site Fauna do Ribeira"
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
                                Cadastro
                            </Link>
                        </Breadcrumb>
                    </Breadcrumbs>
                </div>
            </section>
            <section className="create">
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
                                    setNewAnimalImage("");
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
                        <fieldset>
                            <legend>Dados da espécie</legend>
                            <TextField
                                name="animalName"
                                type="text"
                                className="create__form__field"
                                isRequired
                            >
                                <Label>Nome:</Label>
                                <Input
                                    value={newAnimalName}
                                    placeholder="Ex.: Onça-parda"
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalName(event.target.value);
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalScientificName"
                                type="text"
                                className="create__form__field"
                                isRequired
                            >
                                <Label>Nome científico:</Label>
                                <Input
                                    value={newAnimalScientificName}
                                    placeholder="Ex.: Puma concolor"
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalScientificName(
                                            event.target.value
                                        );
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalCharacteristics"
                                type="text"
                                className="create__form__field"
                                isRequired
                            >
                                <Label>Características:</Label>
                                <TextArea
                                    value={newAnimalCharacteristics}
                                    placeholder="Ex.: Pertencente ao Reino Animalia e à Ordem Carnivora, trata-se do segundo maior felino das Américas, perdendo apenas para a onça-pintada. Possui de 53 a 72 centímetros de comprimento (sem a cauda) e pesa cerca de 50 quilogramas."
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalCharacteristics(
                                            event.target.value
                                        );
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalEating"
                                type="text"
                                className="create__form__field"
                                isRequired
                            >
                                <Label>Alimentação:</Label>
                                <Input
                                    value={newAnimalEating}
                                    placeholder="Ex.: Capivaras, catetos, queixadas, veados, tatus, lagartos, aves e insetos."
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalEating(event.target.value);
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <TextField
                                name="animalLocation"
                                type="text"
                                className="create__form__field"
                                isRequired
                            >
                                <Label>Locais de avistamento:</Label>
                                <Input
                                    value={newAnimalLocation}
                                    placeholder="Ex.: Apiaí, Iporanga, Juquiá, Miracatu e Tapiraí."
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalLocation(
                                            event.target.value
                                        );
                                    }}
                                />
                                <FieldError />
                            </TextField>
                            <div className="create__form__field">
                                <label htmlFor="animalIucnState">
                                    Estado de Conservação IUCN:
                                </label>
                                <select
                                    name="animalIucnState"
                                    id="animalIucnState"
                                    // value={newAnimalIUCNState}
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalIUCNState(
                                            event.target.value
                                        );
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
                            <div className="create__form__field">
                                <label htmlFor="animalImage">Imagem:</label>
                                <input
                                    id="animalImage"
                                    type="file"
                                    name="animalImage"
                                    accept="image/png, image/jpeg"
                                    required
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
                                <div className="create__form__field__animalImage">
                                    {selectedImage && (
                                        <img src={selectedImage} alt="" />
                                    )}
                                </div>
                            </div>
                            <TextField
                                name="animalImageDescription"
                                type="text"
                                className="create__form__field"
                                isRequired
                            >
                                <Label>Descrição da imagem:</Label>
                                <TextArea
                                    value={newAnimalImageDescription}
                                    placeholder="Ex.: Mamífero semelhante a uma onça-pintada (mas sem as manchas), pesa cerca de 53 a 72 quilos, mede até 150 centímetros e possui entre 60 e 97 centímetros de cauda (que é cilíndrica e no formato da letra 'j'). Apresenta pelagem curta, olhos arredondados e coloração que varia entre cinza e marrom-avermelhado (com exceção do rosto que costuma ser mais claro em tons de bege). Foto via Pixabay."
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalImageDescription(
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
                                type="url"
                                className="create__form__field"
                                isRequired
                            >
                                <Label>Link para mais informações:</Label>
                                <Input
                                    value={newAnimalLink}
                                    placeholder="Ex.: https://oncafari.org/especie_fauna/onca-parda/"
                                    onChange={function newAnimalHandler(event) {
                                        setNewAnimalLink(event.target.value);
                                    }}
                                />
                                <FieldError />
                            </TextField>
                        </fieldset>
                        <div className="create__form__buttons">
                            <DialogTrigger>
                                <Button
                                    name="cancelCreateAnimal"
                                    className="create__form__buttons--cancel"
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
                                                    Deseja descartar as
                                                    informações preenchidas
                                                    nesse cadastro?
                                                </p>
                                                <div className="react-aria-Buttons">
                                                    <Button
                                                        className="noButton"
                                                        onPress={close}
                                                    >
                                                        Não
                                                    </Button>
                                                    <Button
                                                        className="yesButton"
                                                        type="reset"
                                                        onPress={function resetAnimalImage() {
                                                            setNewAnimalName(
                                                                ""
                                                            );
                                                            setNewAnimalScientificName(
                                                                ""
                                                            );
                                                            setNewAnimalImage(
                                                                ""
                                                            );
                                                            setSelectedImage(
                                                                ""
                                                            );
                                                            setNewAnimalImageDescription(
                                                                ""
                                                            );
                                                            setNewAnimalCharacteristics(
                                                                ""
                                                            );
                                                            setNewAnimalEating(
                                                                ""
                                                            );
                                                            setNewAnimalLocation(
                                                                ""
                                                            );
                                                            setNewAnimalIUCNState(
                                                                ""
                                                            );
                                                            setNewAnimalLink(
                                                                ""
                                                            );
                                                            close();
                                                        }}
                                                    >
                                                        Sim
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Dialog>
                                </Modal>
                            </DialogTrigger>
                            <Button
                                name="createAnimal"
                                type="submit"
                                className="create__form__buttons--create"
                            >
                                Cadastrar
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}

export default CreateAnimalPage;
