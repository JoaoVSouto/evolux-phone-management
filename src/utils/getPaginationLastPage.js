export default function getPaginationLastPage(rawHeader) {
  const pages = rawHeader.split(', ');
  const lastPage = pages.find(page => page.includes('last'));
  const [lastPageLink] = lastPage.split(';');
  const lastPageWithoutAngleBrackets = lastPageLink.slice(
    1,
    lastPageLink.length - 1
  );
  const page = new URL(lastPageWithoutAngleBrackets).searchParams.get('_page');

  return Number(page);
}
