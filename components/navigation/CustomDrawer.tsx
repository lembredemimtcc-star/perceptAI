import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function CustomDrawer(props: any) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        style={styles.drawerScrollView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={30} color="#000" />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ana Clara</Text>
            <Text style={styles.userEmail}>ana@gmail.com</Text>
          </View>
        </View>

        <View style={styles.menuList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  drawerScrollView: {
    flex: 1,
    margin: 0,
    padding: 0,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 0,
  },

  header: {
    backgroundColor: "#F2A31B",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    width: "100%",
    borderTopRightRadius: 60,
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    right: 20,
    top: 25,
    zIndex: 10,
  },

  userInfo: {
    alignItems: "center",
  },

  userName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#000",
  },

  userEmail: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#000",
  },

  menuList: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});