# BizDirectory PWA

## Project Overview

**BizDirectory --- Company Hub** is a Progressive Web App (PWA) designed
to provide a modern, responsive company directory powered by Google
Sheets.

The application allows users to browse company information through
searchable and filterable cards, read integrated blog articles, view
detailed company information, and use the application in an
offline-capable environment.

The project is built with **HTML5, CSS3, and Vanilla JavaScript**
without external JavaScript frameworks. It combines Google Sheets CSV
data integration with browser PWA capabilities such as a Web App
Manifest, Service Worker, caching strategies, background
synchronization, install prompts, and online/offline status detection.

## 🔗 [Online Version](https://progressive-web-app-company.vercel.app)

## Main Features

-   **Google Sheets Integration** Loads company data from a public
    Google Sheets CSV export and converts the spreadsheet rows into
    company directory entries.

-   **Company Directory** Displays companies in a structured card-based
    interface containing company name, category, tagline, description,
    location, website, email, employee count, and founding year.

-   **Real-Time Search** Allows users to search company data
    dynamically.

-   **Category Filtering** Generates category filter chips from the
    loaded company data so users can quickly narrow the directory.

-   **Grid & List View** Provides two display modes for the company
    directory: grid view and list view.

-   **Company Detail Modal** Opens a detailed modal containing
    additional company information and a link to the company's website.

-   **Integrated Blog** Displays article previews from blog data and
    provides a modal reader for complete article content.

-   **Demo / Fallback Data** Includes built-in demo company and blog
    data so the application can still be explored when no Google Sheet
    is connected or when external data cannot be loaded.

-   **Persistent Google Sheets URL** Stores the configured Google Sheets
    URL in `localStorage`, allowing the application to restore the
    connection when the user returns.

-   **Refresh & Background Sync** Provides manual refresh functionality
    and registers Background Sync when browser support is available.

-   **Progressive Web App** Includes a Service Worker and Web App
    Manifest to support installation and offline functionality.

-   **Offline Support** Uses multiple caching strategies for application
    resources, Google Sheets requests, Google Fonts, and images.

-   **Install Prompt** Detects the browser's PWA installation prompt and
    provides an install button when available.

-   **Online / Offline Detection** Displays the current network status
    and informs users when cached data is being used.

-   **Push Notification Support** The Service Worker includes handlers
    for push notifications and notification clicks.

-   **Responsive Navigation** Provides desktop navigation and a mobile
    hamburger menu.

-   **Accessibility Considerations** Uses semantic elements, ARIA
    attributes, live regions, keyboard-oriented controls, and
    descriptive labels in important interactive components.

## Technologies Used

-   **HTML5** --- Semantic structure and application markup
-   **CSS3** --- Styling, responsive design, animations, CSS custom
    properties, Grid, and Flexbox
-   **Vanilla JavaScript** --- Application logic and DOM interaction
-   **Web App Manifest** --- PWA metadata and installation configuration
-   **Service Worker API** --- Caching, offline support, background
    sync, and push notification handling
-   **LocalStorage API** --- Persistent Google Sheets configuration
-   **Google Sheets CSV Export** --- External data source
-   **Google Fonts** --- Cormorant Garamond, DM Sans, and Space Mono

## Project Structure

