import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.bahuma.prockapp',
  appName: 'ProckApp',
  webDir: 'dist/prockapp',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    }
  }
};

export default config;
