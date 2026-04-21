import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function CustomDrawer(props: any) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{ paddingTop: 0 }}
        style={styles.drawerScrollView}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => props.navigation.closeDrawer()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ana Clara</Text>
            <Text style={styles.userEmail}>ana@gmail.com</Text>
          </View>
        </View>

        <View style={styles.menuList}>
          {/* O segredo está aqui: ele vai ler as cores do _layout.tsx */}
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerScrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#F2A31B',
    paddingHorizontal: 20,
    paddingTop: 60, 
    paddingBottom: 40,
    width: '100%',
    borderTopRightRadius: 60,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 10,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  userEmail: {
    fontSize: 16,
    color: 'black',
  },
  menuList: {
    flex: 1,
    paddingTop: 10,
    // Verifique se não há nada aqui forçando cores
  },
});