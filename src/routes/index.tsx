// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Camera, MapPin, Menu, X } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
});

const WHATSAPP = 'https://wa.me/5511987333123';

const areas = [
  ['01', 'Emagrecimento e obesidade', 'Cuidado médico do emagrecimento conduzido a partir de avaliação clínica, investigação e acompanhamento contínuo.'],
  ['02', 'Hormônios e longevidade', 'Saúde hormonal e metabólica olhadas de forma integrada, com foco em qualidade de vida ao longo do tempo.'],
  ['03', 'Lipedema', 'Avaliação e condução médica do lipedema dentro de um plano individualizado de cuidado.'],
  ['04', 'Estética médica', 'Estética conduzida por médica, integrada ao contexto clínico e metabólico de cada paciente.'],
  ['05', 'Medicina regenerativa', 'Abordagem voltada à saúde do corpo em profundidade, complementar ao cuidado metabólico e hormonal.'],
];

const steps = [
  ['01', 'Avaliação', 'Consulta médica inicial para entender história, sintomas e objetivos.'],
  ['02', 'Investigação', 'Exames e dados clínicos para compreender o que acontece no corpo.'],
  ['03', 'Metabolismo e hormônios', 'Leitura do funcionamento metabólico e hormonal individual.'],
  ['04', 'Composição corporal', 'Análise da composição corporal como parte do quadro clínico.'],
  ['05', 'Estratégia personalizada', 'Definição médica da conduta a partir das necessidades individuais.'],
  ['06', 'Acompanhamento', 'Seguimento contínuo, com ajustes ao longo do processo.'],
];

const faqs = [
  ['Onde acontecem os atendimentos?', 'A AMAE Clinic atende em Vila Olímpia — São Paulo e Tatuapé — São Paulo.'],
  ['Como começa o acompanhamento?', 'Tudo começa por uma consulta médica inicial, dedicada a compreender sua história, sintomas e objetivos.'],
  ['O plano é igual para todas as pacientes?', 'Não. A estratégia é construída individualmente após avaliação clínica e investigação médica.'],
  ['Preencher o formulário confirma a consulta?', 'Não. O envio inicia o contato com a equipe; a consulta é confirmada pelo WhatsApp.'],
];

function Button({ children, href = WHATSAPP, light = false }) {
  return <a className={`button ${light ? 'button--light' : ''}`} href={href}>{children}<ArrowRight size={16} /></a>;
}

function Eyebrow({ children }) { return <p className="eyebrow">{children}</p>; }

