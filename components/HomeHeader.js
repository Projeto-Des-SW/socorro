import { View, Text, Platform, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import profileScreen from '../app/profileScreen';

const isIOS = Platform.OS == 'ios'
export default function HomeHeader() {

    const { top } = useSafeAreaInsets()
    const { user, logout } = useAuth()
    const router = useRouter();
    
    const handleProfile = () => {
        router.push("profileScreen")
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <View style={[styles.container, { paddingTop: isIOS ? top : top + 10 }]} >
            <View>
                <Text style={styles.headerText}>SOCORRO!!</Text>
            </View>

            <View style={styles.menuContainer}>
                <Menu>
                    <MenuTrigger>
                        <Image
                            style={styles.image}
                            source={user?.profilePicture}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions style={styles.optionsContainer}>
                        <MenuItem
                            text='Perfil'
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color= '#0F1626'/>}
                        />
                        <Divider/>
                        <MenuItem
                            text='Sair'
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name='logout' size={hp(2.5)} color= '#0F1626'/>}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const Divider = () => {
    return (
        <View style={styles.divider}/>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        paddingBottom: hp(1.5),
        backgroundColor: '#0F1626',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
    },
    headerText: {
        fontSize: hp(3),
        color: '#EFC51B',
    },
    image: {
        width: hp(5),
        height: hp(5),
        borderRadius: hp(2.5),
    },
    menuContainer: {
        position: 'relative',
    },
    optionsContainer: {
        borderRadius: 20,
        //borderCurve: 'continuous',
        marginTop: hp(2),
        //marginLeft: -30,
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4,
        width: 160,
        position: 'absolute',
        top: hp(5),
        right: 0,
    },
    divider: {
        height: 1,
        backgroundColor: '#EFC51B', // Ajuste a cor conforme necessário
        width: '100%',
    },
});