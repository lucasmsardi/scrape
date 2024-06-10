import { JSDOM } from 'jsdom';

// file com todas as funções de scrape que serão usadas no index.js
// todas as funções fazem scrape da primeira página a partir da palavra digitada

//product title, ratings, number of reviews, product image URL
//.a-icon.a-star-small-4-5
//.a-icon.a-star-small-4
// .a-icon?
// .a-icon-star-small

//titles = a-size-base-plus

function scrapeTitles(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const titleElements = document
    .querySelector(
      '[data-component-type="s-search-results"]'
    )
    .querySelectorAll(
      '[data-asin]:not(.AdHolder):not(.a-section):not(.sg-col-20-of-24)'
    );

  const titles = Array.from(titleElements)
    .map((element) => {
      const titleElement = element.querySelector(
        '.a-size-base-plus'
      );
      return titleElement
        ? titleElement.textContent
        : null;
    })
    .filter((title) => title !== null);

  return titles;
}

function scrapeNumberReviews(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const titleElements = document
    .querySelector(
      '[data-component-type="s-search-results"]'
    )
    .querySelectorAll('.a-icon-star-small');
}

function scrapeRatings(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const ratingElements = Array.from(
    document
      .querySelector(
        '[data-component-type="s-search-results"]'
      )
      .querySelectorAll(
        '[data-asin]:not(.AdHolder):not(.a-section):not(.sg-col-20-of-24)'
      )
  )
    .map(
      (item) =>
        item.querySelector('.a-icon-star-small')
          ?.textContent
    )
    .filter((item) => item !== undefined);

  const numericRatings = ratingElements.map(
    (rating) => {
      const match = rating.match(
        /^(\d+\.\d+) out of 5 stars$/
      );
      return match ? match[1] : null;
    }
  );

  return numericRatings.filter(
    (rating) => rating !== null
  );
}

function scrapeImageURL(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
}

export {
  scrapeTitles,
  scrapeNumberReviews,
  scrapeRatings,
  scrapeImageURL,
};
