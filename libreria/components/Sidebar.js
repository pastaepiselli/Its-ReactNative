import { Pressable, StyleSheet, View, Text } from "react-native";

const navItems = [
  { key: "home", label: "Home", icon: "🏠", route: "Home" },
  { key: "libri", label: "Libri", icon: "📚", route: "Libri" },
  { key: "users", label: "Users", icon: "👤", route: "Users" },
];

const Sidebar = ({ navigation, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        {navItems.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => navigation.navigate(item.route)}
            style={styles.quad}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffffff"
  },
  sidebar: {
    backgroundColor: "#0f7cd6ff",
    width: 90,
    alignItems: "center",
    paddingTop: 20,
  },
  quad: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 12,
  },
});
