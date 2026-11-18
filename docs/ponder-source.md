# Ponder Source browser distribution

The fork's CI builds the checked-out revision and runs a production-browser Playwright baseline. It opens browse.html, fetches a public RDF profile from a separate local origin, verifies rendered content and reload persistence of the resource address.

This baseline does not certify private Pod login, authenticated editing or remote write persistence. Those remain required before deployment and launcher inclusion. Shared-data-module and rs.js migration are also pending; the pane stack still provides runtime RDF access.

The fork's workflow does not run upstream npm publication, release creation or dependency-mutating workflows. Distribution work must not accidentally publish the upstream mashlib package. Upstream attribution and licence are retained.
