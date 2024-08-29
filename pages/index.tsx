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
                <article>
                    <h2 className="banner__title">Seja Bem-vindo(a)!</h2>
                    <p className="banner__text">
                        Conheça a{" "}
                        <strong className="banner__text--emphasis">
                            fauna nativa da região do Vale do Ribeira{" "}
                        </strong>
                        e o Estado de Conservação de cada espécie segundo a
                        União Internacional para a Conservação da Natureza e dos
                        Recursos Naturais (IUCN).
                    </p>
                    <Link className="banner__link" href="#animals">
                        Conhecer animais
                    </Link>
                </article>
                <div className="banner__image">
                    <img src="" alt="" />
                </div>
            </section>
            <h3 className="title">Catálogo de espécies</h3>
            <section className="cards" id="animals">
                {homeAnimals.map((animal) => {
                    return (
                        <div className="card" key={animal.id}>
                            <h4 className="card__title">{animal.name}</h4>
                            <img
                                src={`/images/fauna-do-ribeira-${animal.image}`}
                                alt={animal.imageDescription}
                                className="card__image"
                            />
                            <div className="card__content">
                                <dl className="card__content__list">
                                    <dt className="card__content__list__topic">
                                        Nome científico
                                    </dt>
                                    <dd className="card__content__list__text">
                                        <i>{animal.scientificName}</i>
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
                                        Locais de avistamento
                                    </dt>
                                    <dd className="card__content__list__text">
                                        {animal.location}
                                    </dd>
                                    <dt className="card__content__list__topic">
                                        Estado de Conservação IUCN
                                        <span
                                            id="iucn-tooltip"
                                            aria-hidden="false"
                                            className="tooltip-trigger"
                                            aria-describedby="tooltip-description"
                                            tabIndex={0}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="18px"
                                                viewBox="0 -960 960 960"
                                                width="24px"
                                                fill="#1a1a1a"
                                            >
                                                <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                            </svg>
                                        </span>
                                        <span
                                            id="tooltip-description"
                                            role="tooltip"
                                            aria-hidden="false"
                                        >
                                            A União Internacional para a
                                            Conservação da Natureza e dos
                                            Recursos Naturais é responsável por
                                            catalogar o estado de conservação de
                                            diversas espécies de plantas,
                                            animais, fungos e protozoários na
                                            Lista Vermelha de Espécies
                                            Ameaçadas.
                                        </span>
                                    </dt>
                                    <dd className="card__content__list__text">
                                        {animal.iucnState}
                                        <span className="tooltip-screenReader">
                                            A União Internacional para a
                                            Conservação da Natureza e dos
                                            Recursos Naturais (IUCN) é
                                            responsável por catalogar o estado
                                            de conservação de diversas espécies
                                            de plantas, animais, fungos e
                                            protozoários na Lista Vermelha de
                                            Espécies Ameaçadas.
                                        </span>
                                    </dd>
                                </dl>
                                <div
                                    className="card__content__link"
                                    id="cardLink"
                                >
                                    <Link
                                        href={animal.link}
                                        target="_blank"
                                        aria-label={`Saiba mais sobre o(a) ${animal.name}`}
                                    >
                                        Saiba mais
                                        {/* <span className="card__content__link--emphasis">
                                        sobre o(a) {animal.name}
                                    </span> */}
                                    </Link>
                                </div>
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
                <div className="accordion__content">
                    <ul
                        id="accordionContent"
                        className="accordion__content"
                        hidden={!isOpen}
                    >
                        <li className="accordion__content__list">
                            AZEVEDO, Ana Lúcia. Veja curiosidades sobre o
                            boto-cinza. O Globo, 2022. Disponível em:
                            https://oglobo.globo.com/um-so-planeta/noticia/2022/05/veja-curiosidades-sobre-o-boto-cinza.ghtml.
                            Acesso em: 15 maio 2024.
                        </li>
                        <li className="accordion__content__list">
                            Bugio-ruivo. In: Wikipedia, 2021. Disponível em:
                            https://pt.wikipedia.org/wiki/Bugio-ruivo. Acesso
                            em: 15 maio 2024.
                        </li>
                        <li className="accordion__content__list">
                            GOMES, Leticia. Jiboia mais rara do mundo é achada
                            ‘sem querer’ no interior de São Paulo. G1, 2020.
                            Disponível em:
                            https://g1.globo.com/sp/santos-regiao/noticia/2020/11/25/jiboia-mais-rara-do-mundo-e-achada-sem-querer-no-interior-de-sao-paulo.ghtml.
                            Acesso em: 16 maio 2024.
                        </li>
                        <li className="accordion__content__list">
                            IPEC PESQUISAS. IPeC Pesquisas, [s.d]. Projeto
                            Boto-Cinza. Disponível em:
                            https://ipecpesquisas.org.br/projetobotocinza/.
                            Acesso em: 15 maio 2024.
                        </li>
                        <li className="accordion__content__list">
                            IUCN RED LIST. IUCN Red List, 2024. The IUCN Red
                            List of Threatened Species. Disponível em:
                            https://www.iucnredlist.org/. Acesso em: 15 maio
                            2024.
                        </li>
                        <li className="accordion__content__list">
                            Jiboia rara é vista pela terceira vez em quase 70
                            anos no interior paulista. UOL Notícias, 2020.
                            Disponível em:
                            https://noticias.uol.com.br/cotidiano/ultimas-noticias/2020/11/25/jiboia-rara-e-vista-pela-3-vez-em-quase-70-anos-no-interior-paulista.htm.
                            Acesso em: 16 maio 2024.
                        </li>
                        <li className="accordion__content__list">
                            ONÇAFARI. Onçafari, [s.d]. Conheça a nossa fauna.
                            Disponível em: https://oncafari.org/fauna/. Acesso
                            em: 15 maio 2024.
                        </li>
                        <li className="accordion__content__list">
                            PARQUE ECOLÓGICO IMIGRANTES. Parque Ecológico
                            Imigrantes, c2019. Quase sempre ao pôr do sol
                            começam as vocalizações dos bugios no parque
                            ecológico imigrantes. Disponível em:
                            https://parqueecologicoimigrantes.org.br/atracoes/bugio/.
                            Acesso em: 15 maio 2024.
                        </li>
                        <li className="accordion__content__list">
                            WIKIAVES. WikiAves, c2024. Observação de aves e
                            ciência cidadã para todos. Disponível em:
                            https://www.wikiaves.com.br/. Acesso em: 15 maio
                            2024.
                        </li>
                    </ul>
                </div>
            </section>
            <footer className="footer">
                <div className="footer__content">
                    <p className="footer__text">
                        Se interessou pelo projeto e gostaria de ser um(a)
                        colaborador(a)?
                    </p>
                    <Link
                        href="mailto:nfelixmacedo@gmail.com"
                        aria-describedby="contactDescription"
                        className="footer__button"
                    >
                        Clique aqui para entrar em contato
                    </Link>
                    <p
                        id="contactDescription"
                        className="footer__text--screenReader"
                    >
                        Abre a janela do aplicativo de e-mail com o destinatário
                        (e-mail do responsável pelo projeto) já preenchido.
                    </p>
                </div>
            </footer>
        </>
    );
}

export default HomePage;
