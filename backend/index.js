import express from 'express';
import axios from 'axios';
import cors from 'cors';
import JSDOM from 'jsdom';

const app = express();
const port = 3000;
app.use(cors());

//.a-icon.a-star-small-4-5
//.a-icon.a-star-small-4
// .a-icon?

const keyword = req.query.query;

app.listen(port, () => {
  console.log(
    `Servidor rodando na porta ${port}.`
  );
});

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
      'Erro no scraping da página:',
      error.message
    );
  }
}

app.get('/api/scrape', async (req, res) => {
  console.log(`Buscando por: ${keyword}`);
  try {
    const response = await axios.get(
      `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`
    );
    const result = response.data;
    res.send(result);
  } catch (error) {
    console.error(
      'Erro ao fazer o request: ',
      error.message
    );
    res
      .status(500)
      .send('Erro interno do servidor.');
  }
});

const url = `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`;
scrapeRatings(url);
