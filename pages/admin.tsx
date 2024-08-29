import React, { useEffect, useRef, useState } from "react";
import { NextSeo } from "next-seo";
import { animalController } from "@ui/controller/animal";
import {
    Form,
    Label,
    Input,
    Button,
    SearchField,
    Text,
    DialogTrigger,
    Modal,
    Dialog,
    Heading,
} from "react-aria-components";
import Link from "next/link";

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
    const initialLoadComplete = useRef(false);

    // AdminPage infos
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [animals, setAnimals] = useState<AdminAnimal[]>([]);

    // search
    const tableAnimals = animals.filter((animal) => {
        const searchNormalized = search.toLowerCase();
        const nameNormalized = animal.name.toLowerCase();
        return nameNormalized.includes(searchNormalized);
    });
    const hasNoAnimals = tableAnimals.length === 0 && !isLoading;

    useEffect(() => {
        if (!initialLoadComplete.current) {
            animalController
                .get()
                .then(({ animals }) => {
                    setAnimals(animals);
                })
                .finally(() => {
                    setIsLoading(false);
                    initialLoadComplete.current = true;
                });
        }
    }, []);

    return (
        <>
            <NextSeo
                title="Gerenciamento | Fauna do Ribeira"
                description="Página de gerenciamentos dos animais cadastrados no site Fauna do Ribeira"
            />
            <section className="intro__admin">
                <h2 className="intro__admin__title">Olá, administrador(a)!</h2>
                <div className="intro__admin__search">
                    <SearchField
                        id="animal"
                        type="search"
                        inputMode="text"
                        className="intro__admin__search__field"
                    >
                        <Label className="intro__admin__search__label">
                            Buscar animal:
                        </Label>
                        <Input
                            className="intro__admin__search__input"
                            aria-placeholder="Digite um nome, exemplo: Onça-parda."
                            onChange={function handleSearch(event) {
                                setSearch(event.target.value);
                            }}
                        />
                        {/* <Button>✕</Button> */}
                        <div className="intro__admin__search__text">
                            <Text aria-hidden="true" slot="description">
                                Digite um nome, exemplo: Onça-parda.
                            </Text>
                        </div>
                    </SearchField>
                </div>
            </section>
            <section className="table">
                <div className="table__createButton">
                    <Link
                        href="/admin-animal-create"
                        role="button"
                        id="createAnimalTableButton"
                    >
                        <span aria-hidden="true">+</span> Cadastrar animal
                    </Link>
                </div>
                <table>
                    <caption className="table__subtitle">
                        Animais cadastrados no site Fauna do Ribeira
                    </caption>
                    <thead className="table__head">
                        <tr>
                            <th scope="col" className="table__head__title">
                                ID
                            </th>
                            <th scope="col" className="table__head__title">
                                Imagem
                            </th>
                            <th scope="col" className="table__head__title">
                                Descrição da imagem
                            </th>
                            <th scope="col" className="table__head__title">
                                Nome
                            </th>
                            <th scope="col" className="table__head__title">
                                Nome científico
                            </th>
                            <th scope="col" className="table__head__title">
                                Características
                            </th>
                            <th scope="col" className="table__head__title">
                                Alimentação
                            </th>
                            <th scope="col" className="table__head__title">
                                Localização
                            </th>
                            <th scope="col" className="table__head__title">
                                Estado IUCN
                            </th>
                            <th scope="col" className="table__head__title">
                                Link
                            </th>
                            {/* <th scope="col" className="table__head__title">
                                Exibir detalhes
                            </th> */}
                            <th scope="col" className="table__head__title">
                                Editar
                            </th>
                            <th scope="col" className="table__head__title">
                                Excluir
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {tableAnimals.map((animal) => {
                            return (
                                <tr key={animal.id}>
                                    <td className="table__body__content">
                                        {animal.id.substring(0, 4)}
                                    </td>
                                    <td className="table__body__content--image">
                                        <img
                                            src={`images/fauna-do-ribeira-${animal.image}`}
                                            alt=""
                                        />
                                        {animal.image}
                                    </td>
                                    <td className="table__body__content">
                                        {animal.imageDescription}
                                    </td>
                                    <td
                                        className="table__body__content"
                                        id="tableAnimalName"
                                    >
                                        {animal.name}
                                    </td>
                                    <td className="table__body__content">
                                        {animal.scientificName}
                                    </td>
                                    <td className="table__body__content">
                                        {animal.characteristics}
                                    </td>
                                    <td className="table__body__content">
                                        {animal.eating}
                                    </td>
                                    <td className="table__body__content">
                                        {animal.location}
                                    </td>
                                    <td className="table__body__content">
                                        {animal.iucnState}
                                    </td>
                                    <td className="table__body__content">
                                        {animal.link}
                                    </td>
                                    <td className="table__body__content--update">
                                        <Link
                                            href={{
                                                pathname:
                                                    "/admin-animal-update",
                                                query: {
                                                    id: animal.id,
                                                },
                                            }}
                                            role="button"
                                            aria-label={animal.name}
                                            id="updateAnimalTableButton"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                    <td className="table__body__content--delete">
                                        <DialogTrigger>
                                            <Button aria-label={animal.name}>
                                                <a
                                                    id="deleteAnimalTableButton"
                                                    href="#deleteAnimal"
                                                    role="button"
                                                >
                                                    Excluir
                                                </a>
                                            </Button>
                                            <Modal className="react-aria-DialogModal">
                                                <Dialog>
                                                    {({ close }) => (
                                                        <Form id="deleteAnimal">
                                                            <Heading slot="title">
                                                                Excluir animal
                                                            </Heading>
                                                            <p>
                                                                Tem certeza que
                                                                deseja excluir “
                                                                {animal.name}
                                                                ”? As
                                                                informações a
                                                                respeito dessa
                                                                espécie serão
                                                                permanentemente
                                                                excluídas.
                                                            </p>
                                                            <div className="react-aria-Buttons">
                                                                <Button
                                                                    className="cancelButton"
                                                                    onPress={
                                                                        close
                                                                    }
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                                <Button
                                                                    name="deleteAnimal"
                                                                    className="deleteButton"
                                                                    onPress={function handleClick() {
                                                                        animalController
                                                                            .deleteById(
                                                                                animal.id
                                                                            )
                                                                            .then(
                                                                                () => {
                                                                                    setAnimals(
                                                                                        (
                                                                                            currentAnimals
                                                                                        ) => {
                                                                                            return currentAnimals.filter(
                                                                                                (
                                                                                                    currentAnimal
                                                                                                ) => {
                                                                                                    if (
                                                                                                        currentAnimal.id ===
                                                                                                        animal.id
                                                                                                    )
                                                                                                        return false;

                                                                                                    return true;
                                                                                                }
                                                                                            );
                                                                                        }
                                                                                    );
                                                                                }
                                                                            )
                                                                            .catch(
                                                                                () => {
                                                                                    console.error(
                                                                                        "Failed to delete"
                                                                                    );
                                                                                }
                                                                            );
                                                                    }}
                                                                >
                                                                    Excluir
                                                                </Button>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Dialog>
                                            </Modal>
                                        </DialogTrigger>
                                    </td>
                                </tr>
                            );
                        })}
                        {isLoading && (
                            <tr>
                                <td
                                    className="table__body__content--loading"
                                    colSpan={12}
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}
                        {hasNoAnimals && (
                            <tr>
                                <td
                                    className="table__body__content--notFound"
                                    colSpan={12}
                                >
                                    Nenhum animal encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
}
export default AdminPage;
