(function() {
    'use strict';

    function injectFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(link);
        }
    }

    function injectNeko() {
        if (!document.getElementById('oneko-script')) {
            const script = document.createElement('script');
            script.id = 'oneko-script';
            script.src = 'https://cdn.jsdelivr.net/gh/adryd325/oneko.js/oneko.js';
            document.body.appendChild(script);
        }
    }

    function coletarLinks() {
        const links = [];
        document.querySelectorAll('a').forEach(link => {
            const href = link.href || '';
            if (href.includes('magnet:')) {
                links.push({ url: href, texto: 'TORRENT / MAGNET' });
            }
        });
        return links.length > 0 ? [links[0]] : [];
    }

    function criarPopup(links) {
        const antigo = document.getElementById('meu-popup-download');
        if (antigo) antigo.remove();

        const overlay = document.createElement('div');
        overlay.id = 'meu-popup-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.85);z-index:999998;backdrop-filter:blur(4px);';

        const popup = document.createElement('div');
        popup.id = 'meu-popup-download';
        popup.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);background:#fff;color:#000;padding:35px 30px;border:4px solid #000;box-shadow:12px 12px 0px #000;z-index:999999;max-width:500px;width:90%;font-family:"Courier New", Courier, monospace, sans-serif;display:flex;flex-direction:column;align-items:center;animation: popIn 0.2s ease-out;';

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes popIn { 0% { transform: translate(-50%, -45%); opacity: 0; } 100% { transform: translate(-50%, -50%); opacity: 1; } }
            .neo-btn { background: #fff; color: #000; border: 3px solid #000; box-shadow: 6px 6px 0px #000; padding: 14px 20px; font-weight: 900; cursor: pointer; transition: all 0.1s linear; text-decoration: none; text-align: center; display: block; font-family: inherit; font-size: 16px; margin-bottom: 16px; text-transform: uppercase; width: 100%; box-sizing: border-box; }
            .neo-btn:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0px #000; }
            .neo-btn:active { transform: translate(6px, 6px); box-shadow: 0px 0px 0px #000; }
            .neo-invert { background: #000; color: #fff; }
            .neo-invert:hover { background: #fff; color: #000; }
        `;
        document.head.appendChild(style);

        const logo = document.createElement('img');
        logo.src = 'https://media.discordapp.net/attachments/1191828476186071171/1478470236075462797/3dgifmaker69857.gif?ex=69a88434&is=69a732b4&hm=9641c64e2c4d6ab403035ec1eeac0168a0757649e90289fd03c84abb075bd1c5&=&width=270&height=270';
        logo.style.cssText = 'width:90px;height:90px;margin-bottom:25px;';
        popup.appendChild(logo);

        const titulo = document.createElement('h2');
        titulo.innerHTML = '<i class="fas fa-arrow-down"></i> LINK DISPONÍVEL';
        titulo.style.cssText = 'margin:0 0 20px 0;font-size:26px;font-weight:900;letter-spacing:1px;text-align:center;border-bottom:4px solid #000;padding-bottom:15px;width:100%;';
        popup.appendChild(titulo);

        const lista = document.createElement('div');
        lista.style.cssText = 'display:flex;flex-direction:column;width:100%;margin-bottom:25px;';

        if (links.length === 0) {
            const msg = document.createElement('div');
            msg.style.cssText = 'text-align:center;padding:25px;font-weight:900;font-size:18px;border:3px dashed #000;';
            msg.innerHTML = '<i class="fas fa-ghost"></i><br><br>NENHUM MAGNET ENCONTRADO.';
            lista.appendChild(msg);
        } else {
            links.forEach(link => {
                const botao = document.createElement('a');
                botao.href = link.url;
                botao.className = 'neo-btn';
                botao.innerHTML = `<i class="fas fa-magnet"></i> ${link.texto}`;
                lista.appendChild(botao);
            });
        }
        popup.appendChild(lista);

        const containerBotoes = document.createElement('div');
        containerBotoes.style.cssText = 'display:flex;gap:15px;width:100%;';

        const btnGithub = document.createElement('a');
        btnGithub.href = 'https://github.com/RomanticMuffy';
        btnGithub.target = '_blank';
        btnGithub.className = 'neo-btn neo-invert';
        btnGithub.style.cssText = 'flex:1;margin-bottom:0;display:flex;justify-content:center;align-items:center;gap:10px;';
        btnGithub.innerHTML = '<i class="fab fa-github fa-lg"></i> CRIADOR';
        containerBotoes.appendChild(btnGithub);

        const btnFechar = document.createElement('button');
        btnFechar.className = 'neo-btn';
        btnFechar.style.cssText = 'flex:1;margin-bottom:0;display:flex;justify-content:center;align-items:center;gap:10px;';
        btnFechar.innerHTML = '<i class="fas fa-times fa-lg"></i> FECHAR';
        btnFechar.onclick = () => { popup.remove(); overlay.remove(); style.remove(); };
        containerBotoes.appendChild(btnFechar);

        popup.appendChild(containerBotoes);
        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        overlay.addEventListener('click', () => { popup.remove(); overlay.remove(); style.remove(); });
    }

    injectFontAwesome();
    injectNeko();

    const btnMain = document.createElement('button');
    btnMain.innerHTML = '<i class="fas fa-bolt"></i> MENU';
    btnMain.style.cssText = 'position:fixed;bottom:30px;right:30px;z-index:999997;background:#fff;color:#000;border:4px solid #000;box-shadow:8px 8px 0px #000;padding:16px 28px;font-size:22px;font-weight:900;cursor:pointer;transition:all 0.1s linear;font-family:"Courier New", Courier, monospace;text-transform:uppercase;';

    btnMain.addEventListener('mouseenter', () => {
        btnMain.style.transform = 'translate(-2px, -2px)';
        btnMain.style.boxShadow = '10px 10px 0px #000';
    });
    btnMain.addEventListener('mouseleave', () => {
        btnMain.style.transform = 'translate(0, 0)';
        btnMain.style.boxShadow = '8px 8px 0px #000';
    });
    btnMain.addEventListener('mousedown', () => {
        btnMain.style.transform = 'translate(8px, 8px)';
        btnMain.style.boxShadow = '0px 0px 0px #000';
    });
    btnMain.addEventListener('mouseup', () => {
        btnMain.style.transform = 'translate(-2px, -2px)';
        btnMain.style.boxShadow = '10px 10px 0px #000';
    });

    btnMain.addEventListener('click', () => criarPopup(coletarLinks()));

    document.body.appendChild(btnMain);
})();