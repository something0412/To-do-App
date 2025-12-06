import { Stack } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
    const currentDate: Date = new Date();
    const date: string = String(currentDate.getDate());
    const month: string = currentDate.toLocaleString("default", {
        month: "long",
    });
    const year: string = String(currentDate.getFullYear());
    const day: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formatedDate = `${day[currentDate.getDay()]} - ${month} ${date.length === 1 ? `0${date}` : date}, ${year}`;

    const CustomHeader = () => {
        return (
            <SafeAreaView
                className="w-full justify-center items-center pt-5 z-10"
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                    backgroundColor: "#F9F8F6",
                }}
            >
                <Text
                    className="justify-center self-center font-bold"
                    style={{ fontSize: 22, color: "#753422" }}
                >
                    {formatedDate}
                </Text>
            </SafeAreaView>
        );
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <CustomHeader />
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                        keyboardHandlingEnabled: false,
                    }}
                />
            </Stack>
        </>
    );
}
