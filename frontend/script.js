document.addEventListener(
  'DOMContentLoaded',
  () => {
    const form = document.querySelector('.form');

    form.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();

        const searchInput =
          document.querySelector('.item');
        const searchQuery =
          searchInput.value.trim();

        if (searchQuery) {
          try {
            const url = `http://localhost:3000/api/scrape?query=${searchQuery}`;
            const response = await fetch(url, {
              method: 'GET',
            });

            if (!response.ok) {
              throw new Error(
                `HTTP error! status: ${response.status}`
              );
            }

            const data = await response.json();
            console.log(data);
          } catch (err) {
            console.error(err);
          }
        } else {
          console.error('Busca vazia.');
        }
      }
    );
  }
);
