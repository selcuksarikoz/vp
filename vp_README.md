Coding Challenge: Headless B2C Storefront (Next.js + Mocked JTL API)
# Goal

Build a production-ready, SEO-optimized B2C storefront using a headless architecture with a technology of your choice.

The application should simulate a real-world integration with an external system (e.g. JTL), using a mocked API.

The focus is not only on functionality, but on:

- architecture
- data handling
- performance
- scalability

# Provided Setup

You have received a db.json file containing:
- products
- categories
- cart

Sample images:
https://www.dropbox.com/scl/fo/4iugc73f1t9rv7ydxz2gz/AJbKCYPCYDRt9J6-382mxSg?rlkey=e6ykegc59m1kjzl3k0g30ja85&e=1&dl=0

# API Setup (required)

Run a mock API using json-server:

npm install -g json-server
json-server --watch db.json --port 3001

The mock API is powered by json-server and automatically generates REST endpoints based on the provided db.json structure.

Examples:

- GET /products → list all products
- GET /products/:id → get a single product
- GET /categories → list categories
- GET /cart → get current cart
- PUT /cart → update the cart

Note:
The cart is implemented as a single resource, not a collection.

# Important Constraints
Treat the API as an external system (e.g. JTL)
Do NOT import JSON files directly
All data access must happen via HTTP
The API is not perfectly reliable:
Some fields may be missing
Prices may be null
Variants may be inconsistent

-> Your implementation must handle these cases gracefully

# Scope (~30–40 hours)
1. Project Setup
Initialize a project.

Set up a clean folder structure
2. Data Layer

3. Product Listing Page (PLP)
Display products from API
Include:
name
image
price (if available)
Handle missing data gracefully
Link to Product Detail Page

4. Product Detail Page (PDP)
Display:
name
description
images
attributes
variants
Variant selection logic
Handle:
missing price
incomplete variant data

5. Category Navigation
Display categories
Filter products by category
Support hierarchical structures (if applicable)

6. Cart
Add products to cart (via API)
Update quantities
Remove items
Fetch cart from API

Important:

The cart API only stores:
productId
variantId
quantity

-> You must:

resolve product data yourself
calculate totals on the frontend

7. Rendering & Performance
Use Server Components where appropriate
Implement SSR and/or ISR
Apply caching strategies where useful

8. Styling
Focus on clean, usable UI (not pixel-perfect design)
The Design Focus should be on the Product Detail Page - as reference we attached some images, 
but you can also choose your own design.
(https://www.dropbox.com/scl/fo/4iugc73f1t9rv7ydxz2gz/AJbKCYPCYDRt9J6-382mxSg?rlkey=e6ykegc59m1kjzl3k0g30ja85&e=1&dl=0)

9. Basic Tracking (Preparation)

Prepare a simple tracking structure:

e.g. DataLayer or event hooks for:
product view
add to cart

(No need for full analytics integration)

# Bonus (Optional)
Multi-Shop Capability
Support multiple storefronts via config (e.g. environment variables)
Example:
different categories
different branding

# Expectations (Senior Level)

We expect a solution that demonstrates:

Clear separation of concerns
A dedicated data access layer
Thoughtful handling of incomplete / inconsistent data
Clean, scalable component architecture
Pragmatic decision-making (no overengineering)

# Documentation

Please include a short README covering:

Architecture decisions
Data handling approach
Trade-offs you made
What you would improve with more time

#️ Time Expectation
This task is designed to take approximately 30–40 hours
You are not expected to build a perfect production system
but your solution should reflect how you would approach one

# Final Notes

You are free to make assumptions where needed.

When doing so:
document them
keep the system extensible

# Submission & Delivery

Please submit your solution in the following format:

1. Repository
Provide a Git repository (GitHub, GitLab, or similar)
Ensure the project is complete and runnable
2. Setup Instructions

Your README must include clear steps to run the project:

Include:

1. Running the Application
The application should run locally without errors
All core features should be testable via the UI
2. What we will review

We will:

Run your project locally
Navigate through:
product listing
product detail pages
cart functionality
Review your code and architecture
Review design choices especially on PDP