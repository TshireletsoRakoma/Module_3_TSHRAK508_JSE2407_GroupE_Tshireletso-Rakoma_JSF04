# Vuex Store for E-Commerce Application

This Vuex store is designed to manage the state of an e-commerce application, including user authentication, cart, wishlist, product reviews, ratings, comparison, and checkout functionalities.

## State

The store's state includes various properties related to:

- **User Authentication**
  - `isLoggedIn`: Boolean indicating if the user is logged in.
  - `username`: The logged-in user's username.
- **Cart**
  - `cart`: An object holding items in the cart, keyed by the username.
- **Wishlist**
  - `wishlist`: An array of products added to the wishlist.
- **Reviews**
  - `reviews`: An object storing reviews by `productId`.
- **Ratings**
  - `ratings`: An object storing ratings by `productId`.
- **Comparison**
  - `comparison`: An object storing comparison data by `productId`.
- **Checkout**
  - `Checkout`: An object related to the checkout process.
- **User Information**
  - `userInfo`: An object holding user details like name, address, and email.
- **Order History**
  - `orderHistory`: An object storing past orders.

## Mutations

Mutations are used to directly modify the state. They include:

- `SET_WISHLIST`: Update the wishlist.
- `REMOVE_FROM_WISHLIST`: Remove a product from the wishlist.
- `ADD_ORDER`: Add a new order to the order history.
- `CLEAR_CART`: Clear all items from the cart.
- `REMOVE_ORDER`: Remove an order from the order history.
- `setSearchTerm`: Set the search term.
- `setSorting`: Set the sorting option.
- `setFilterItem`: Set the filter item.
- `login`: Handle user login.
- `logout`: Handle user logout.
- `addToComparison`: Add a product to the comparison list.
- `updateComparisonItem`: Update a comparison item.
- `removeFromComparison`: Remove a product from the comparison list.
- `clearComparison`: Clear the comparison list.
- `addToCart`: Add a product to the cart.
- `updateCartItem`: Update a cart item.
- `removeFromCart`: Remove a product from the cart.
- `clearCart`: Clear the cart.
- `addToWishlist`: Add a product to the wishlist.
- `removeFromWishlist`: Remove a product from the wishlist.
- `addReview`: Add a review for a product.
- `updateReview`: Update a review.
- `deleteReview`: Delete a review.
- `addRating`: Add a rating for a product.
- `updateRating`: Update a rating.
- `deleteRating`: Delete a rating.
- `updateUserInfo`: Update user information.
- `submitReview`: Submit a review (with API call).

## Actions

Actions are used to perform asynchronous operations and commit mutations. They include:

- `addToCart`: Add an item to the cart and remove it from the wishlist.
- `updateUserInfo`: Update user information.
- `updateUserField`: Update a specific user field.
- `placeOrder`: Place an order and clear the cart.
- `cancelOrder`: Cancel an order.
- `addToComparison`: Add an item to the comparison list.
- `updateComparisonItem`: Update a comparison item.
- `removeFromComparison`: Remove an item from the comparison list.
- `clearComparison`: Clear the comparison list.
- `addToCart`: Add an item to the cart.
- `updateCartItem`: Update a cart item.
- `removeFromCart`: Remove an item from the cart.
- `clearCart`: Clear the cart.
- `addToWishlist`: Add an item to the wishlist.
- `removeFromWishlist`: Remove an item from the wishlist.
- `addReview`: Add a review.
- `updateReview`: Update a review.
- `deleteReview`: Delete a review.
- `addRating`: Add a rating.
- `updateRating`: Update a rating.
- `deleteRating`: Delete a rating.
- `submitReview`: Submit a review.
- `fetchReviews`: Fetch reviews for a product.

## Getters

Getters are used to retrieve computed properties from the state. They include:

- `comparisonItemCount`: Get the total number of items in the comparison list.
- `comparisonTotalCost`: Get the total cost of items in the comparison list.
- `comparisonContents`: Get the contents of the comparison list.
- `cartItemCount`: Get the total number of items in the cart.
- `cartTotalCost`: Get the total cost of items in the cart.
- `cartContents`: Get the contents of the cart.
- `wishlistItemCount`: Get the number of items in the wishlist.
- `wishlistItems`: Get
