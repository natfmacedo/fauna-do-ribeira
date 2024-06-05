import React from "react";
import { animalController } from "@ui/controller/animal";
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Button,
    TextArea,
    FileTrigger,
    Select,
    SelectValue,
    Popover,
    ListBox,
    ListBoxItem,
    DialogTrigger,
    Modal,
    Dialog,
    Heading,
} from "react-aria-components";
import axios from "axios";

interface AdminAnimal {
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

function AdminPage() {
    const initialLoadComplete = React.useRef(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);
    const [animals, setAnimals] = React.useState<AdminAnimal[]>([]);
    const hasNoAnimals = animals.length === 0 && !isLoading;
    const hasMorePages = totalPages > page;

    // upload de imagens
    const [uploading, setUploading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState<File>();

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

    // const [selectedFile, setSelectedFile] = React.useState("");
    // const [imageUrl, setImageUrl] = React.useState("");
    // const [errorMessage, setErrorMessage] = React.useState("");

    // const handleFileChange = (event: any) => {
    //     const file = event.currentTarget.files[0];
    //     setSelectedFile(file);
    //     if (file) {
    //         const url = URL.createObjectURL(file);
    //         setImageUrl(url);
    //     }
    // };

    // const handleSubmit = async (event: { preventDefault: () => void }) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append("file", selectedFile);

    //     const response = await fetch("/api/upload", {
    //         method: "POST",
    //         body: formData,
    //     });
    //     try {
    //         const result = await response.json();
    //         if (result) {
    //             setImageUrl(result.imageUrl);
    //         } else {
    //             setErrorMessage(result.message);
    //             console.error("Failed to upload file");
    //         }
    //     } catch (error) {
    //         setErrorMessage("Error to uploading file");
    //         console.error("Error to uploading file:", error);
    //     }
    // };

    React.useEffect(() => {
        if (!initialLoadComplete.current) {
            animalController
                .get({ page })
                .then(({ animals, pages }) => {
                    setAnimals(animals);
                    setTotalPages(pages);
                })
                .finally(() => {
                    setIsLoading(false);
                    initialLoadComplete.current = true;
                });
        }
    }, []);

    return (
        <>
            <section className="apresentacao">
                <h2>Olá, administrador(a)!</h2>
                <div className="tabela__botaoCadastrar">
                    <Button>Cadastrar</Button>
                </div>
            </section>
            <section className="tabela">
                <table>
                    <caption className="tabela__legenda">
                        Animais cadastrados no site Fauna do Ribeira
                    </caption>
                    <thead className="tabela__cabecalho">
                        <tr>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Imagem
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Descrição da imagem
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Nome
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Nome científico
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Características
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Alimentação
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Localização
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Estado IUCN
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Link
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Editar
                            </th>
                            <th
                                scope="col"
                                className="tabela__cabecalho__titulo"
                            >
                                Excluir
                            </th>
                        </tr>
                    </thead>
                    <tbody className="tabela__corpo">
                        {animals.map((animal) => {
                            return (
                                <tr key={animal.id}>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.id.substring(0, 4)}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.image}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.imageDescription}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.name}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.scientificName}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.characteristics.substring(
                                            0,
                                            48
                                        )}
                                        ...
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.eating}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.location}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.iucnState}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        {animal.link}
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        <Button>Editar</Button>
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        <DialogTrigger>
                                            <Button>Excluir</Button>
                                            <Modal>
                                                <Dialog>
                                                    <Dialog>
                                                        {({ close }) => (
                                                            <form>
                                                                <Heading slot="title">
                                                                    Excluir
                                                                    animal
                                                                </Heading>
                                                                <p>
                                                                    Tem certeza
                                                                    que deseja
                                                                    excluir “
                                                                    {
                                                                        animal.name
                                                                    }
                                                                    ”? As
                                                                    informações
                                                                    a respeito
                                                                    dessa
                                                                    espécie
                                                                    serão
                                                                    permanentemente
                                                                    excluídas.
                                                                </p>
                                                                <Button
                                                                    onPress={
                                                                        close
                                                                    }
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                                <Button
                                                                    onPress={
                                                                        close
                                                                    }
                                                                >
                                                                    Excluir
                                                                </Button>
                                                            </form>
                                                        )}
                                                    </Dialog>
                                                </Dialog>
                                            </Modal>
                                        </DialogTrigger>
                                    </td>
                                </tr>
                            );
                        })}
                        {isLoading && (
                            <tr>
                                <td>Carregando...</td>
                            </tr>
                        )}
                        {hasNoAnimals && (
                            <tr>
                                <td>Nenhum animal encontrado.</td>
                            </tr>
                        )}
                        {hasMorePages && (
                            <tr>
                                <td>
                                    <Button
                                        onPress={() => {
                                            setIsLoading(true);
                                            const nextPage = page + 1;
                                            setPage(nextPage);

                                            animalController
                                                .get({ page: nextPage })
                                                .then(({ animals, pages }) => {
                                                    setAnimals((oldAnimals) => {
                                                        return [
                                                            ...oldAnimals,
                                                            ...animals,
                                                        ];
                                                    });
                                                    setTotalPages(pages);
                                                })
                                                .finally(() => {
                                                    setIsLoading(false);
                                                });
                                        }}
                                    >
                                        Página {page}, carregar mais animais...
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
            <section className="cadastro">
                <h2 className="cadastro__titulo">Cadastro de animais</h2>
                <div className="cadastro__formulario">
                    <Form>
                        <TextField name="nome" type="text" isRequired>
                            <Label>Nome:</Label>
                            <Input />
                            <FieldError />
                        </TextField>
                        <TextField name="nomeCientifico" type="text" isRequired>
                            <Label>Nome científico:</Label>
                            <Input />
                            <FieldError />
                        </TextField>
                        <label htmlFor="imagem">Imagem:</label>
                        <input
                            id="imagem"
                            type="file"
                            onChange={({ target }) => {
                                if (target.files) {
                                    const file = target.files[0];
                                    setSelectedImage(URL.createObjectURL(file));
                                    setSelectedFile(file);
                                }
                            }}
                        />
                        {selectedImage && <img src={selectedImage} alt="" />}
                        {/* <FileTrigger type="file" onSelect={handleFileChange}>
                            <Label>Imagem:</Label>
                            <Button>Select a file</Button>
                        </FileTrigger> */}
                        {/* <label>
                            <input
                                type="file"
                                onChange={({ target }) => {
                                    if (target.files) {
                                        const file = target.files[0];
                                        setSelectedImage(
                                            URL.createObjectURL(file)
                                        );
                                        setSelectedFile(file);
                                    }
                                }}
                            />
                            {selectedImage ? (
                                <img src={selectedImage} alt="" />
                            ) : (
                                <span>Selecionar imagem...</span>
                            )}
                        </label> */}
                        {/* <Button isDisabled={uploading}>
                            {uploading ? "Uploading..." : "Upload"}
                        </Button> */}
                        <TextField
                            name="descricaoImagem"
                            type="text"
                            isRequired
                        >
                            <Label>Descrição da imagem:</Label>
                            <TextArea />
                            <FieldError />
                        </TextField>
                        <TextField
                            name="caracteristicas"
                            type="text"
                            isRequired
                        >
                            <Label>Características:</Label>
                            <TextArea />
                            <FieldError />
                        </TextField>
                        <TextField name="alimentacao" type="text" isRequired>
                            <Label>Alimentação:</Label>
                            <Input />
                            <FieldError />
                        </TextField>
                        <TextField
                            name="locaisAvistamento"
                            type="text"
                            isRequired
                        >
                            <Label>Possíveis locais de avistamento</Label>
                            <Input />
                            <FieldError />
                        </TextField>
                        <Select name="estadoIUCN" isRequired>
                            <Label>Estado de Conservação IUCN</Label>
                            <Button>
                                <SelectValue />
                                <span aria-hidden="true">▼</span>
                            </Button>
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
                        </Select>
                        <TextField name="link" type="url" isRequired>
                            <Label>Link para mais informações:</Label>
                            <Input />
                            <FieldError />
                        </TextField>
                        <div className="cadastro__formulario__botoes">
                            <Button name="cancelarCadastro" type="reset">
                                Cancelar
                            </Button>
                            <Button name="cadastrarAnimal" type="submit">
                                Cadastrar
                            </Button>
                            <button onClick={handleUpload} type="submit">
                                Upload
                            </button>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}
export default AdminPage;
