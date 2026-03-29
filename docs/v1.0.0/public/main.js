export default {
  start: async () => {
    const response = await fetch('/versions.json');
    if (!response.ok) {
      console.warn('Could not load versions.json');
      return;
    }

    const versions = await response.json();

    const header =
      document.querySelector('.navbar-collapse');

    if (!header) {
      console.warn('Could not find navbar/header');
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'version-switcher';

    const select = document.createElement('select');
    select.id = 'version-switcher-select';
    select.setAttribute('aria-label', 'Documentation version');

    const currentPath = window.location.pathname;

    for (const version of versions) {
      const option = document.createElement('option');
      option.value = version.path;
      option.textContent = version.label;

      if (currentPath.startsWith(version.path)) {
        option.selected = true;
      }

      select.appendChild(option);
    }

    select.addEventListener('change', () => {
      window.location.href = select.value;
    });

    wrapper.appendChild(select);
    header.insertBefore(wrapper, header.firstChild);
  }
};