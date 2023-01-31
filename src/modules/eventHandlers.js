import { domElements } from './domElements';
import { getCityCoordinates } from './apiHandlers';

export const handleSearch = () => {
  domElements.searchBtn.onclick = () =>
    getCityCoordinates(domElements.cityInput.value);

  domElements.cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      domElements.searchBtn.click();
    }
  });
};
