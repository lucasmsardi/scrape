document.addEventListener(
  'DOMContentLoaded',
  () => {
    const form = document.querySelector('.form');

    form.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        document.querySelector(
          '.all-titles'
        ).textContent = '';

        document.querySelector(
          '.all-number-ratings'
        ).textContent = '';

        document.querySelector(
          '.all-ratings'
        ).textContent = '';

        document.querySelector(
          '.all-image-urls'
        ).textContent = '';

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

            const titleContent =
              document.querySelector(
                '.all-titles'
              );
            data.titles.map((title) => {
              const titleParagraph =
                document.createElement('li');
              titleParagraph.textContent = title;
              titleContent.appendChild(
                titleParagraph
              );
            });

            const numberReviewsContent =
              document.querySelector(
                '.all-number-ratings'
              );
            data.numberReviews.map((number) => {
              const numberRatingsParagraph =
                document.createElement('li');
              numberRatingsParagraph.textContent =
                number;
              numberReviewsContent.appendChild(
                numberRatingsParagraph
              );
            });

            const ratingsContent =
              document.querySelector(
                '.all-ratings'
              );
            data.ratings.map((rating) => {
              const ratingsParagraph =
                document.createElement('li');
              ratingsParagraph.textContent =
                rating;

              ratingsContent.appendChild(
                ratingsParagraph
              );
            });

            const imageURLsContent =
              document.querySelector(
                '.all-image-urls'
              );
            data.imageURLs.map((imageURL) => {
              const imageURLsParagraph =
                document.createElement('li');
              imageURLsParagraph.textContent =
                imageURL;
              imageURLsContent.appendChild(
                imageURLsParagraph
              );
            });
            document.querySelector(
              '.box-footer'
            ).textContent = `Results from the first page of Amazon for: ${searchQuery}`;
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
