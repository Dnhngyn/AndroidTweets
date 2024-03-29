package com.webdevduy.twittertest;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import org.apache.cordova.DroidGap;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.setIntegerProperty("loadUrlTimeoutValue", 70000);
        super.setStringProperty("loadingDialog", "Loading, Please Wait...");
        super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}

}