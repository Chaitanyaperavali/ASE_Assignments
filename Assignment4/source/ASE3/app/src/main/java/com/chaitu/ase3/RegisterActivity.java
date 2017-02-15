package com.chaitu.ase3;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class RegisterActivity extends AppCompatActivity {
    private EditText email;
    private EditText fullName;
    private EditText password;
    private EditText confirmPassword;
    private TextView errMsg;
    private Button signupButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        email = (EditText)findViewById(R.id.et_email);
        fullName = (EditText)findViewById(R.id.et_userName);
        confirmPassword = (EditText)findViewById(R.id.et_confirmPass);
        password = (EditText) findViewById(R.id.et_password);
        errMsg = (TextView) findViewById(R.id.tv_errMsg);
        signupButton = (Button) findViewById(R.id.btn_signup);
        errMsg.setVisibility(View.INVISIBLE);
    }
    public void signupUser(View view){
        if(view.getId() == R.id.btn_signup){
            boolean buttonFlag = true;
            String fields = "Please enter";
            if(email == null || email.getText().toString().equals("")){
                fields = fields + " email, ";
                buttonFlag = false;
            }if(fullName == null || fullName.getText().toString().equals("")){
                fields = fields + " fullName, ";
                buttonFlag = false;
            }if(password == null || password.getText().toString().equals("")){
                fields = fields + " password, ";
                buttonFlag = false;
            }if(confirmPassword == null || confirmPassword.getText().toString().equals("")){
                fields = fields + " confirmPassword ";
                buttonFlag = false;
            }
            if(!password.getText().toString().equals(confirmPassword.getText().toString())
                    && !password.getText().toString().equals("") && !confirmPassword.getText().toString().equals("")){
                fields = "Passwords did not match";
                buttonFlag = false;
            }
            errMsg.setText(fields);
            errMsg.setVisibility(View.VISIBLE);
            if(buttonFlag){
                errMsg.setText("Thanks for registering with us");
                Intent intent = new Intent(this,HomeActivity.class);
                startActivity(intent);
            }
        }
    }
}
