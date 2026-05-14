const { useState, useEffect, useRef, useCallback } = React;

const IMGS = {
  heroPrincipal:
    "imgs/img1.jpeg",
  historiaLateral:
    "imgs/img2.jpeg",
  pastor: "https://picsum.photos/seed/pastor-igreja/700/760",
  liderLouvor: "https://picsum.photos/seed/lider-musica/700/760",
  coordInfantil: "https://picsum.photos/seed/coord-infantil/700/760",
  coordSocial: "https://picsum.photos/seed/acao-social/700/760",
  comunicacao: "https://picsum.photos/seed/comunicacao-igreja/700/760",
  recepcao: "https://picsum.photos/seed/acolhimento-igreja/700/760",
};

const photos = [
  {
    src: "https://images.unsplash.com/photo-1465848059293-208e11dfea17?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Interior da catedral",
    cat: "culto",
  },
  {
    src: "https://images.unsplash.com/photo-1676200533393-37f07f23bbe8?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Afrescos e altar",
    cat: "culto",
  },
  {
    src: "https://images.unsplash.com/photo-1491566102020-21838225c3c8?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Nave central",
    cat: "espaco",
  },
  {
    src: "https://images.unsplash.com/photo-1617723275536-7a2937f017bc?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Bancos de madeira",
    cat: "espaco",
  },
  {
    src: "https://images.unsplash.com/photo-1676200259384-b2900d8478a3?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Decorações douradas",
    cat: "espaco",
  },
  {
    src: "https://images.unsplash.com/photo-1562445735-e038b568a0a0?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Celebração comunitária",
    cat: "social",
  },
  {
    src: "https://images.unsplash.com/photo-1698822079732-501a7e06860f?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Velas e cruz",
    cat: "culto",
  },
  {
    src: "https://images.unsplash.com/photo-1523522484701-76ae015df9e6?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Fachada da catedral",
    cat: "espaco",
  },
  {
    src: "https://images.unsplash.com/photo-1651140501355-f9f7d82b677b?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Torre da igreja",
    cat: "espaco",
  },
  {
    src: "https://images.unsplash.com/photo-1546444809-d64eccd9fb88?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Vitral colorido",
    cat: "culto",
  },
  {
    src: "https://images.unsplash.com/photo-1560698831-07984c110e4d?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Interior vazio",
    cat: "espaco",
  },
  {
    src: "https://images.unsplash.com/photo-1609404829536-60f3b89b8de4?fm=jpg&q=75&w=800&auto=format&fit=crop",
    legenda: "Cruz dourada",
    cat: "culto",
  },
  {
    src: "https://picsum.photos/seed/jovens-reuniao/800/600",
    legenda: "Reunião de jovens",
    cat: "jovens",
  },
  {
    src: "https://picsum.photos/seed/jovens-acampamento/800/600",
    legenda: "Acampamento jovens",
    cat: "jovens",
  },
  {
    src: "https://picsum.photos/seed/cestas-doacao/800/600",
    legenda: "Entrega de cestas",
    cat: "social",
  },
];

const EVENTOS = [
  { dia: 6, mes: 4, ano: 2026, label: "Culto dom. 18h", tipo: "culto" },
  { dia: 8, mes: 4, ano: 2026, label: "Reunião de oração", tipo: "culto" },
  { dia: 11, mes: 4, ano: 2026, label: "Culto dom. 18h", tipo: "culto" },
  { dia: 12, mes: 4, ano: 2026, label: "Jovens 17h", tipo: "jovens" },
  { dia: 13, mes: 4, ano: 2026, label: "Culto qua. 19h30", tipo: "culto" },
  { dia: 18, mes: 4, ano: 2026, label: "Culto dom. 18h", tipo: "culto" },
  { dia: 19, mes: 4, ano: 2026, label: "Pão Compartilhado", tipo: "social" },
  { dia: 20, mes: 4, ano: 2026, label: "Culto qua. 19h30", tipo: "culto" },
  { dia: 25, mes: 4, ano: 2026, label: "Culto dom. 18h", tipo: "culto" },
  { dia: 26, mes: 4, ano: 2026, label: "Jovens 17h", tipo: "jovens" },
  { dia: 27, mes: 4, ano: 2026, label: "Culto qua. 19h30", tipo: "culto" },
  { dia: 4, mes: 5, ano: 2026, label: "Culto dom. 18h", tipo: "culto" },
  { dia: 6, mes: 5, ano: 2026, label: "Culto qua. 19h30", tipo: "culto" },
  { dia: 10, mes: 5, ano: 2026, label: "Culto dom. 18h", tipo: "culto" },
  { dia: 17, mes: 5, ano: 2026, label: "Pão Compartilhado", tipo: "social" },
];

