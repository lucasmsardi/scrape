import JSDOM from 'jsdom';
import axios from 'axios';

async function scrapeTitles(url) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    const dom = new JSDOM(htmlContent);
  } catch (error) {
    console.error(
      'Erro no scraping de títulos da página:',
      error.message
    );
  }
}

async function scrapeNumberReviews(url) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    const dom = new JSDOM(htmlContent);
  } catch (error) {
    console.error(
      'Erro no scraping de número de reviews página:',
      error.message
    );
  }
}

async function scrapeRatings(url) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    const dom = new JSDOM(htmlContent);

    const ratings = Array.from(
      ratingElements
    ).map((element) => {
      const ratingClass = element.className.match(
        /star-rating-(\d+)/
      );
      return ratingClass
        ? parseInt(ratingClass[1], 10)
        : null;
    });
    console.log(
      ratings.filter((rating) => rating !== null)
    );
  } catch (error) {
    console.error(
      'Erro durante o scraping de ratings da página:',
      error.message
    );
  }
}

async function scrapeImageURL(url) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;

    const dom = new JSDOM(htmlContent);
  } catch (error) {
    console.error(
      'Erro no scraping da URL da imagem da página:',
      error.message
    );
  }
}

export {
  scrapeTitles,
  scrapeNumberReviews,
  scrapeRatings,
  scrapeImageURL,
};
