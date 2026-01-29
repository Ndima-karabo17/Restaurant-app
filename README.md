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


How to Get It Running
If you were setting this up in a real restaurant, here is what you would do:

1. Stock the Store Room (Database)
You need to put food on the menu first! We use a tool called pgAdmin to type in our dishes (like "Cheeseburger - R85").

2. Turn on the "Internet Pipe" (The Server)
The server is the middleman. It sits between the phone and the database. You turn it on by typing a command on your computer. Once it's on, it waits for phones to "call" it.

3. Connect the Phone to the Wi-Fi
For the phone app to see the menu, it needs to know the "address" of your computer.

Important Note: Both your computer and the phone must be on the same Wi-Fi, or they won't be able to "hear" each other.

# How to run app and what are needed (friendly and simple instruction)

Step 1: Start the "Store Room" (PostgreSQL)
-
Before anything else, your database must be "awake" so the server can talk to it.

Open pgAdmin 4 on your computer.

Make sure your server is connected (you might have to enter your password).

Ensure your database (e.g., restaurant_db) actually has the tables (products, orders, users).

If you haven't added food yet, the app will look empty!

Step 2: Start the "Middleman" (Backend Server)
-
This part handles the communication between the database and the apps.

Open VS Code.

Open your Backend folder.

Open a Terminal inside VS Code (Go to Terminal -> New Terminal).

Type this command and press Enter:

Dependencies to install
-
npm install

npx expo install @expo/vector-icons/Ionicons






