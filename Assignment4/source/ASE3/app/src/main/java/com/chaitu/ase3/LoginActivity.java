package com.chaitu.ase3;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class LoginActivity extends AppCompatActivity {

    private EditText userName;
    private EditText password;
    private TextView errMsg;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        userName = (EditText) findViewById(R.id.et_userName);
        password = (EditText) findViewById(R.id.et_password);
        errMsg = (TextView) findViewById(R.id.tv_errMsg);

    }
    public void loginUser(View view){
        if(view.getId() == R.id.btn_login) {
            if (userName == null && password == null) {
                errMsg.setText("Please enter both userName and Password");
                errMsg.setVisibility(View.VISIBLE);
            } else if (userName == null || userName.getText().toString().equals("")) {
                errMsg.setText("Please enter userName");
                errMsg.setVisibility(View.VISIBLE);
            } else if (password == null|| password.getText().toString().equals("")) {
                errMsg.setText("Please enter password");
                errMsg.setVisibility(View.VISIBLE);
            } else {
                if (userName.getText().toString().equals("admin")
                        && password.getText().toString().equals("admin")) {

                    Intent intent = new Intent(this, HomeActivity.class);
                    startActivity(intent);
                } else {
                    errMsg.setText("Invalid userName or password");
                    errMsg.setVisibility(View.VISIBLE);
                }
            }
        }
    }
    public void signupUser(View view){
        if(view.getId() == R.id.btn_signup){
            Intent intent = new Intent(this,RegisterActivity.class);
            startActivity(intent);
        }
    }


}
