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
import axios from "axios";
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
            <section className="intro">
                <h2 className="intro__title">Olá, administrador(a)!</h2>
                <div className="intro__search">
                    <SearchField id="animal" type="search" inputMode="text">
                        <Label>Buscar animal:</Label>
                        <Input
                            aria-placeholder="Digite um nome, exemplo: Onça-parda."
                            onChange={function handleSearch(event) {
                                setSearch(event.target.value);
                            }}
                        />
                        <Button>✕</Button>
                        <Text aria-hidden="true" slot="description">
                            Digite um nome, exemplo: Onça-parda.
                        </Text>
                    </SearchField>
                </div>
            </section>
            <section className="table">
                <div className="table__createButton">
                    <Link href="/admin-animal-create" role="button">
                        + Cadastrar animal
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
                            <th scope="col" className="table__head__title">
                                Exibir detalhes
                            </th>
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
                                    <td className="tabela__body__content">
                                        {animal.image}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.imageDescription.substring(
                                            0,
                                            48
                                        ) +
                                            (animal.imageDescription.length > 15
                                                ? "..."
                                                : "")}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.name}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.scientificName}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.characteristics.substring(
                                            0,
                                            48
                                        ) +
                                            (animal.characteristics.length > 48
                                                ? "..."
                                                : "")}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.eating.substring(0, 15) +
                                            (animal.eating.length > 15
                                                ? "..."
                                                : "")}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.location.substring(0, 15) +
                                            (animal.location.length > 15
                                                ? "..."
                                                : "")}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.iucnState}
                                    </td>
                                    <td className="tabela__body__content">
                                        {animal.link.substring(0, 15) +
                                            (animal.link.length > 15
                                                ? "..."
                                                : "")}
                                    </td>
                                    <td className="tabela__body__content">
                                        <DialogTrigger>
                                            <Button>Exibir</Button>
                                            <Modal>
                                                <Dialog>
                                                    {({ close }) => (
                                                        <div className="tabela__body__content__card">
                                                            <Heading slot="title">
                                                                Detalhes do card
                                                            </Heading>
                                                            <img
                                                                src=""
                                                                alt=""
                                                            />
                                                            <div className="tabela__corpo__conteudo__card__conteudo">
                                                                <h4
                                                                    className="card__conteudo__titulo"
                                                                    id="nomeAnimal"
                                                                >
                                                                    {
                                                                        animal.name
                                                                    }
                                                                </h4>
                                                                <dl className="card__conteudo__lista">
                                                                    <dt className="card__conteudo__lista__topico">
                                                                        Nome
                                                                        científico
                                                                    </dt>
                                                                    <dd className="card__conteudo__lista__texto">
                                                                        {
                                                                            animal.scientificName
                                                                        }
                                                                    </dd>
                                                                    <dt className="card__conteudo__lista__topico">
                                                                        Características
                                                                    </dt>
                                                                    <dd className="card__conteudo__lista__texto">
                                                                        {
                                                                            animal.characteristics
                                                                        }
                                                                    </dd>
                                                                    <dt className="card__conteudo__lista__topico">
                                                                        Alimentação
                                                                    </dt>
                                                                    <dd className="card__conteudo__lista__texto">
                                                                        {
                                                                            animal.eating
                                                                        }
                                                                    </dd>
                                                                    <dt className="card__conteudo__lista__topico">
                                                                        Possíveis
                                                                        locais
                                                                        de
                                                                        avistamento
                                                                    </dt>
                                                                    <dd className="card__conteudo__lista__texto">
                                                                        {
                                                                            animal.location
                                                                        }
                                                                    </dd>
                                                                    <dt className="card__conteudo__lista__topico">
                                                                        Estado
                                                                        de
                                                                        Conservação
                                                                        IUCN
                                                                    </dt>
                                                                    <dd className="card__conteudo__lista__texto">
                                                                        {
                                                                            animal.iucnState
                                                                        }
                                                                    </dd>
                                                                </dl>
                                                                <Link
                                                                    className="react-aria-Button"
                                                                    href={
                                                                        animal.link
                                                                    }
                                                                    target="_blank"
                                                                >
                                                                    Saiba mais{" "}
                                                                    <span>
                                                                        sobre
                                                                        o(a){" "}
                                                                        {
                                                                            animal.name
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <Button
                                                                onPress={close}
                                                            >
                                                                Fechar
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Dialog>
                                            </Modal>
                                        </DialogTrigger>
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        <Link
                                            // as={`/admin-animal-update/${animal.name}`}
                                            href={{
                                                pathname:
                                                    "/admin-animal-update",
                                                query: {
                                                    id: animal.id,
                                                },
                                            }}
                                            role="button"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                    <td className="tabela__corpo__conteudo">
                                        <DialogTrigger>
                                            <Button>Excluir</Button>
                                            <Modal>
                                                <Dialog>
                                                    {({ close }) => (
                                                        <Form>
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
                                                            <Button
                                                                onPress={close}
                                                            >
                                                                Cancelar
                                                            </Button>
                                                            <Button
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
                                <td>Carregando...</td>
                            </tr>
                        )}
                        {hasNoAnimals && (
                            <tr>
                                <td>Nenhum animal encontrado.</td>
                            </tr>
                        )}
                        {/* {hasMorePages && (
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
                        )} */}
                    </tbody>
                </table>
            </section>
        </>
    );
}
export default AdminPage;
