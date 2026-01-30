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

Type this command and press Enter: npm install
npm run dev

Look for the message: You should see  "Server is live!" in the terminal.

Keep this window open! If you close it, the "pipes" are cut and the apps will stop working.


Step 3: Connect the "Menu" (Mobile App)
-
Now we tell the phone where to look for the food.

Find your Computer's Address (IP):

On Windows: Search for cmd, type ipconfig, and look for IPv4 Address (e.g., 192.168.1.105).

Update the Address: In your Mobile App code, find the file where the "URL" is saved (usually api/client.ts) and make sure it uses that IP address.

Open a new terminal for the Mobile folder and type:

npm install

npx expo start
Open the App: Use your phone to scan the QR code that appears on your screen (you'll need the Expo Go app from the Play Store).

The terminal will give you a link (usually http://localhost:5173). Hold Ctrl and click that link to open the dashboard in your browser.

How to test if it's working:
-
On the Phone: Pull down to refresh. If the food items appear, you are connected!

On the Dashboard: Check if the "Total Orders" card shows a number.

Place an Order: Add a burger to your cart on the phone and hit "Checkout." Then, look at the Dashboard—you should see a new order pop up immediately!

Dependencies to install
-
npm install

npx expo install @expo/vector-icons/Ionicons




## Database Instruction


Database Setup (PostgreSQL)
-
Before running the app, you must set up the database schema to handle the UUID relationship between Users and Orders.

Open pgAdmin4.

Create a new database named restaurant_db.

Open the Query Tool and paste the code from database.sql


Backend Configuration
-
Navigate to the server folder.

Create a .env file and add your database credentials:

DB_USER=postgres

DB_PASSWORD=your_password

DB_HOST=localhost

DB_PORT=5432

DB_NAME=restaurant_db

PORT=5000

Run the server

npm install

npm run dev

Database Schema Logic
-
The database is built on a Referential Integrity model:

Users Table: Every customer is assigned a unique UUID.

Orders Table: Every order contains a user_id that must match a valid user in the Users table.

Cascading Deletes: If a user is removed, their order history is automatically cleaned up to prevent database clutter.

What is need in the pgAdmin4
-
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS order_items CASCADE;

DROP TABLE IF EXISTS orders CASCADE;

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE users (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    name VARCHAR(100) NOT NULL,
    
    email VARCHAR(255) UNIQUE NOT NULL,
    
    contact VARCHAR(20),
    
    address TEXT,
    
    card VARCHAR(20),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (

    id SERIAL PRIMARY KEY,
    
    name VARCHAR(100) NOT NULL,
    
    description TEXT,
    
    price DECIMAL(10,2) NOT NULL,
    
    category VARCHAR(50),
    
    is_available BOOLEAN DEFAULT TRUE,
    
    image_url TEXT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    
    user_id UUID NOT NULL, 
    
    total_price DECIMAL(10,2) DEFAULT 0.00,
    
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Preparing', 'Delivered', 'Cancelled')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_order 
    
      FOREIGN KEY(user_id) 
      
      REFERENCES users(id) 
      
      ON DELETE CASCADE
);

CREATE TABLE order_items (

    id SERIAL PRIMARY KEY,
    
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    quantity INTEGER DEFAULT 1,
    
    subtotal DECIMAL(10,2) NOT NULL
);


Design Link
-
https://www.figma.com/design/h8LHOeaBn6wnRxPXB9zSz8/Restaurant-App?node-id=0-1&p=f&t=86wsF8J4pAOPHJtw-0


Screenshots of mobile app
-

![profile](https://github.com/user-attachments/assets/b9960dff-b060-40fa-ae25-73f4a4bd6511)
![Logout_Confirmation](https://github.com/user-attachments/assets/473b57dd-c4ae-489e-b98b-781f6996e3cb)
![LoginPage](https://github.com/user-attachments/assets/68c9a39a-6ad1-4dab-b782-de6c908ea057)
![DefaultCartPage](https://github.com/user-attachments/assets/47e713d9-1944-462f-903d-cc176ef57e22)
![Default_menuPage](https://github.com/user-attachments/assets/7a2aa9d4-65ea-4d12-aeb6-8a47ec2456da)
![createAccountPage](https://github.com/user-attachments/assets/5cae14f6-7928-4b4f-ad0a-f8ff35f07cd6)



