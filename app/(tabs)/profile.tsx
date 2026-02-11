import { Styles } from '@/constants/Styles';
import { Colors } from '@/constants/theme';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.replace('/(auth)/login');
    };

    return (
        <View style={[Styles.container, Styles.center, { backgroundColor: Colors.light.background }]}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Student Profile</Text>
            <TouchableOpacity
                onPress={handleLogout}
                style={{ padding: 10, backgroundColor: Colors.light.error, borderRadius: 8 }}
            >
                <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