``` text
progressive-web-app-company/
├── index.html
├── site.webmanifest
├── sw.js
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

> **Note:** The current project contains `site.webmanifest`. The HTML
> currently references `manifest.json`, so the manifest link should be
> updated to `site.webmanifest` if the PWA manifest is not being served
> through another route.

## Application Sections

### 1. Navigation

The fixed navigation bar provides access to the main application areas:

-   Directory
-   Blog
-   Settings

The navigation uses a glassmorphism-style background with backdrop blur
and adapts to smaller screens through a hamburger menu.

### 2. Hero Section

The hero section introduces BizDirectory as a company directory powered
by Google Sheets.

It includes:

-   Application title
-   Short project description
-   Call-to-action button
-   Company statistics
-   Category statistics
-   Blog post statistics

### 3. Settings

The Settings section allows users to provide a public Google Sheets URL.

The entered URL is saved to `localStorage` so that the application can
automatically restore the configured data source on the next visit.

The application accepts Google Sheets URLs and transforms standard
spreadsheet URLs into CSV export URLs when necessary.

### 4. Company Directory

The Directory section is the core feature of the application.

Each company can contain:

-   Company name
-   Category
-   Tagline
-   Description
-   Location
-   Website
-   Logo
-   Email
-   Number of employees
-   Founding year

Users can search companies, filter by category, switch between grid/list
layouts, and open a company detail modal.

### 5. Blog

The Blog section displays article cards containing:

-   Article title
-   Tag
-   Author
-   Date
-   Excerpt
-   Optional image

Selecting an article opens a modal reader containing the full article
content and an estimated reading time.

### 6. Company Detail Modal

The company modal provides a more detailed view of a selected company.

The modal includes:

-   Company logo
-   Company name
-   Category
-   Description
-   Location
-   Employee count
-   Founding year
-   Email
-   Website link

### 7. Blog Reader Modal

The blog modal presents the complete article in a focused reading
interface.

The reading time is calculated from the article word count using an
estimated rate of approximately 200 words per minute.

### 8. Application Status Bar

The bottom status area displays:

-   Online/offline state
-   Last update information
-   PWA/application status

This provides users with feedback about the current data and network
state.

## Google Sheets Data Structure

The company directory expects a spreadsheet with columns such as:

  Column        Description
  ------------- -----------------------
  `nama`        Company name
  `kategori`    Company category
  `tagline`     Short company tagline
  `deskripsi`   Company description
  `lokasi`      Company location
  `website`     Company website
  `logo`        Logo/image URL
  `email`       Contact email
  `karyawan`    Number of employees
  `tahun`       Founding year

The application also supports several alternative column names through
its normalization logic, such as `name`, `company`, `category`,
`location`, `url`, `employees`, and `founded`.

## Blog Data Structure

Blog data can use the following fields:

  Column      Description
  ----------- -----------------------
  `judul`     Article title
  `tag`       Article category/tag
  `penulis`   Author
  `tanggal`   Publication date
  `excerpt`   Short article summary
  `konten`    Full article content
  `gambar`    Article image URL

## Connecting Google Sheets

### 1. Prepare the Spreadsheet

Create a Google Sheet containing the company directory data using the
expected column structure.

For example:

``` text
nama | kategori | tagline | deskripsi | lokasi | website | logo | email | karyawan | tahun
```

### 2. Make the Sheet Public

The spreadsheet must be accessible publicly so that the browser can
request its CSV export.

### 3. Get the Google Sheets URL

A standard spreadsheet URL can be used, for example:

``` text
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
```

The application automatically converts a supported Google Sheets URL
into a CSV export endpoint.

A direct CSV endpoint can also be used:

``` text
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv
```

For a specific sheet:

``` text
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID
```

### 4. Load the Data

1.  Open BizDirectory.
2.  Navigate to **Settings**.
3.  Enter the Google Sheets URL.
4.  Click **Load Data**.
5.  The directory will retrieve and render the spreadsheet data.

## PWA Architecture

The project uses several browser APIs to provide Progressive Web App
functionality.

### Web App Manifest

`site.webmanifest` defines:

-   Application name
-   Short name
-   Description
-   Start URL
-   Standalone display mode
-   Theme color
-   Background color
-   Orientation
-   Application scope
-   Icons
-   PWA shortcuts
-   Application categories

### Service Worker

`sw.js` manages:

-   Static asset caching
-   Dynamic caching
-   Offline fallback
-   Google Sheets network requests
-   Google Fonts caching
-   Image caching
-   Background synchronization
-   Push notifications
-   Notification click handling

## Caching Strategies

The Service Worker uses different strategies depending on the resource
type.

### Network First

Used for Google Sheets-related requests.

The application attempts to retrieve the newest data from the network
first and falls back to cached data when the network is unavailable.

### Cache First

Used for general application resources and Google Fonts.

Cached resources are returned immediately when available, reducing
network requests.

### Stale While Revalidate

Used for images.

The cached image can be displayed immediately while a newer version is
requested in the background.

## Responsive Design

The interface is designed with a mobile-first approach and adapts to
different viewport sizes.

Responsive behavior includes:

-   Desktop navigation
-   Mobile hamburger navigation
-   Responsive company cards
-   Responsive blog cards
-   Adaptive controls
-   Flexible directory layouts
-   Touch-friendly interaction
-   Responsive modal interfaces

## Visual Design

The application uses a premium dark editorial-inspired design.

### Main Color Palette

``` css
:root {
  --bg-base: #0a0f1e;
  --bg-surface: #111827;
  --bg-elevated: #1a2235;

  --gold: #c9a84c;
  --gold-light: #e8c97a;

  --teal: #2dd4c0;

  --text-primary: #f0ece4;
  --text-secondary: #8b9ab0;
  --text-muted: #4a5568;
}
```

### Typography

The project uses three Google Fonts:

-   **Cormorant Garamond** --- Display and editorial typography
-   **DM Sans** --- Primary interface/body typography
-   **Space Mono** --- Monospace and technical accents

## Accessibility

Several accessibility practices are implemented throughout the
application:

-   Semantic HTML elements
-   ARIA labels
-   ARIA live regions
-   `aria-current` for active navigation
-   `aria-expanded` for mobile navigation
-   `aria-pressed` for view controls
-   Dialog roles for modals
-   Descriptive button labels
-   Keyboard-focusable interactive cards
-   Lazy-loaded images
-   Reduced reliance on color alone for interaction states

Further accessibility testing with Lighthouse, keyboard navigation, and
screen readers is recommended for production use.

## How to Run

Because the project uses Service Worker functionality, it should be
served through a web server rather than opened directly using `file://`.

