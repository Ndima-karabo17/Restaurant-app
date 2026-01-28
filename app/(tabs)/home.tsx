import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { apiClient } from '@/src/api/client';
import { useRouter } from 'expo-router';
import { useCart } from '../../src/context/CartContext';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: string;
  name: string;
  price: string;
  image_url: string;
  category: string;
}

const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Salads', 'Drinks'];

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const { addToCart } = useCart(); 

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter logic: Runs whenever products, search, or category changes
  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url
    });

    Alert.alert(
      "Added to Cart 🛒", 
      `${product.name} is ready!`,
      [
        { text: "Checkout Now", onPress: () => router.push('/delivery-options') },
        { text: "Keep Shopping", style: "cancel" }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <View>
        
          <Text style={styles.header}>Delicious Menu</Text>
        </View>
        <TouchableOpacity style={styles.cartIcon} onPress={() => router.push('/checkout')}>
           <Ionicons name="cart" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for your favorite food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={{ height: 60 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={60} color="#eee" />
            <Text style={styles.emptyText}>No items found for {searchQuery}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image 
                source={{ uri: item.image_url }} 
                style={styles.image}
                resizeMode="cover"
              />
              {!item.image_url || item.image_url.includes('share.google') ? (
                <View style={styles.placeholder}>
                  <Ionicons name="fast-food-outline" size={40} color="#ddd" />
                </View>
              ) : null}
            </View>

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.price}>R{parseFloat(item.price).toFixed(2)}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
  welcomeText: { fontSize: 16, color: '#888', fontWeight: '500' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  cartIcon: { backgroundColor: 'orange', padding: 10, borderRadius: 12, elevation: 3 },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#eee'
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 50, fontSize: 16, color: '#333' },
  categoryContainer: { paddingHorizontal: 15, paddingVertical: 10 },
  categoryButton: { paddingHorizontal: 22, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f5f5f5', marginRight: 10, height: 40, justifyContent: 'center' },
  categoryButtonActive: { backgroundColor: 'orange' },
  categoryText: { fontWeight: '600', color: '#777' },
  categoryTextActive: { color: '#fff' },
  row: { justifyContent: 'space-between', paddingHorizontal: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, width: '47%', elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, overflow: 'hidden' },
  imageWrapper: { width: '100%', height: 120, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', position: 'absolute' },
  placeholder: { position: 'absolute', zIndex: -1 },
  info: { padding: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 15, color: 'green', fontWeight: '800', marginVertical: 4 },
  addButton: { backgroundColor: 'orange', paddingVertical: 10, borderRadius: 12, alignItems: 'center', marginTop: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  emptyText: { color: '#bbb', marginTop: 10, fontSize: 16 }
});