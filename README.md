# BONSAY

Landing page corporativa estática, bilingüe y adaptable. La información principal, los clientes y
el contacto se presentan en una sola pantalla, sin desplazamiento vertical.

## Abrir la página

Puedes abrir `index.html` directamente. Para probar la página desde un servidor local, abre una
terminal en esta carpeta y ejecuta:

```bash
python3 -m http.server 8000
```

Después visita [http://localhost:8000](http://localhost:8000) en el navegador.

## Editar la página

- `index.html`: mensaje principal, servicios, clientes, enlaces y correo de contacto.
- `assets/css/styles.css`: composición de una pantalla, tipografía, colores y adaptación móvil.
- `assets/fonts/`: tipografías de marca alojadas en el proyecto (no requieren internet).
- `assets/js/main.js`: selector de idioma y año automático.
- `assets/js/translations.js`: respaldo de traducciones para la apertura directa con `file://`.
- `assets/images/logsinFondo.png`: logotipo horizontal principal.
- `assets/images/logoB-sinfondo.png`: isotipo para favicon y usos compactos.
- `assets/translations/es.json`: textos en español.
- `assets/translations/en.json`: textos en inglés.

## Sistema tipográfico

La página sigue el Brand Book 2026:

- **Space Grotesk** (`--font-display`): titulares, navegación e interfaz de producto.
- **Inter** (`--font-body`): párrafos, documentación y textos de interfaz.
- **Bonsay Black** (`#0A0A0B`), **Cloud** (`#F7F7F5`) y **Graphite** (`#2B2E33`): base visual.
- **Bonsay Mint** (`#56C9A8`): se utiliza únicamente como color de señal y acento.

La escala (`--fs-*`), el interletraje (`--track-*`) y la tinta (`--ink`, `--ink-body`,
`--ink-mute`) están definidos como variables al inicio de `styles.css`.

La página empieza en español. El idioma elegido se guarda en el navegador para futuras visitas.
No requiere instalación ni dependencias.
