import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import React, { useEffect, useRef } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { COLORS } from "./Style/Colors";

import { initiateStore, persistor } from "./Store/index";
import { Navigation } from "./Navigation/Navigation";
import { navigationService } from "./Navigation/Navigation.service";

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};
export const Root = () => {
  const store = useRef(initiateStore());
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={COLORS.darknavy} barStyle="light-content" />
        <Provider store={store.current}>
          <PersistGate loading={null} persistor={persistor(store.current)}>
            <NavigationContainer
              ref={(navigationRef) =>
                (navigationService.navigator = navigationRef)
              }
              theme={CustomTheme}
            >
              <Navigation />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </View>
    </SafeAreaProvider>
  );
};
