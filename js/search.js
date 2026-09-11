(function () {
  'use strict';
  const input = document.querySelector('#search-page-input');
  const results = document.querySelector('#search-results');
  const summary = document.querySelector('#search-summary');
  if (!input || !results || !summary) return;

  const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-MX').trim();
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';
  input.value = query;

  function render(items, cleanQuery) {
    results.replaceChildren();
    if (!cleanQuery) {
      summary.textContent = 'Busca por nombre, zona, servicio o artículo.';
      return;
    }
    if (!items.length) {
      summary.textContent = `No encontramos resultados para “${query}”.`;
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      const text = document.createElement('p');
      text.textContent = 'Prueba con otra palabra o consulta el directorio.';
      const links = document.createElement('div');
      links.className = 'btn-row';
      const directory = document.createElement('a');
      directory.className = 'ed-btn ed-btn-primary';
      directory.href = '/directorio/';
      directory.textContent = 'Ver directorio';
      const register = document.createElement('a');
      register.className = 'ed-btn ed-btn-ghost';
      register.href = 'mailto:hola@barberia.mx?subject=Registro%20de%20barber%C3%ADa';
      register.textContent = 'Registrar barbería';
      links.append(directory, register);
      empty.append(text, links);
      results.append(empty);
      return;
    }
    summary.textContent = `${items.length} resultado${items.length === 1 ? '' : 's'}.`;
    const groups = new Map();
    items.forEach((item) => {
      if (!groups.has(item.type)) groups.set(item.type, []);
      groups.get(item.type).push(item);
    });
    groups.forEach((group, type) => {
      const section = document.createElement('section');
      section.className = 'result-group';
      const heading = document.createElement('h2');
      heading.textContent = type;
      section.append(heading);
      const grid = document.createElement('div');
      grid.className = 'results-grid';
      group.forEach((item) => {
        const card = item.url ? document.createElement('a') : document.createElement('div');
        card.className = 'result-card';
        if (item.url) card.href = item.url;
        const title = document.createElement('h3');
        title.textContent = item.title;
        const description = document.createElement('p');
        description.textContent = item.description;
        card.append(title, description);
        grid.append(card);
      });
      section.append(grid);
      results.append(section);
    });
  }

  fetch('/search-index.json', { cache: 'no-cache' })
    .then((response) => {
      if (!response.ok) throw new Error('No se pudo cargar el índice');
      return response.json();
    })
    .then((index) => {
      const cleanQuery = normalize(query);
      const tokens = cleanQuery.split(/\s+/).filter(Boolean);
      const matches = index.filter((item) => {
        const haystack = normalize([item.title, item.description, ...(item.terms || [])].join(' '));
        return tokens.every((token) => haystack.includes(token));
      });
      render(matches, cleanQuery);
    })
    .catch(() => { summary.textContent = 'No se pudo cargar la búsqueda. Consulta el directorio.'; });
})();
