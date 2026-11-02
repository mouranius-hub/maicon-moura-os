# Maicon Moura — Portfólio Estilo Desktop OS

Portfólio interativo inspirado no estilo Desktop OS, construído em **HTML, CSS e JavaScript puro** (100% estático, zero dependências externas e pronto para publicação gratuita no **GitHub Pages**), reunindo todos os 21 projetos reais, textos e canais de contato de **Maicon Moura** (`www.maiconmoura.com`).

---

## Estrutura de Arquivos

- `index.html` — Estrutura principal da área de trabalho, dock inferior e janela estilo macOS.
- `404.html` — Página 404 personalizada para o GitHub Pages.
- `CNAME` — Domínio personalizado configurado (`www.maiconmoura.com`).
- `.nojekyll` — Garante que o GitHub Pages sirva todos os arquivos estáticos diretamente sem processamento Jekyll.
- `css/fonts.css` — Declarações locais das fontes (`Inter`, `Switzer` e `Fragment Mono`).
- `css/styles.css` — Estilos visuais, glassmorphism, animações e responsividade (Desktop, Tablet e Mobile).
- `js/data.js` — **Arquivo central de dados editáveis** (nome, bio, estatísticas, serviços, links do dock, papel de parede e todos os 21 projetos).
- `js/app.js` — Interatividade (arrastar ícones, pastas e janela, navegação entre abas, preview flutuante em Serviços, lightbox e rotas por hash `#sobre`, `#servicos`, `#galeria`, `#portfolio`, `#projeto/<slug>`).
- `assets/` — Fontes `.woff2` locais e todas as imagens em alta resolução:
  - `assets/images/wallpaper-maicon-studio.jpg` — Papel de parede widescreen do desktop com sua foto atual no estúdio (há também `wallpaper-studio.png` caso queira alternar).
  - `assets/images/maicon-about-photo.jpg` — Retrato editorial exibido na moldura da aba **Sobre** (a foto anterior também está guardada em `maicon-about-photo-classic.jpg`).
  - `assets/images/projects/<slug>/` — Capas (`cover.jpg`), ícones (`icon.jpg`) e galerias de cada um dos 21 projetos.

---

## Como Editar Textos, Fotos ou Adicionar Novos Projetos

Você **não precisa mexer no HTML ou CSS** para atualizar o portfólio — basta abrir `js/data.js` em qualquer editor de texto:

1. **Textos gerais, e-mail, telefone e redes sociais**:
   - Edite o bloco `siteConfig` no topo de `js/data.js`.
2. **Trocar foto de fundo ou foto da aba Sobre**:
   - Coloque a nova imagem dentro de `assets/images/` e atualize `siteConfig.wallpaper` ou `about.photo`.
3. **Editar a aba Sobre ou Serviços**:
   - Altere os blocos `about` e `services` em `js/data.js`.
4. **Adicionar ou reordenar projetos**:
   - Crie uma pasta em `assets/images/projects/nome-do-projeto/` com `icon.jpg`, `cover.jpg` e as imagens do case (`img-01.jpg`, `img-02.jpg`, etc.).
   - Adicione um novo objeto na lista `projects` em `js/data.js`.
   - Use `desktopSlot: 0` até `11` para escolher quais **12 projetos em destaque** aparecem como ícones arrastáveis na área de trabalho, ou `desktopSlot: null` para exibir o projeto na aba **Portfólio** dentro da janela.

---

## Como Testar Localmente no Mac

Abra o Terminal na pasta do projeto e rode:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080` no navegador.

---

## Como Publicar no GitHub Pages com Seu Domínio (`maiconmoura.com`)

1. Crie um repositório público no GitHub (por exemplo, `maiconmoura-portfolio`).
2. Na pasta deste projeto, envie os arquivos:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Portfólio Maicon Moura OS"
   git remote add origin https://github.com/SEU-USUARIO/maiconmoura-portfolio.git
   git push -u origin main
   ```
3. No GitHub, acesse **Settings → Pages**:
   - Em **Build and deployment → Source**, selecione **Deploy from a branch** → branch `main` / pasta `/ (root)` e clique em **Save**.
4. Para apontar seu domínio `maiconmoura.com` (atualmente no Squarespace Domains / Registro.br):
   - No painel de DNS do seu domínio, apague os registros antigos do Squarespace Website e configure:
     - **4 registros `A`** para `@` apontando para os IPs oficiais do GitHub Pages:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - **1 registro `CNAME`** para `www` apontando para `SEU-USUARIO.github.io`.
   - Em **Settings → Pages → Custom domain**, confirme `www.maiconmoura.com` e marque **Enforce HTTPS** assim que o certificado for emitido.
