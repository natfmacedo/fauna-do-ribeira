import { animalController } from "@ui/controller/animal";
import React from "react";
import {
    SearchField,
    Label,
    Input,
    Button,
    Text,
    Link,
} from "react-aria-components";

interface HomeAnimal {
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

function HomePage() {
    // const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);
    const initialLoadComplete = React.useRef(false);
    // const [totalPages, setTotalPages] = React.useState(0);
    const page = 1;
    const limit = 6;
    const [isLoading, setIsLoading] = React.useState(true);
    const [search, setSearch] = React.useState("");
    const [animals, setAnimals] = React.useState<HomeAnimal[]>([]);
    const homeAnimals = animals.filter((animal) => {
        const searchNormalized = search.toLowerCase();
        const nameNormalized = animal.name.toLowerCase();
        return nameNormalized.includes(searchNormalized);
    });
    // const hasMorePages = totalPages > page;
    const hasNoAnimals = homeAnimals.length === 0 && !isLoading;

    //Carrega as informações
    React.useEffect(() => {
        // setInitialLoadComplete(true);

        if (!initialLoadComplete.current) {
            animalController
                .get({ page, limit })
                .then(({ animals }) => {
                    setAnimals(animals);
                    // setTotalPages(pages);
                })
                .finally(() => {
                    setIsLoading(false);
                    initialLoadComplete.current = true;
                });
        }
    }, []);

    return (
        <>
            <section className="banner">
                <div className="banner__conteudo">
                    <h2 className="banner__conteudo__titulo">
                        Seja Bem-vindo(a)!
                    </h2>
                    <p className="banner__conteudo__texto">
                        Conheça a{" "}
                        <strong className="banner__conteudo__texto--destaque">
                            fauna nativa da região do Vale do Ribeira{" "}
                        </strong>
                        e o Estado de Conservação de cada espécie segundo a
                        União Internacional para a Conservação da Natureza e dos
                        Recursos Naturais (IUCN).
                    </p>
                </div>
            </section>
            <section className="cards">
                <h3 className="cards__titulo">Catálogo de animais</h3>
                <div className="cards__busca">
                    <SearchField id="animal" type="search" inputMode="text">
                        <Label htmlFor="animal">Buscar animal:</Label>
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
                        {isLoading && (
                            <p className="cards__busca--carregando">
                                Carregando...
                            </p>
                        )}
                        {hasNoAnimals && (
                            <p className="cards__busca--nao-encontrada">
                                Nenhum animal encontrado.
                            </p>
                        )}
                    </SearchField>
                </div>
                {homeAnimals.map((animal) => {
                    return (
                        <div className="card" key={animal.id}>
                            <img src="" alt="" />
                            <div className="card__conteudo">
                                <h4
                                    className="card__conteudo__titulo"
                                    id="nomeAnimal"
                                >
                                    {animal.name}
                                </h4>
                                <dl className="card__conteudo__lista">
                                    <dt className="card__conteudo__lista__topico">
                                        Nome científico
                                    </dt>
                                    <dd className="card__conteudo__lista__texto">
                                        {animal.scientificName}
                                    </dd>
                                    <dt className="card__conteudo__lista__topico">
                                        Características
                                    </dt>
                                    <dd className="card__conteudo__lista__texto">
                                        {animal.characteristics}
                                    </dd>
                                    <dt className="card__conteudo__lista__topico">
                                        Alimentação
                                    </dt>
                                    <dd className="card__conteudo__lista__texto">
                                        {animal.eating}
                                    </dd>
                                    <dt className="card__conteudo__lista__topico">
                                        Possíveis locais de avistamento
                                    </dt>
                                    <dd className="card__conteudo__lista__texto">
                                        {animal.location}
                                    </dd>
                                    <dt className="card__conteudo__lista__topico">
                                        Estado de Conservação IUCN
                                    </dt>
                                    <dd className="card__conteudo__lista__texto">
                                        {animal.iucnState}
                                    </dd>
                                </dl>
                                <Link
                                    className="react-aria-Button"
                                    href="#"
                                    target="_blank"
                                >
                                    Saiba mais{" "}
                                    <span>sobre o(a) {animal.name}</span>
                                </Link>
                            </div>
                        </div>
                    );
                })}
                {/* {hasMorePages && (
                    <Button
                        onPress={() => {
                            const nextPage = page + 1;
                            setPage(nextPage);

                            animalController
                                .get({ page: nextPage })
                                .then(({ animals, pages }) => {
                                    setAnimals((oldAnimals) => {
                                        return [...oldAnimals, ...animals];
                                    });
                                    setTotalPages(pages);
                                })
                                .finally(() => {
                                    setIsLoading(false);
                                });
                        }}
                    >
                        Ver mais animais ↓
                    </Button>
                )} */}
            </section>
            {/* <section className="botao">
                <Button
                    onPress={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    Voltar para o topo
                </Button>
            </section> */}
        </>
    );
}

export default HomePage;
