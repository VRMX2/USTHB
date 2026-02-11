import { Link, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
            <View className="items-center mb-10">
                <Text className="text-3xl font-bold text-primary text-center mb-2">
                    RSD Masters Companion
                </Text>
                <Text className="text-gray-500 text-center text-lg">
                    The ultimate tool for USTHB RSD Students
                </Text>
            </View>

            <View className="w-full space-y-4">
                <TouchableOpacity
                    className="w-full bg-primary py-4 rounded-xl shadow-lg"
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Text className="text-white text-center font-semibold text-lg">
                        Login with Matricule
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full bg-gray-100 py-4 rounded-xl border border-gray-200"
                    onPress={() => router.push('/(auth)/register')}
                >
                    <Text className="text-gray-800 text-center font-semibold text-lg">
                        New Student Activation
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="mt-8">
                <Text className="text-xs text-gray-400 text-center">
                    © 2026 USTHB RSD Department. Restricted Access.
                </Text>
            </View>
        </SafeAreaView>
    );
}
