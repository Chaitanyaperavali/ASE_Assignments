package com.chaitu.ase3;
import android.content.Intent;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import android.widget.Toast;

import java.util.Locale;


public class HomeActivity extends AppCompatActivity {
    EditText toSpeak;
    TextToSpeech ttobj;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        toSpeak = (EditText) findViewById(R.id.ev_tospeak);
    }

    public void logout(View v) {
        if (v.getId() == R.id.btn_logout) {
            Intent redirect = new Intent(HomeActivity.this, LoginActivity.class);
            startActivity(redirect);
        }
    }

    public void speak(View v) {
        if(v.getId() == R.id.btn_speak) {
            ttobj = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
                @Override
                public void onInit(int status) {
                    if (status != TextToSpeech.ERROR) {
                        ttobj.setLanguage(Locale.UK);
                        Log.w(this.getClass().getName(),"initializing tts");
                    }
                }
            });
            String speech = toSpeak.getText().toString();
            if(speech != null && !speech.equals("")){
                Toast.makeText(this,speech, Toast.LENGTH_SHORT).show();
                ttobj.speak(speech, TextToSpeech.QUEUE_FLUSH, null);
            }

        }
    }

    public void onPause() {
        if (ttobj != null) {
            ttobj.stop();
            ttobj.shutdown();
        }
        super.onPause();
    }

}
