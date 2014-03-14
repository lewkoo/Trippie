//
//  TrippieViewController.m
//  Trippie
//
//  Created by Chris Ventura on 2014-03-11.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "TrippieViewController.h"

@interface TrippieViewController ()

@end

@implementation TrippieViewController
@synthesize txtEmail;
@synthesize txtPassword;

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (IBAction)signinPressed {
    NSString *email = txtEmail.text;
    NSString *password = txtPassword.text;
    
    AFHTTPRequestOperationManager *manager = [[AFHTTPRequestOperationManager alloc] initWithBaseURL:[NSURL URLWithString:@"http://ec2-54-84-55-183.compute-1.amazonaws.com:3000/api/"]];
    [manager setRequestSerializer:[AFHTTPRequestSerializer serializer]];
    
    [manager.requestSerializer setAuthorizationHeaderFieldWithUsername:email password:password];
    [manager POST:@"login" parameters:Nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        NSLog(@"JSON: %@", responseObject);
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Sign in successful"
                                                        message:@"IT WORKED! WOOT!"
                                                       delegate:nil
                                              cancelButtonTitle:@"OK"
                                              otherButtonTitles:nil];
        [alert show];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Sign in failed"
                                                        message:@"There was something wrong with your creds, yo."
                                                       delegate:nil
                                              cancelButtonTitle:@"OK"
                                              otherButtonTitles:nil];
        [alert show];

    }];
}

@end
