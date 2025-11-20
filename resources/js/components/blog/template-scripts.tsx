// resources/js/Components/TemplateScripts.tsx
import { useEffect } from 'react';

const scripts = [
    '/stories/assets/js/vendor/modernizr-3.6.0.min.js',
    '/stories/assets/js/vendor/jquery-3.6.0.min.js',
    '/stories/assets/js/vendor/popper.min.js',
    '/stories/assets/js/vendor/bootstrap.min.js',
    '/stories/assets/js/vendor/jquery.slicknav.js',
    '/stories/assets/js/vendor/slick.min.js',
    '/stories/assets/js/vendor/wow.min.js',
    '/stories/assets/js/vendor/jquery.ticker.js',
    '/stories/assets/js/vendor/jquery.vticker-min.js',
    '/stories/assets/js/vendor/jquery.scrollUp.min.js',
    '/stories/assets/js/vendor/jquery.nice-select.min.js',
    '/stories/assets/js/vendor/jquery.magnific-popup.js',
    '/stories/assets/js/vendor/jquery.sticky.js',
    '/stories/assets/js/vendor/perfect-scrollbar.js',
    '/stories/assets/js/vendor/waypoints.min.js',
    '/stories/assets/js/vendor/jquery.theia.sticky.js',
    '/stories/assets/js/main.js',
    '/override.js',
];

export default function TemplateScripts() {
    useEffect(() => {
        // Evita carregar múltiplas vezes
        if (window.templateScriptsLoaded) return;
        window.templateScriptsLoaded = true;

        scripts.forEach((src) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = false; // Importante: carregar na ordem
            document.body.appendChild(script);
        });

        // Limpeza opcional (não necessária aqui)
        return () => {
            window.templateScriptsLoaded = false;
        };
    }, []);

    return null;
}
