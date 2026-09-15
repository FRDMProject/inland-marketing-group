# Content and routes

| Route                                                                | Purpose                                                            |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `/`                                                                  | Studio home, web-design focus, digital services, concepts, inquiry |
| `/web-design`                                                        | Main custom web-design page                                        |
| `/web-design/[city]`                                                 | Organic regional/city content                                      |
| `/lp/web-design/[city]`                                              | Paid variant: focused header, noindex, organic canonical           |
| `/services`                                                          | Service overview                                                   |
| `/services/local-seo`, `/services/google-ads`, `/services/ai-search` | Service scope and approach                                         |
| `/work`                                                              | Original concept design lab                                        |
| `/work/forma`, `/work/ridgeline`, `/work/good-kind`                  | Concept rationale and large preview                                |
| `/about`                                                             | Studio approach                                                    |
| `/service-areas`                                                     | Links to all seven city/region pages                               |
| `/contact`                                                           | Inquiry and FAQ                                                    |
| `/privacy`, `/terms`                                                 | Implemented feature explanations; business details pending         |
| `/api/leads`                                                         | POST server transport                                              |

Metadata assets: `/icon.svg`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`. Unknown slugs return 404. `/website-design`, `/privacy-policy` and `/terms-of-use` permanently redirect to current routes.

## Locations

`riverside`, `anaheim`, `inland-empire`, `pomona`, `corona`, `ontario`, `rancho-cucamonga`.

The Inland Empire is a region; Anaheim is Orange County; Pomona is Los Angeles County. Schema uses an administrative area for the region and City for individual cities. No branch office/address is asserted.

Each location has a distinct description, context, audience hypothesis, headline and website focus in `src/lib/content.ts`. Expand local proof and coverage information before indexing. Do not create large numbers of near-identical doorway pages.

## Metadata and copy rules

Each route has a title, description and canonical. Paid pages are always noindex and excluded from sitemaps. The preview globally remains noindex until the actual site URL and indexing flag are set. Web-design Service JSON-LD contains no invented ratings, addresses, prices or reviews.

Use Inland Digital Group in live copy. Keep concepts labeled, contacts conditional, and claims supportable. No guaranteed rankings, revenue, awards or turnaround. Privacy/terms describe the current feature set and need final operating-business identity, providers, retention and legal review before launch.
