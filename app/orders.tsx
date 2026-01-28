import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { apiClient } from "@/src/api/client";
import { useRouter } from "expo-router";
import { useCart } from "../src/context/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function OrdersScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { reorderItems } = useCart(); // * Access the new reorder function
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (orderItems: any[]) => {
    Alert.alert(
      "Re-order?",
      "This will replace your current cart with these items.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Re-order",
          onPress: () => {
            reorderItems(orderItems);
            router.push("/delivery-options");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.totalAmount}>
                R{Number(item.total_amount).toFixed(2)}
              </Text>
            </View>

            <Text style={styles.itemSummary}>
              {item.items.map((i: any) => i.name).join(", ")}
            </Text>

            <View style={styles.divider} />

            <View style={styles.footer}>
              <Text style={styles.date}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>

              <TouchableOpacity
                style={styles.reorderBtn}
                onPress={() => handleReorder(item.items)}
              >
                <Ionicons name="refresh-outline" size={18} color="#fff" />
                <Text style={styles.reorderText}>Re-order</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333" },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: { fontSize: 16, fontWeight: "bold" },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: "orange" },
  itemSummary: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    fontStyle: "italic",
  },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 12 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: { fontSize: 13, color: "#aaa" },
  reorderBtn: {
    flexDirection: "row",
    backgroundColor: "orange",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  reorderText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },
});
