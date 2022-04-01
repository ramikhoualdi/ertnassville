package com.massay;
// Added

import android.os.Bundle;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;

// Added

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "massay";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
      RNImmediatePhoneCallPackage.onRequestPermissionsResult(requestCode, permissions, grantResults); // very important event callback
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }
}
