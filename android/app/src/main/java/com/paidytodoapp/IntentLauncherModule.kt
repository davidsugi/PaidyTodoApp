package com.paidytodoapp

import android.app.Activity
import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class IntentLauncherModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "IntentLauncher"
  }

  @ReactMethod
  fun openFingerprintSettings() {
    val activity: Activity? = currentActivity
    if (activity != null) {
      try {
        val intent = Intent(Settings.ACTION_FINGERPRINT_ENROLL)
        activity.startActivity(intent)
      } catch (e: Exception) {
        val fallbackIntent = Intent(Settings.ACTION_SECURITY_SETTINGS)
        activity.startActivity(fallbackIntent)
      }
    }
  }
}
