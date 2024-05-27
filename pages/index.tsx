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
    scientificName: string;
    characteristics: string;
    eating: string;
    location: string;
    iucnState: string;
    link: string;
}

function HomePage() {
    const [page, setPage] = React.useState(1);
    const [animals, setAnimals] = React.useState<HomeAnimal[]>([]);

    //Carrega as informações
    React.useEffect(() => {
        animalController.get({ page }).then(({ animals }) => {
            setAnimals(animals);
        });
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
                    {/* <label htmlFor="animal" className="cards__busca__texto">
                        Buscar animal:
                    </label> */}
                    <SearchField id="animal" type="search" inputMode="text">
                        <Label htmlFor="animal">Buscar animal:</Label>
                        <Input />
                        <Button>✕</Button>
                        <Text slot="description">
                            Digite um nome, ex: Onça-parda.
                        </Text>
                    </SearchField>
                </div>
                {animals.map((animal) => {
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
                <Button onPress={() => setPage(page + 1)}>
                    Página {page}, carregar mais animais...
                </Button>
            </section>
        </>
    );
}

export default HomePage;
