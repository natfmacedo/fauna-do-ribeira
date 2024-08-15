import { animalController } from "@ui/controller/animal";
import React, { useEffect, useRef, useState } from "react";
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
    const initialLoadComplete = useRef(false);

    // HomePage infos
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [animals, setAnimals] = useState<HomeAnimal[]>([]);

    // search
    const homeAnimals = animals.filter((animal) => {
        const searchNormalized = search.toLowerCase();
        const nameNormalized = animal.name.toLowerCase();
        return nameNormalized.includes(searchNormalized);
    });
    const hasNoAnimals = homeAnimals.length === 0 && !isLoading;

    // accordion
    const [isOpen, setIsOpen] = useState(false);
    const handleVisibilityToggle = () => setIsOpen(!isOpen);

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
            <section className="banner">
                <div className="banner__content">
                    <h2 className="banner__content__title">
                        Seja Bem-vindo(a)!
                    </h2>
                    <p className="banner__content__text">
                        Conheça a{" "}
                        <strong className="banner__content__text--emphasis">
                            fauna nativa da região do Vale do Ribeira{" "}
                        </strong>
                        e o Estado de Conservação de cada espécie segundo a
                        União Internacional para a Conservação da Natureza e dos
                        Recursos Naturais (IUCN).
                    </p>
                </div>
            </section>
            <section className="cards">
                <h3 className="cards__title">Catálogo de animais</h3>
                <div className="cards__search">
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
                            <img
                                src={`/images/fauna-do-ribeira-${animal.image}`}
                                alt={animal.imageDescription}
                                className="card__image"
                            />
                            <div className="card__content">
                                <h4
                                    className="card__content__title"
                                    id="nomeAnimal"
                                >
                                    {animal.name}
                                </h4>
                                <dl className="card__content__list">
                                    <dt className="card__content__list__topic">
                                        Nome científico
                                    </dt>
                                    <dd className="card__content__list__text">
                                        {animal.scientificName}
                                    </dd>
                                    <dt className="card__content__list__topic">
                                        Características
                                    </dt>
                                    <dd className="card__content__list__text">
                                        {animal.characteristics}
                                    </dd>
                                    <dt className="card__content__list__topic">
                                        Alimentação
                                    </dt>
                                    <dd className="card__content__list__text">
                                        {animal.eating}
                                    </dd>
                                    <dt className="card__content__list__topic">
                                        Possíveis locais de avistamento
                                    </dt>
                                    <dd className="card__content__list__text">
                                        {animal.location}
                                    </dd>
                                    <dt className="card__content__list__topic">
                                        Estado de Conservação IUCN
                                    </dt>
                                    <dd className="card__content__list__text">
                                        {animal.iucnState}
                                    </dd>
                                </dl>
                                <Link
                                    className="card__content__link"
                                    href={animal.link}
                                    target="_blank"
                                >
                                    Saiba mais{" "}
                                    <span className="card__content__link--emphasis">
                                        sobre o(a) {animal.name}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </section>
            <section className="accordion">
                <div>
                    <h2 className="accordion__title">
                        <Button
                            aria-expanded={isOpen}
                            aria-controls="accordionContent"
                            onPress={handleVisibilityToggle}
                        >
                            Referências
                        </Button>
                    </h2>
                </div>
                <div>
                    <ul
                        id="accordionContent"
                        className="accordion__content"
                        hidden={!isOpen}
                    >
                        <li className="accordion__content">
                            AZEVEDO, Ana Lúcia. Veja curiosidades sobre o
                            boto-cinza. O Globo, 2022. Disponível em:
                            https://oglobo.globo.com/um-so-planeta/noticia/2022/05/veja-curiosidades-sobre-o-boto-cinza.ghtml.
                            Acesso em: 15 maio 2024.
                        </li>
                        <li className="accordion__content">
                            Bugio-ruivo. In: Wikipedia, 2021. Disponível em:
                            https://pt.wikipedia.org/wiki/Bugio-ruivo. Acesso
                            em: 15 maio 2024.
                        </li>
                        <li className="accordion__content">
                            GOMES, Leticia. Jiboia mais rara do mundo é achada
                            ‘sem querer’ no interior de São Paulo. G1, 2020.
                            Disponível em:
                            https://g1.globo.com/sp/santos-regiao/noticia/2020/11/25/jiboia-mais-rara-do-mundo-e-achada-sem-querer-no-interior-de-sao-paulo.ghtml.
                            Acesso em: 16 maio 2024.
                        </li>
                        <li className="accordion__content">
                            IPEC PESQUISAS. IPeC Pesquisas, [s.d]. Projeto
                            Boto-Cinza. Disponível em:
                            https://ipecpesquisas.org.br/projetobotocinza/.
                            Acesso em: 15 maio 2024.
                        </li>
                        <li className="accordion__content">
                            IUCN RED LIST. IUCN Red List, 2024. The IUCN Red
                            List of Threatened Species. Disponível em:
                            https://www.iucnredlist.org/. Acesso em: 15 maio
                            2024.
                        </li>
                        <li className="accordion__content">
                            Jiboia rara é vista pela terceira vez em quase 70
                            anos no interior paulista. UOL Notícias, 2020.
                            Disponível em:
                            https://noticias.uol.com.br/cotidiano/ultimas-noticias/2020/11/25/jiboia-rara-e-vista-pela-3-vez-em-quase-70-anos-no-interior-paulista.htm.
                            Acesso em: 16 maio 2024.
                        </li>
                        <li className="accordion__content">
                            ONÇAFARI. Onçafari, [s.d]. Conheça a nossa fauna.
                            Disponível em: https://oncafari.org/fauna/. Acesso
                            em: 15 maio 2024.
                        </li>
                        <li className="accordion__content">
                            PARQUE ECOLÓGICO IMIGRANTES. Parque Ecológico
                            Imigrantes, c2019. Quase sempre ao pôr do sol
                            começam as vocalizações dos bugios no parque
                            ecológico imigrantes. Disponível em:
                            https://parqueecologicoimigrantes.org.br/atracoes/bugio/.
                            Acesso em: 15 maio 2024.
                        </li>
                        <li className="accordion__content">
                            WIKIAVES. WikiAves, c2024. Observação de aves e
                            ciência cidadã para todos. Disponível em:
                            https://www.wikiaves.com.br/. Acesso em: 15 maio
                            2024.
                        </li>
                    </ul>
                </div>
            </section>
            <footer>
                <p>
                    Se interessou pelo projeto e gostaria de ser um(a)
                    colaborador(a)?
                </p>
                <Button aria-describedby="contactDescription">
                    Clique aqui para entrar em contato
                </Button>
                <p id="contactDescription">
                    Abre a janela do aplicativo de e-mail com o destinatário
                    (e-mail do projeto) já preenchido.
                </p>
            </footer>
        </>
    );
}

export default HomePage;
