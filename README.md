# RESTAURANT APPLICATION
A comprehensive mobile food ordering application built with React Native. This app allows users to browse menus, customize their meals with side options/extras,
and manage their profile and orders. It also includes a dedicated Admin Dashboard for restaurant management and data analytics.

Features
-

User Capabilities
-

Authentication: Secure registration and login (Email/Password) with profile management (Update address, contact info, and payment details).

Menu Browsing: Explore categorized food items (Starters, Burgers, Mains, etc.) with detailed descriptions and images.

Adjust quantity per item.

Cart Management: View items, edit quantities, modify extras for existing cart items, or clear the entire cart.

Checkout & Ordering: * Flexible delivery address selection.

Secure payment processing via integrated API (test mode).

Automatic order linking to user profiles via UID.


The Mobile App (The Customer's Menu)
-
This is what your customers see. It’s like a digital menu that they carry in their pocket.

Seeing the Food: The app asks the server, "What do we have today?" The server checks the Store Room (Database) and sends back the burgers, pizzas, and drinks.

Ordering: When a customer clicks "Add to Cart," the app remembers their choices. When they hit "Order," it sends a ticket straight to the manager.


The Database (The Store Room)
-
This is where all the information lives safely.

It remembers every user's name.

It keeps the master list of food and prices.

It stores every order ever made so you never lose a receipt.
Dependencies to install
-
npm install

npx expo install @expo/vector-icons/Ionicons



