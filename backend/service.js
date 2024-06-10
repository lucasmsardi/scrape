import { JSDOM } from 'jsdom';

// file com todas as funções de scrape que serão usadas no index.js
// todas as funções fazem scrape da primeira página a partir da palavra digitada

function scrapeTitles(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const alltitles = [];
  const elements = document.querySelectorAll(
    '[data-asin]'
  );
  elements.forEach((element) => {
    const titleRecipeElements =
      element.querySelectorAll(
        '[data-cy="title-recipe"]'
      );
    titleRecipeElements.forEach(
      (titleRecipeElement) => {
        const h2Element =
          titleRecipeElement.querySelector('h2');
        if (h2Element) {
          const spanElement =
            h2Element.querySelector('span');
          if (spanElement) {
            alltitles.push(
              spanElement.textContent
            );
          }
        }
      }
    );
  });
  return alltitles.filter(
    (item) => item != undefined
  );
}

function scrapeNumberReviews(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const allNumberReviews = [];
  const elements = document.querySelectorAll(
    '[data-asin]'
  );
  elements.forEach((element) => {
    const titleRecipeElements =
      element.querySelectorAll(
        '[data-cy="title-recipe"]'
      );
    titleRecipeElements.forEach(
      (titleRecipeElement) => {
        const h2Element =
          titleRecipeElement.nextSibling.firstChild.querySelectorAll(
            '[aria-label]'
          );
        allNumberReviews.push(
          h2Element[1]?.ariaLabel
        );
      }
    );
  });
  return allNumberReviews.filter(
    (item) => item != undefined
  );
}

function scrapeRatings(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const allRatings = [];
  const elements = document.querySelectorAll(
    '[data-asin]'
  );
  elements.forEach((element) => {
    const titleRecipeElements =
      element.querySelectorAll(
        '[data-cy="title-recipe"]'
      );
    titleRecipeElements.forEach(
      (titleRecipeElement) => {
        const h2Element =
          titleRecipeElement.nextSibling.querySelector(
            '[aria-label]'
          );
        allRatings.push(
          h2Element?.textContent.split(' ')[0]
        );
      }
    );
  });
  return allRatings.filter(
    (item) => item != undefined
  );
}

function scrapeImageURL(response) {
  const htmlContent = response.data;
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const allImageURLs = [];
  const elements = document.querySelectorAll(
    '[data-asin]'
  );
  elements.forEach((element) => {
    const titleRecipeElements = element
      .querySelectorAll(
        '[data-component-type="s-product-image"]'
      )[0]
      ?.querySelector('img').src;
    allImageURLs.push(titleRecipeElements);
  });
  return allImageURLs.filter(
    (item) => item !== undefined
  );
}

export {
  scrapeTitles,
  scrapeNumberReviews,
  scrapeRatings,
  scrapeImageURL,
};
