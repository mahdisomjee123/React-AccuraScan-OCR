package hybrid.com;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.ReactHost;
import com.facebook.soloader.SoLoader;
import com.facebook.react.soloader.OpenSourceMergedSoMapping;

import java.io.IOException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  // Declare as field but DO NOT initialize here
  private ReactHost mReactHost;

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public ReactHost getReactHost() {
    // Lazy init: safe because onCreate() has run by the time anyone calls this
    if (mReactHost == null) {
      mReactHost = DefaultReactHost.getDefaultReactHost(
        getApplicationContext(),  // ← now safe
        mReactNativeHost
      );
    }
    return mReactHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    // You can also init the host here instead of lazy in getter
    // mReactHost = DefaultReactHost.getDefaultReactHost(getApplicationContext(), mReactNativeHost);

    try {
      SoLoader.init(this, OpenSourceMergedSoMapping.INSTANCE);
    } catch (IOException e) {
      e.printStackTrace();
    }

    // Keep commented – not needed in recent RN with plugin applied
    // if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
    //   DefaultNewArchitectureEntryPoint.load();
    // }
  }
}
