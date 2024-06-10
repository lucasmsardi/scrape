document.addEventListener(
  'DOMContentLoaded',
  () => {
    const form = document.querySelector('.form');

    form.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();

        const searchInput =
          document.querySelector('.search');
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
            //ratings, titles

            const titleContent =
              document.querySelector(
                '.Box-Title'
              );
            //titleContent.innerHTML = '';
            data.titles.map((title) => {
              const titleParagraph =
                document.createElement('p');
              titleParagraph.textContent = title;
              titleContent.appendChild(
                titleParagraph
              );
            });

            const ratingsContent =
              document.querySelector(
                '.boxRatings'
              );
            ratingsContent.innerHTML = '';
            data.ratings.map((rating) => {
              const p =
                document.createElement('p');
              p.ratingsContent = rating;
              ratingsContent.appendChild(p);
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error('Busca vazia.');
        }
      }
    );
  }
);