### Option 1 --- Local Development Server

Using Python:

``` bash
python -m http.server 8080
```

Then open:

``` text
http://localhost:8080
```

Or use an editor extension such as Live Server.

### Option 2 --- Node.js HTTP Server

Install `http-server`:

``` bash
npm install -g http-server
```

Run it from the project directory:

``` bash
http-server -p 8080
```

Then open:

``` text
http://localhost:8080
```

### Option 3 --- Vercel

The project can be deployed as a static website through Vercel.

Build steps are not required because the application is composed of
static HTML, CSS, JavaScript, manifest, icons, and Service Worker files.

### Option 4 --- GitHub Pages

The project can also be hosted through GitHub Pages, provided that the
manifest and Service Worker paths are correctly configured.

## Deployment Requirements

For full PWA functionality, the application should be served through:

-   HTTPS in production, or
-   `localhost` during local development

This is important because Service Workers and several PWA features
require a secure context.

## Customization

### Change Application Name

Modify the branding in `index.html` and `site.webmanifest`.

### Change Colors

Edit the CSS custom properties in the `:root` section of `index.html`.

### Add or Modify Demo Companies

Update the `DEMO_COMPANIES` array in the JavaScript section.

### Add or Modify Demo Blog Posts

Update the `DEMO_BLOGS` array.

### Change Google Sheets Configuration

The application stores the configured spreadsheet URL under:

``` javascript
localStorage.getItem('bizdirSheetUrl')
```

### Add New Company Fields

Additional fields can be mapped in the `loadData()` function:

``` javascript
const companies = rows.map(r => ({
  nama: r.nama || '',
  kategori: r.kategori || '',
  customField: r.custom_field || ''
}));
```

The corresponding field can then be rendered in the company card or
detail modal.

## Project Limitations

Although the application implements several PWA capabilities, there are
a few limitations to consider:

-   Google Sheets must be publicly accessible for browser-based CSV
    retrieval.
-   The application does not include a dedicated backend.
-   Authentication and authorization are not implemented.
-   Google Sheets functions as the external data source rather than a
    traditional database.
-   Push notification handling is implemented in the Service Worker, but
    a push subscription/backend delivery system is not included.
-   Background Sync registration depends on browser support.
-   Offline behavior depends on which resources have already been
    cached.
-   The current project is a single-page application rather than a
    multi-page website.
-   The HTML currently references `manifest.json`, while the provided
    manifest file is named `site.webmanifest`; this should be aligned
    before production deployment.

## Future Improvements

Potential improvements include:

-   Add a dedicated backend/API layer.
-   Add authentication for administrative data management.
-   Replace Google Sheets with a production database when required.
-   Add pagination or virtualized rendering for large company datasets.
-   Improve CSV parsing for more complex spreadsheet formats.
-   Add advanced search and multi-filter capabilities.
-   Add sorting by company name, category, location, or founding year.
-   Add favorites/bookmarks using local storage.
-   Implement true Web Push subscription and notification delivery.
-   Add automated PWA update handling.
-   Add an explicit offline data synchronization queue.
-   Add automated testing.
-   Optimize image loading and external requests.
-   Improve SEO metadata and social sharing previews.
-   Correct and validate the manifest reference before deployment.
-   Add a dedicated favicon and complete icon metadata if required.
-   Add analytics and performance monitoring.

## Performance & PWA Validation

The project is designed with performance and PWA principles in mind,
including:

-   Minimal external JavaScript dependencies
-   CSS custom properties
-   Lazy-loaded images
-   Service Worker caching
-   Responsive layouts
-   Cached fonts
-   Offline fallback
-   Installable PWA configuration

For production validation, run Lighthouse and verify:

-   Performance
-   Accessibility
-   Best Practices
-   SEO
-   PWA installability
-   Offline behavior

Do not treat expected Lighthouse scores as guaranteed; actual results
depend on deployment environment, network conditions, external
resources, and loaded data.

## Conclusion

BizDirectory demonstrates how a modern company directory can be
developed as a Progressive Web App using only native web technologies.

The project combines **Google Sheets as a lightweight data source**,
**Vanilla JavaScript for dynamic rendering**, and **PWA APIs for
installation and offline capabilities**. Features such as real-time
search, category filtering, company detail modals, integrated blog
content, caching strategies, background synchronization, and responsive
navigation provide a strong foundation for a production-oriented
directory application.

The project can be further expanded with a dedicated backend,
authentication, database integration, advanced search, real-time
synchronization, and complete Web Push infrastructure.

## License

MIT License --- Free to use, modify, and distribute for personal or
commercial projects, subject to the terms of the license.
