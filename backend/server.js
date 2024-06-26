import express from 'express';
import axios from 'axios';
import cors from 'cors';
import {
  scrapeTitles,
  scrapeNumberReviews,
  scrapeRatings,
  scrapeImageURL,
} from './service.js';

const app = express();
const port = 3000;
app.use(cors());

// pegando dinamicamente as palavras buscadas e montando na url

app.listen(port, () => {
  console.log(
    `Servidor rodando na porta ${port}.`
  );
});

app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.query;
  const url = `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`;
  console.log(url);

  if (!keyword) {
    res.status(400).send('Digite alguma palavra');
  }
  console.log(`Buscando por: ${keyword}`);

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });
    const data = {
      titles: scrapeTitles(response),
      numberReviews:
        scrapeNumberReviews(response),
      ratings: scrapeRatings(response),
      imageURLs: scrapeImageURL(response),
    };
    res.json(data);
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
