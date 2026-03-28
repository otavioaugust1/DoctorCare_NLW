// ============================================================
// DOCTORCARE — SCRIPTS PRINCIPAIS
// NLW (Next Level Week) - Rocketseat
// ============================================================
// Contém toda a lógica de interatividade da landing page:
//   • Navbar com mudança de estilo ao rolar
//   • Menu mobile (hamburguer) com toggle
//   • Smooth scroll nos links internos
//   • Animações com ScrollReveal.js
// ============================================================

// ======================== INICIALIZAÇÃO ========================
// Aguarda o DOM carregar completamente antes de iniciar
document.addEventListener('DOMContentLoaded', function () {
    initApp()
})

function initApp() {
    setupNavScroll()    // Troca cor da navbar ao rolar
    setupMobileMenu()   // Lógica do menu hamburguer
    setupSmoothScroll() // Smooth scroll para âncoras
    setupScrollReveal() // Animações de entrada dos elementos
}

// ======================== NAVBAR SCROLL ========================
// Adiciona/remove a classe "rolagem" na navbar conforme o scroll
function setupNavScroll() {
    const navbar = document.getElementById('navegacao')
    if (!navbar) return

    // Executa imediatamente para definir estado inicial
    updateNavbar(navbar)

    // Escuta evento de scroll com passive:true para melhor performance
    window.addEventListener('scroll', function () {
        updateNavbar(navbar)
    }, { passive: true })
}

// Aplica ou remove a classe "rolagem" com base na posição do scroll
function updateNavbar(navbar) {
    if (window.scrollY > 0) {
        navbar.classList.add('rolagem')
    } else {
        navbar.classList.remove('rolagem')
    }
}

// ======================== MENU MOBILE ========================
// Configura o botão hamburguer para abrir/fechar o menu mobile
function setupMobileMenu() {
    const toggle  = document.getElementById('menu-toggle')
    const menu    = document.getElementById('menu-mobile')
    if (!toggle || !menu) return

    // Alterna visibilidade ao clicar no hamburguer
    toggle.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('active')

        // Atualiza atributos de acessibilidade
        toggle.setAttribute('aria-expanded', String(isOpen))
        menu.setAttribute('aria-hidden', String(!isOpen))
    })

    // Fecha o menu ao clicar em qualquer link dentro dele
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu)
    })
}

// Fecha o menu mobile — também chamado via onclick inline no HTML
function closeMenu() {
    const toggle = document.getElementById('menu-toggle')
    const menu   = document.getElementById('menu-mobile')
    if (!menu) return

    menu.classList.remove('active')
    if (toggle) toggle.setAttribute('aria-expanded', 'false')
    menu.setAttribute('aria-hidden', 'true')
}

// ======================== SMOOTH SCROLL ========================
// Intercepta cliques em links âncora (#seção) e aplica scroll suave
function setupSmoothScroll() {
    // Seleciona todos os links que apontam para uma âncora interna
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const href   = this.getAttribute('href')
            // Ignora links vazios ou apenas "#"
            if (!href || href === '#') return

            const target = document.querySelector(href)
            if (!target) return

            event.preventDefault()

            // Fecha o menu mobile caso esteja aberto
            closeMenu()

            // Calcula offset para não esconder conteúdo atrás da navbar
            const navHeight = parseFloat(
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--nav-height')
            ) * 10 // converte rem → px (base 62.5% = 1rem = 10px)

            const targetTop = target.getBoundingClientRect().top
                + window.scrollY
                - navHeight

            window.scrollTo({ top: targetTop, behavior: 'smooth' })
        })
    })
}

// ======================== SCROLL REVEAL ========================
// Configura animações de entrada usando a biblioteca ScrollReveal.js
function setupScrollReveal() {
    // Verifica se a biblioteca foi carregada pelo CDN
    if (typeof ScrollReveal === 'undefined') {
        console.warn('[DoctorCare] ScrollReveal não carregado. Animações desativadas.')
        return
    }

    // Instância com configurações padrão compartilhadas
    const sr = ScrollReveal({
        origin:   'top',      // Elementos entram de cima
        distance: '30px',     // Percurso da animação
        duration: 700,        // Duração em ms
        easing:   'ease',
        reset:    false       // Não repete ao sair da tela
    })

    // ---- Hero ----
    // Subtítulo, título e parágrafo aparecem em sequência com delay crescente
    sr.reveal('.texto-hero .subtitulo', { delay: 100 })
    sr.reveal('.texto-hero h1',          { delay: 200 })
    sr.reveal('.texto-hero p',           { delay: 300 })
    sr.reveal('.texto-hero .btn-primary',{ delay: 400 })

    // Foto entra da direita com delay maior
    sr.reveal('.foto-hero', { origin: 'right', delay: 400, distance: '60px' })

    // Caixas de estatísticas entram de baixo
    sr.reveal('.stat-item', { origin: 'bottom', delay: 100, interval: 150 })

    // ---- Sobre ----
    sr.reveal('.sobre-imagem', { origin: 'left',  delay: 200 })
    sr.reveal('.sobre-texto',  { origin: 'right', delay: 300 })

    // ---- Serviços ----
    sr.reveal('.section-header', { delay: 100 })
    // interval faz cada card aparecer 150ms após o anterior
    sr.reveal('.servico-card',   { origin: 'bottom', delay: 100, interval: 150 })

    // ---- Depoimentos ----
    sr.reveal('.depoimento-card', { origin: 'bottom', delay: 100, interval: 150 })

    // ---- Agendar (CTA) ----
    sr.reveal('.agendar-texto', { origin: 'left',  delay: 200 })
    sr.reveal('.agendar .btn-primary', { origin: 'right', delay: 300 })
}

// ======================== CONSOLE INFO ========================
// Mensagem de boas-vindas no DevTools durante desenvolvimento
console.log(
    '%cDoctorCare 🩺',
    'color:#00856F; font-size:18px; font-weight:bold;'
)
console.log(
    '%cNLW — Rocketseat | HTML · CSS · JavaScript',
    'color:#00856F; font-size:12px;'
)