const MESES_CURTOS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
const MESES_LONGOS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const Icone = ({ nome, classe = "" }) => (
  <span className={`material-symbols-outlined ${classe}`}>{nome}</span>
);

// ══════════════════════════════
//  COMPONENTE: PRÓXIMOS EVENTOS
// ══════════════════════════════
function ProximosEventos() {
  const hoje = new Date();
  const proximos = EVENTOS.filter(
    (e) => new Date(e.ano, e.mes - 1, e.dia) >= hoje,
  )
    .sort(
      (a, b) =>
        new Date(a.ano, a.mes - 1, a.dia) - new Date(b.ano, b.mes - 1, b.dia),
    )
    .slice(0, 5);

  const tipoLabel = { culto: "Culto", jovens: "Jovens", social: "Social" };
  const tipoIcone = {
    culto: "church",
    jovens: "groups",
    social: "volunteer_activism",
  };

  return (
    <div className="lista-eventos">
      {proximos.map((ev, i) => (
        <div key={i} className="item-evento">
          <div className="caixa-data-evento">
            <span className="dia">{String(ev.dia).padStart(2, "0")}</span>
            <span className="mes">{MESES_CURTOS[ev.mes - 1]}</span>
          </div>
          <div className="info-evento">
            <strong>{ev.label}</strong>
            <span>{ev.ano}</span>
          </div>
          <span
            className="etiqueta-projeto"
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Icone nome={tipoIcone[ev.tipo]} />
            {tipoLabel[ev.tipo]}
          </span>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════
//  COMPONENTE PRINCIPAL: APP
// ══════════════════════════════
function App() {
  const [paginaAtual, setPaginaAtual] = useState("inicio");
  const [gavetaAberta, setGavetaAberta] = useState(false);
  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem("iev-tema");
    if (salvo) return salvo;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "escuro"
      : "claro";
  });

  // Lista de páginas que realmente existem no site
  const paginasValidas = ["inicio", "historia", "contato"];
  const validarPagina = (hash) => paginasValidas.includes(hash) ? hash : "inicio";

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    localStorage.setItem("iev-tema", tema);
  }, [tema]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    setPaginaAtual(validarPagina(hash));
  }, []);

  useEffect(() => {
    const lidarComMudanca = () => {
      const hash = window.location.hash.replace("#", "");
      setPaginaAtual(validarPagina(hash));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", lidarComMudanca);
    return () => window.removeEventListener("hashchange", lidarComMudanca);
  }, []);

  useEffect(() => {
    const fechar = (e) => {
      if (e.key === "Escape") setGavetaAberta(false);
    };
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = gavetaAberta ? "hidden" : "";
  }, [gavetaAberta]);

  const navegar = (pagina) => {
    const destino = validarPagina(pagina);
    window.location.hash = destino;
    setPaginaAtual(destino);
    setGavetaAberta(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const alternarTema = () =>
    setTema((t) => (t === "claro" ? "escuro" : "claro"));

  const itensMenu = [
    { id: "inicio", rot: "Menu inicial", num: "01", icone: "home" },
    {
      id: "historia",
      rot: "História da igreja",
      num: "02",
      icone: "history_edu",
    },
 
    {
      id: "contato",
      rot: "Localização da Igreja",
      num: "03",
      icone: "contact_mail",
    },
 
  ];

  return (
    <>

      {/* ── CABEÇALHO ── */}
      <header className="cabecalho-site">
        <div className="container cabecalho-interno">
          <a
            className="marca"
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              navegar("inicio");
            }}
            aria-label="Ir para a página inicial"
          >
            <div className="marca-icone">
              <Icone nome="church" />
            </div>
            <div className="marca-texto">
              <strong>Igreja Nossa Senhora do Perpétuo Socorro</strong>
              <span>PORTAL DA COMUNIDADE</span>
            </div>
          </a>

          <div className="acoes-cabecalho">
            <button
              className="botao-icone"
              type="button"
              onClick={alternarTema}
              aria-label={
                tema === "escuro" ? "Ativar modo claro" : "Ativar modo escuro"
              }
            >
              <Icone nome={tema === "escuro" ? "light_mode" : "dark_mode"} />
            </button>
            <button
              className="botao-icone"
              type="button"
              onClick={() => setGavetaAberta(true)}
              aria-label="Abrir menu"
              aria-expanded={gavetaAberta}
            >
              <Icone nome="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* ── GAVETA (menu lateral) ── */}
      <div
        className={`gaveta-fundo${gavetaAberta ? " aberto" : ""}`}
        onClick={() => setGavetaAberta(false)}
      />
      <aside
        className={`gaveta${gavetaAberta ? " aberta" : ""}`}
        aria-label="Menu principal"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <p className="rotulo-secao">
              <Icone nome="menu_book" />
              Navegação
            </p>
            <h3>Portal da igreja</h3>
          </div>
          <button
            className="botao-icone"
            type="button"
            onClick={() => setGavetaAberta(false)}
            aria-label="Fechar menu"
          >
            <Icone nome="close" />
          </button>
        </div>
        <nav>
          <ul>
            {itensMenu.map((item) => (
              <li key={item.id}>
                <a
                  className={`gaveta-link${paginaAtual === item.id ? " ativo" : ""}`}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navegar(item.id);
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--espaco-2)",
                    }}
                  >
                    <Icone nome={item.icone} />
                    {item.rot}
                  </span>
                  <span>{item.num}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL*/}
      <main id="conteudo">
        <section
          className={`pagina${paginaAtual === "inicio" ? " ativa" : ""}`}
          id="inicio"
        >
          <div className="container destaque-principal">
            <div>
              <span className="rotulo-topo">
                <Icone nome="church" />
                Bem-vindo ao Site!
              </span>
              <h1>Um site para conectar a igreja com a comunidade.</h1>
              <p className="texto-intro">
                Seja bem-vindo ao site da nossa amada igreja Nossa Senhora do
                Perpétuo Socorro. É com grande alegria que recebemos você neste
                espaço dedicado à fé, à esperança e ao amor de Deus!
              </p>
              <div className="linha-botoes">
        
              
              </div>
              <div className="estatisticas">
                <div className="estatistica">
                  <Icone nome="calendar_month" />
                  <div>
                    <strong>Mais de 30 anos</strong>
                    <span>Anos de caminhada comunitária.</span>
                  </div>
                </div>
              </div>
            </div>

            <article className="cartao-destaque">
              <img
                src={IMGS.heroPrincipal}
                alt="Interior da igreja com bancos de madeira"
              />
            </article>
          </div>


        </section>

        {/* ═══ PÁGINA: HISTÓRIA ═══ */}
        <section
          className={`pagina${paginaAtual === "historia" ? " ativa" : ""}`}
          id="historia"
        >
          <div className="container">
            <div className="titulo-pagina">
            
              <h2>História da igreja</h2>
            </div>
            <div className="duas-colunas">
              <img
                className="imagem-secao"
                src={IMGS.historiaLateral}
                alt="Nave central de uma catedral com arcos e vitrais"
              />
              <div>
                <article
                  className="painel-info"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <small className="etiqueta-projeto">
                    <Icone nome="auto_stories" />
                    Nascimento em 1990
                  </small>
                  <p>
                    A Igreja Nossa Senhora do Perpétuo Socorro nasceu em 1990 no
                    mês junho quando o Iran (in memoriam) e a Horlenny formaram
                    o grupo de jovens “Juntos Venceremos,” onde passaram a se
                    reunir em uma pequena quadra que existia no conjunto,
                    construída em mutirão pelos próprios jovens que marcou o
                    início de nossa história. Em seguida, mais precisamente no
                    mês de agosto, reuniram algumas crianças e começaram a
                    catequizá-las e ainda formaram uma escolinha de
                    alfabetização.
                  </p>
                </article>
                <article
                  className="painel-info"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <small className="etiqueta-projeto">
                    <Icone nome="schedule" />
                    07/10/1990
                  </small>
                  <p>
                    Em 07 de outubro de 1990, aconteceu a primeira missa em
                    nossa comunidade, sendo celebrada na quadra pelo o Padre
                    Geraldo, um marco na vida da comunidade e das pessoas que
                    iniciaram essa grande jornada. Padre Geraldo na celebração
                    desta missa disse uma frase marcante que até hoje é lembrada
                    e guardada no coração pelas pessoas que estiveram presentes
                    na primeira missa, segundo ele “A comunidade era
                    privilegiada, pois o teto da comunidade era o céu”.
                  </p>
                </article>
                <article
                  className="painel-info"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <small className="etiqueta-projeto">
                    <Icone nome="auto_stories" />A escolha da padroeira
                  </small>
                  <p>
                    A escolha da padroeira aconteceu de forma inusitada os fiéis
                    que participava da comunidade pensaram em Santa Terezinha do
                    Menino Jesus para homenagear a Dona Terezinha que era muita
                    ativa dentro da comunidade, mas para surpresa da comunidade
                    uma mulher acaba doando uma imagem de nossa senhora do
                    Perpétuo Socorro, e como algumas das pessoas eram muito
                    devotos a Virgem do Socorro, todos concordaram em ser ela a
                    padroeira da comunidade.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PÁGINA: GALERIA ═══ */}

        {/* ═══ PÁGINA: CONTATO ═══ */}
        <section
          className={`pagina${paginaAtual === "contato" ? " ativa" : ""}`}
          id="contato"
        >
          <div className="container">
            <div className="titulo-pagina">
              <span className="rotulo-secao">
                <Icone nome="contact_mail" />
              <h2>Localização</h2>  
              </span>
            </div>

            <div className="grade-contato">
              <article className="cartao-contato">
                <h3>Informações da igreja</h3>
             <div className="lista-contato">
                  {[
                    {
                      icone: "location_on",
                      titulo: "Endereço",
                      valor:
                        "Rua São Lucas, 301 - Quintino Cunha, Fortaleza - CE, 60353-150",
                    }
        
                  ].map((c, i) => (
                    <div key={i} className="item-contato">
                      <div className="item-contato-cabecalho">
                        <Icone nome={c.icone} />
                        <strong>{c.titulo}</strong>
                      </div>
                      <p>{c.valor}</p>
                    </div>
                  ))}
                </div>
              </article>

            </div>

            {/* MAPA */}
            <div className="envoltorio-mapa">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.350320641687!2d-38.60631572516781!3d-3.72368709625032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74a50e8d4bb15%3A0xdedcf493418280eb!2sIgreja%20de%20Nossa%20Senhora%20do%20Perp%C3%A9tuo%20Socorro!5e0!3m2!1spt-BR!2sbr!4v1715724500000!5m2!1spt-BR!2sbr"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Igreja Nossa Sra. do Perpétuo Socorro"
                aria-label="Mapa mostrando a localização da Igreja Igreja Nossa Sra. do Perpétuo em Fortaleza, CE"
              />
              <div className="info-mapa">
                <Icone nome="location_on" />
                <p>
                  <strong>
                    Rua São Lucas, 301 - Quintino Cunha
                  </strong>
                  </p>
              </div>
            </div>

            {/* CALENDÁRIO */}
          </div>
        </section>

       
      </main>

      {/* ── RODAPÉ ── */}
      <footer className="rodape">
        <div className="container rodape-interno">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              navegar("inicio");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--cor-primaria)",
              fontWeight: 600,
            }}
          >
          </a>
        </div>
      </footer>
    </>
  );
}

// ── RENDERIZAÇÃO ──
const raiz = ReactDOM.createRoot(document.getElementById("raiz"));
raiz.render(<App />);
