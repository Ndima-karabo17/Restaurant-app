import { Stack } from 'expo-router';
import { CartProvider } from '../src/context/CartContext'; 
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        {/* Main Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Auth screens - Changed 'presentation' to 'animation' */}
        <Stack.Screen 
          name="login" 
          options={{ animation: 'fade' }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ animation: 'fade' }} 
        />

        {/* Other screens */}
        <Stack.Screen name="checkout" options={{ title: 'My Cart', headerShown: true }} />
        <Stack.Screen name="delivery-option" options={{ title: 'Delivery' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment' }} />
        <Stack.Screen name="checkout-message" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}