package com.ase.team22.ase5;

import android.app.Activity;

import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Environment;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class LoginActivity extends AppCompatActivity {
    private EditText firstName;
    private EditText lastName;
    private TextView address;
    private TextView errorMessage;
    private static final int PICK_IMAGE_REQUEST = 1;
    private UserDetails userDetails = new UserDetails();
    private static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 10;
    private static final long MIN_TIME_BW_UPDATES = 1000 * 60 * 1;
    private LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        firstName = (EditText) findViewById(R.id.ev_username);
        lastName = (EditText) findViewById(R.id.ev_lastName);
        address = (TextView) findViewById(R.id.tv_address);
        errorMessage = (TextView) findViewById(R.id.tv_errMsg);
        errorMessage.setVisibility(View.INVISIBLE);

        try {
            getLocation();
        } catch (IOException e) {
            Log.e(this.getClass().getName(), "Error while fetching location");
        }
    }


    public void getLocation() throws IOException {
        LocationService locationService = new LocationService(getApplicationContext());
        if (locationService.canGetLocation) {
            double lat = locationService.getLatitude();
            double lon = locationService.getLongitude();
            Log.i(this.getClass().getName(),lat + " "+lon);
            if(lat > 0.0 || lon > 0.0){
                String add = new Geocoder(getApplicationContext()).getFromLocation(lat, lon, 1).get(0).getAddressLine(0) + "\n"
                        + new Geocoder(getApplicationContext()).getFromLocation(lat, lon, 1).get(0).getAddressLine(1) + "\n" +
                        new Geocoder(getApplicationContext()).getFromLocation(lat, lon, 1).get(0).getAddressLine(2);
                //Log.e(this.getClass().getName(),new Geocoder(getApplicationContext()).getFromLocation(lat, lon, 1).get(0).getAddressLine(0));
                userDetails.setLatitude(lat);
                userDetails.setLongitude(lon);
                userDetails.setAddress(add);
                address.setText(add);
            }
            else {
                address.setText("Enable Location services in Settings to fetch address");
            }
        } else {

            address.setText("Enable Location services in Settings to fetch address:outer");
        }
    }

    public void signupUser(View view) {
        errorMessage.setText("");
        errorMessage.setVisibility(View.INVISIBLE);
        if (view.getId() == R.id.signup) {
            if (firstName.getText() == null || lastName.getText() == null ||
                    firstName.getText().toString().equals("") || lastName.getText().toString().equals("")) {
                errorMessage.setVisibility(View.VISIBLE);
                errorMessage.setText("Both First name and Last name are required");
            } else {

                Intent intent = new Intent(this, HomeActivity.class);
                intent.putExtra("userDetails", userDetails);
                startActivity(intent);
            }
        }
    }

    public void selectImage(View view) {
        if (view.getId() == R.id.btn_image) {
           /* Intent intent = new Intent();
            intent.setType("image*//*");
            intent.setAction(Intent.ACTION_PICK);
            startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);
            */
            Intent pickIntent = new Intent();
            pickIntent.setType("image/*");
            pickIntent.setAction(Intent.ACTION_PICK);

            Intent takePhotoIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

            Intent chooserIntent = Intent.createChooser(pickIntent, "Select Option");
            chooserIntent.putExtra
                    (
                            Intent.EXTRA_INITIAL_INTENTS,
                            new Intent[] { takePhotoIntent }
                    );

            startActivityForResult(chooserIntent, PICK_IMAGE_REQUEST);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        /*if (requestCode == PICK_PHOTO_FOR_AVATAR && resultCode == Activity.RESULT_OK) {
            if (data == null) {
                errorMessage.setVisibility(View.VISIBLE);
                errorMessage.setText("Image cannot be uploaded");
                return;
            }
            InputStream inputStream = null;
            try {
                inputStream = getApplicationContext().getContentResolver().openInputStream(data.getData());
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
            String path = saveToInternalStorage(bitmap);
            userDetails.setProfilePath(path);
            loadImageFromStorage(path);
        }*/
        super.onActivityResult(requestCode, resultCode, data);
        ImageButton imgBtn = (ImageButton) findViewById(R.id.btn_image);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            Uri uri = data.getData();
            userDetails.setProfilePath(uri.toString());
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);
                Bitmap scaled = Bitmap.createScaledBitmap(bitmap, imgBtn.getWidth(),
                        imgBtn.getHeight(), false);
                imgBtn.setImageBitmap(scaled);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String saveToInternalStorage(Bitmap bitmapImage) {
        ContextWrapper cw = new ContextWrapper(getApplicationContext());
        // path to /data/data/yourapp/app_data/imageDir
        File directory = cw.getDir("imageDir", Context.MODE_PRIVATE);
        // Create imageDir
        File mypath = new File(directory, "profile.jpg");

        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(mypath);
            bitmapImage.compress(Bitmap.CompressFormat.JPEG, 100, fos);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return directory.getAbsolutePath();
    }

    private void loadImageFromStorage(String path) {

        try {
            File f = new File(path, "profile.jpg");
            Bitmap b = BitmapFactory.decodeStream(new FileInputStream(f));
            ImageButton imgBtn = (ImageButton) findViewById(R.id.btn_image);
            Bitmap scaled = Bitmap.createScaledBitmap(b, imgBtn.getWidth(),
                    imgBtn.getHeight(), false);
            imgBtn.setImageBitmap(scaled);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

}