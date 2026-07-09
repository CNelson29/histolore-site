# Histolore — pasos para poner en vivo

Scaffold del tercer nicho (historia/explicativos). Sitio Astro clonado de
manhwadaily y rebrandeado. Estado: **listo localmente, `active: false`** en el
orquestador. Falta lo que requiere tus cuentas.

## Lo que ya está hecho
- Sitio Astro completo y rebrandeado (`sites/histolore/`), dominio placeholder `histolore.com`.
- 1 post semilla real (`why-the-roman-empire-fell.md`).
- `history_prompt()` en `agents/prompt_factory.py` (misma disciplina anti-fabricación).
- Rama `histolore` en `content_research.build_research_brief()`.
- Cola de 24 temas evergreen en `config/history_topics.yaml`.
- Proyecto `blog_history` registrado en `config/projects.yaml` con `active: false`.

## Pasos para activar (requieren tus cuentas)
1. **Dominio**: decidir el real (o quedarte con histolore.com). Si cambia, buscar/reemplazar
   `histolore.com` en `sites/histolore/` y `site_url` en projects.yaml.
2. **Repo GitHub**: crear `CNelson29/histolore-site` (o el nombre que elijas). Luego:
   ```
   cd sites/histolore
   git init && git add -A && git commit -m "init curious history"
   git remote add origin git@github.com:CNelson29/histolore-site.git   # SSH (key Ubuntu Incubadora)
   git push -u origin main
   ```
3. **Vercel**: importar el repo, framework Astro. Añadir el dominio.
4. **Agente**: crear `agents/history_agent.py` = clon de `blog_agent.py` con:
   - `SITE_DIR = .../sites/histolore`
   - topics desde `config/history_topics.yaml`
   - `from agents.prompt_factory import history_prompt` y `build_research_brief(site="histolore", ...)`
   (Alternativa más limpia: generalizar `blog_agent` para leer site/niche del project config.)
5. **Wiring en orquestador** (`agents/orchestrator.py`):
   - `PROJECTS["blog_history"] = {"name": "Histolore", "agent": "history_agent", "active": True}`
   - añadir `"blog_history": ["publish_post"]` a `content_tasks`
   - añadir a `report_labels` / `report_order`
6. En `projects.yaml` poner `active: true`.
7. Reiniciar: `systemctl --user restart incubadora-orch.service`

## Monetización
Display ads (AdSense/Ezoic) + afiliados de libros de historia (Amazon).
Nicho elegido por research Nexlev: faceless, evergreen, alto valor social,
canales comparables ~$6k/mo. Ver memoria `project_pipeline_fixes_nicho`.
