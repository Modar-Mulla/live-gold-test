# Live Gold Test

## Installation

### Clone the Repository

You can clone using **SSH** or **HTTPS**:

**SSH**

````bash
git clone git@github.com:Modar-Mulla/live-gold-test.git

git clone https://github.com/Modar-Mulla/live-gold-test.git

```cd live-gold-test

Create a .env file in the root directory and add:
NEXT_PUBLIC_SITE_URL=http://localhost:3000/
DUMMY_API=https://dummyjson.com

Start the development server:
bun run dev

Or build and start the production server:
bun run build && bun run start


Static Rendering:
Pages are fully generated at build time as static HTML.
Examples:
          /_not-found
          /categories

Static Site Generation (SSG)
Dynamic routes are prebuilt at build time using generateStaticParams.
Examples:
        /categories/[categoryName] — e.g., Beauty, Fragrances, Furniture, etc.

        /products/[id] — e.g., 1, 2, 3, etc.

Server-Side Rendering (SSR)
HTML is generated on demand for each request.
Used when:
Page relies on searchParams (e.g., search results with queries).
Page needs access to cookies or authentication checks (e.g., profile page).

Examples:
        /
        /login
        /products (listing)
        /profile
        /search


Login Credintials for login test:
      "username": "emilys",
      "password": "emilyspass",
````