function Index() {
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [imc, setImc] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const calcImc = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const weight = Number(String(data.get('weight')).replace(',', '.'));
    let height = Number(String(data.get('height')).replace(',', '.'));
    if (height > 3) height /= 100;
    if (weight > 0 && height > 0) setImc((weight / (height * height)).toFixed(1));
  };

  const contact = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = `Olá! Meu nome é ${d.get('name')}. Tenho interesse em ${d.get('interest')}. Meu WhatsApp é ${d.get('phone')}.`;
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return <>
    <header className="header">
      <a className="brand" href="#inicio"><img src="/assets/amae-logo.png" alt="AMAE Clinic" /></a>
      <nav className={menu ? 'nav nav--open' : 'nav'}>
        <a href="#inicio" onClick={() => setMenu(false)}>Início</a>
        <a href="#dra-amanda" onClick={() => setMenu(false)}>Dra. Amanda</a>
        <a href="#amae" onClick={() => setMenu(false)}>Sobre a AMAE</a>
        <a href="#metodo" onClick={() => setMenu(false)}>Emagreça 360°</a>
        <a href="#cuidados" onClick={() => setMenu(false)}>Áreas de cuidado</a>
        <a href="#jornada" onClick={() => setMenu(false)}>Como funciona</a>
        <a href="#contato" onClick={() => setMenu(false)}>Contato</a>
      </nav>
      <Button>Iniciar acompanhamento</Button>
      <button className="menu" aria-label="Abrir menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero" id="inicio">
        <div className="hero__copy reveal is-visible">
          <span className="hero__seal">360°</span>
          <Eyebrow>AMAE Clinic</Eyebrow>
          <h1>Cuidado Médico<br/><em>360°</em></h1>
          <p>Emagrecimento, hormônios, saúde metabólica, longevidade, lipedema, estética médica e medicina regenerativa — reunidos em um único acompanhamento.</p>
          <Button>Iniciar meu acompanhamento</Button>
        </div>
        <div className="hero__portrait">
          <div className="hero__circle"></div>
          <img src="/assets/dra-amanda-principal.png" alt="Dra. Amanda Pompeu" />
          <span className="hero__name">Dra. Amanda<br/>Pompeu</span>
        </div>
        <span className="scroll-note">role para descobrir</span>
      </section>

      <div className="ticker"><div>{['Emagrecimento','Hormônios','Saúde metabólica','Longevidade','Lipedema','Estética médica','Medicina regenerativa','Emagrecimento','Hormônios'].map((x,i)=><React.Fragment key={i}><span>{x}</span><b>✦</b></React.Fragment>)}</div></div>

      <section className="editorial" id="amae">
        <div className="editorial__image reveal"><span className="giant-word">AMAE</span><img src="/assets/dra-amanda-02.webp" alt="Dra. Amanda Pompeu em retrato editorial" /></div>
        <div className="editorial__copy reveal">
          <Eyebrow>Momento AMAE</Eyebrow>
          <h2>O corpo não se explica<br/><em>por uma única parte.</em></h2>
          <p>A AMAE nasce de uma forma de cuidar que olha o conjunto: metabolismo, hormônios, composição corporal, estética e longevidade dentro de um mesmo acompanhamento médico.</p>
          <div className="facts"><div><strong>360°</strong><span>Cuidado médico</span></div><div><MapPin size={19}/><span>Vila Olímpia · São Paulo<br/>Tatuapé · São Paulo</span></div></div>
        </div>
      </section>

      <section className="method" id="metodo">
        <div className="method__copy reveal"><Eyebrow>O método da casa</Eyebrow><h2>Emagreça <em>360°</em></h2><p>Uma abordagem integrada e personalizada, definida após avaliação médica, exames e necessidades individuais. Não é um pacote fechado — é um caminho clínico construído para cada paciente.</p><Button light>Entender o método</Button></div>
        <div className="method__image reveal"><img src="/assets/dra-amanda-04.webp" alt="Retrato profissional da Dra. Amanda Pompeu"/><span>360°</span></div>
      </section>

      <section className="care section" id="cuidados">
        <div className="section-heading reveal"><Eyebrow>Áreas de cuidado</Eyebrow><h2>Frentes distintas,<br/><em>um só acompanhamento.</em></h2></div>
        <div className="care-list">{areas.map(([n,t,d])=><a href="#contato" className="care-item reveal" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><ArrowRight /></a>)}</div>
      </section>

      <section className="journey" id="jornada">
        <div className="journey__intro reveal"><Eyebrow>Como funciona</Eyebrow><h2>A jornada da paciente,<br/><em>passo a passo.</em></h2><p>Cada etapa amplia a compreensão sobre o corpo, para que a conduta seja segura, coerente e verdadeiramente individual.</p></div>
        <div className="steps">{steps.map(([n,t,d])=><div className="step reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section className="doctor" id="dra-amanda">
        <div className="doctor__copy reveal"><Eyebrow>Autoridade médica</Eyebrow><h2>Dra. Amanda<br/><em>Pompeu</em></h2><p>Médica pós-graduada em Endocrinologia, CRM-SP 235383, e criadora do Protocolo Emagreça 360°. À frente da AMAE, conduz o cuidado médico de emagrecimento, hormônios, metabolismo e longevidade.</p><Button>Conhecer a Dra. Amanda</Button></div>
        <div className="doctor__image reveal"><span>AMAE</span><img src="/assets/dra-amanda-03.webp" alt="Dra. Amanda Pompeu" /></div>
      </section>

      <section className="clinic">
        <div className="clinic__image reveal"><img src="/assets/recepcao.webp" alt="Recepção da AMAE Clinic" /></div>
        <div className="clinic__copy reveal"><Eyebrow>AMAE Clinic</Eyebrow><h2>Uma experiência de cuidado,<br/><em>não um consultório.</em></h2><p>A AMAE é o ecossistema onde medicina metabólica, longevidade, estética médica e regeneração se encontram.</p><Button>Sobre a AMAE</Button></div>
      </section>

      <section className="utility section">
        <div className="section-heading reveal"><Eyebrow>Calcular IMC · 01</Eyebrow><h2>Informação também faz<br/><em>parte do cuidado.</em></h2></div>
        <form className="imc reveal" onSubmit={calcImc}><Eyebrow>Cálculo informativo</Eyebrow><h3>Descubra seu IMC.</h3><p>O IMC é apenas uma referência geral. A composição corporal e o contexto clínico precisam de avaliação médica.</p><div className="field-row"><label>Peso (kg)<input name="weight" placeholder="Ex.: 70" required /></label><label>Altura (m)<input name="height" placeholder="Ex.: 1,65 ou 165" required /></label></div><button className="button" type="submit">Calcular agora <ArrowRight size={16}/></button>{imc && <div className="imc-result">Seu IMC estimado é <strong>{imc}</strong></div>}</form>
      </section>

      <section className="faq section">
        <div className="section-heading reveal"><Eyebrow>Perguntas frequentes · 02</Eyebrow><h2>Respostas para começar<br/><em>com clareza.</em></h2></div>
        <div className="faq-list reveal">{faqs.map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setFaq(faq===i?-1:i)}><span>{q}</span><span>{faq===i?'−':'+'}</span></button>{faq===i && <p>{a}</p>}</div>)}</div>
      </section>

      <section className="contact" id="contato">
        <div className="contact__image"><img src="/assets/dra-amanda-01.webp" alt="Dra. Amanda Pompeu no consultório" /></div>
        <form className="contact__form reveal" onSubmit={contact}><Eyebrow>Inicie uma conversa</Eyebrow><h2>Como podemos<br/><em>cuidar de você?</em></h2><p>Preencha os dados e siga para o WhatsApp oficial da clínica para falar com a equipe.</p><label>Nome<input name="name" required /></label><label>WhatsApp<input name="phone" required /></label><label>Área de interesse<select name="interest" required><option value="">Selecione</option>{areas.map(([,t])=><option key={t}>{t}</option>)}</select></label><button className="button button--light" type="submit">Falar pelo WhatsApp <ArrowRight size={16}/></button><small>O agendamento depende da confirmação da equipe.</small></form>
      </section>

      <section className="instagram section">
        <div><Eyebrow>Instagram</Eyebrow><h2>Acompanhe a Dra. Amanda<br/><em>e a AMAE no Instagram.</em></h2></div>
        <div className="social-links"><a href="https://instagram.com/draamandapompeua"><Camera/> @draamandapompeua</a><a href="https://instagram.com/_amaeclinic"><Camera/> @_amaeclinic</a></div>
      </section>

      <section className="final-cta"><span>360°</span><h2>Um cuidado médico feito<br/><em>para o seu corpo inteiro.</em></h2><Button light>Iniciar meu acompanhamento</Button></section>
    </main>

    <footer><div><img src="/assets/amae-logo.png" alt="AMAE Clinic"/><p>Cuidado Médico 360°: medicina, metabolismo, longevidade e estética em um só acompanhamento.</p><p>Dra. Amanda Pompeu — CRM-SP 235383</p></div><div><h4>Navegação</h4><a href="#inicio">Início</a><a href="#dra-amanda">Dra. Amanda</a><a href="#amae">Sobre a AMAE</a><a href="#cuidados">Áreas de cuidado</a></div><div><h4>Atendimento</h4><p>Vila Olímpia — São Paulo</p><p>Tatuapé — São Paulo</p><a href="https://instagram.com/_amaeclinic">Instagram</a></div><div className="footer-bottom"><span>© 2026 AMAE Clinic. Todos os direitos reservados.</span><span>Conteúdo informativo. Não substitui consulta médica.</span></div></footer>
  </>;
}
