(() => {
  'use strict';

  const PAGE_SIZE = 24;
  const cards = [...document.querySelectorAll('[data-cdmx-card]')].filter((card) => card instanceof HTMLElement);
  const input = document.querySelector('[data-cdmx-search]');
  const clearButton = document.querySelector('[data-cdmx-clear]');
  const resetButtons = document.querySelectorAll('[data-cdmx-reset], [data-cdmx-empty-reset]');
  const boroughSelect = document.querySelector('[data-cdmx-borough]');
  const neighborhoodSelect = document.querySelector('[data-cdmx-neighborhood]');
  const serviceSelect = document.querySelector('[data-cdmx-service]');
  const hoursSelect = document.querySelector('[data-cdmx-hours]');
  const statusSelect = document.querySelector('[data-cdmx-status]');
  const count = document.querySelector('[data-cdmx-count]');
  const empty = document.querySelector('[data-cdmx-empty]');
  const previous = document.querySelector('[data-cdmx-prev]');
  const next = document.querySelector('[data-cdmx-next]');
  const pageLabel = document.querySelector('[data-cdmx-page]');
  const pagination = document.querySelector('.cdmx-pagination');
  const filterPanel = document.querySelector('[data-cdmx-filter-panel]');
  const filterToggle = document.querySelector('[data-cdmx-filter-toggle]');
  const filterClose = document.querySelector('[data-cdmx-filter-close]');

  if (!(input instanceof HTMLInputElement)
    || !(boroughSelect instanceof HTMLSelectElement)
    || !(neighborhoodSelect instanceof HTMLSelectElement)
    || !(serviceSelect instanceof HTMLSelectElement)
    || !(hoursSelect instanceof HTMLSelectElement)
    || !(statusSelect instanceof HTMLSelectElement)) return;

  const selects = [boroughSelect, neighborhoodSelect, serviceSelect, hoursSelect, statusSelect];
  const normalize = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-MX')
    .trim();
  const hasOption = (select, value) => [...select.options].some((option) => option.value === value);
  const parameters = new URLSearchParams(window.location.search);
  let currentPage = Math.max(1, Number.parseInt(parameters.get('pagina') ?? '1', 10) || 1);

  const restoreSelect = (select, parameter) => {
    const requested = parameters.get(parameter);
    if (requested && hasOption(select, requested)) select.value = requested;
  };

  input.value = parameters.get('q') ?? '';
  restoreSelect(boroughSelect, 'alcaldia');
  restoreSelect(neighborhoodSelect, 'colonia');
  restoreSelect(serviceSelect, 'servicio');
  restoreSelect(hoursSelect, 'horario');
  restoreSelect(statusSelect, 'estado');

  const updateUrl = () => {
    const nextParameters = new URLSearchParams();
    if (input.value.trim()) nextParameters.set('q', input.value.trim());
    if (boroughSelect.value !== 'all') nextParameters.set('alcaldia', boroughSelect.value);
    if (neighborhoodSelect.value !== 'all') nextParameters.set('colonia', neighborhoodSelect.value);
    if (serviceSelect.value !== 'all') nextParameters.set('servicio', serviceSelect.value);
    if (hoursSelect.value !== 'all') nextParameters.set('horario', hoursSelect.value);
    if (statusSelect.value !== 'all') nextParameters.set('estado', statusSelect.value);
    if (currentPage > 1) nextParameters.set('pagina', String(currentPage));
    const query = nextParameters.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  };

  const matchesFilters = (card, query) => {
    const services = card.dataset.services ?? '';
    const matchesQuery = !query || normalize(card.dataset.search ?? '').includes(query);
    const matchesBorough = boroughSelect.value === 'all' || card.dataset.borough === boroughSelect.value;
    const matchesNeighborhood = neighborhoodSelect.value === 'all' || card.dataset.neighborhood === neighborhoodSelect.value;
    const matchesService = serviceSelect.value === 'all' || services.includes(`|${serviceSelect.value}|`);
    const matchesHours = hoursSelect.value === 'all'
      || (hoursSelect.value === 'published' && card.dataset.hasHours === 'true')
      || (hoursSelect.value === 'missing' && card.dataset.hasHours === 'false');
    const matchesStatus = statusSelect.value === 'all' || card.dataset.status === statusSelect.value;
    return matchesQuery && matchesBorough && matchesNeighborhood && matchesService && matchesHours && matchesStatus;
  };

  const update = ({ resetPage = false } = {}) => {
    if (resetPage) currentPage = 1;
    const query = normalize(input.value);
    const matches = cards.filter((card) => matchesFilters(card, query));
    const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageCards = new Set(matches.slice(start, start + PAGE_SIZE));

    for (const card of cards) card.hidden = !pageCards.has(card);

    const visibleEnd = matches.length === 0 ? 0 : Math.min(start + PAGE_SIZE, matches.length);
    if (count) count.textContent = matches.length === 0
      ? 'No hay fichas para mostrar'
      : `Mostrando ${start + 1}–${visibleEnd} de ${matches.length} fichas`;
    if (empty instanceof HTMLElement) empty.hidden = matches.length !== 0;
    if (pagination instanceof HTMLElement) pagination.hidden = matches.length === 0;
    if (pageLabel) pageLabel.textContent = `${currentPage} de ${totalPages}`;
    if (previous instanceof HTMLButtonElement) previous.disabled = currentPage <= 1;
    if (next instanceof HTMLButtonElement) next.disabled = currentPage >= totalPages;
    updateUrl();
  };

  const reset = () => {
    input.value = '';
    for (const select of selects) select.value = 'all';
    currentPage = 1;
    update();
    input.focus();
  };

  const closeFilters = () => {
    if (!(filterPanel instanceof HTMLElement) || !(filterToggle instanceof HTMLButtonElement)) return;
    filterPanel.classList.remove('is-open');
    filterToggle.setAttribute('aria-expanded', 'false');
    filterToggle.focus();
  };

  input.addEventListener('input', () => update({ resetPage: true }));
  clearButton?.addEventListener('click', () => {
    input.value = '';
    update({ resetPage: true });
    input.focus();
  });
  for (const select of selects) select.addEventListener('change', () => update({ resetPage: true }));
  for (const button of resetButtons) button.addEventListener('click', reset);
  previous?.addEventListener('click', () => {
    currentPage = Math.max(1, currentPage - 1);
    update();
    document.querySelector('[data-cdmx-grid]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  next?.addEventListener('click', () => {
    currentPage += 1;
    update();
    document.querySelector('[data-cdmx-grid]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  filterToggle?.addEventListener('click', () => {
    if (!(filterPanel instanceof HTMLElement) || !(filterToggle instanceof HTMLButtonElement)) return;
    const open = !filterPanel.classList.contains('is-open');
    filterPanel.classList.toggle('is-open', open);
    filterToggle.setAttribute('aria-expanded', String(open));
    if (open) boroughSelect.focus();
  });
  filterClose?.addEventListener('click', closeFilters);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && filterPanel instanceof HTMLElement && filterPanel.classList.contains('is-open')) closeFilters();
  });

  update();
})();
