//
//  TrippieFirstViewController.m
//  Trippie
//
//  Created by Levko on 2014-02-27.
//  Copyright (c) 2014 COMP 4350 Group 2. All rights reserved.
//

#import "TrippieFirstViewController.h"
#import "AFHTTPRequestOperationManager.h"


@interface TrippieFirstViewController ()

@end

@implementation TrippieFirstViewController

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

- (IBAction)log_in:(id)sender {
    //NSLog(NSString);
    printf("\nLog in button pressed\n\n");
    
    NSString *emailInput = _email_textbox.text;
    NSString *passwordInput = _password_textbox.text;
    
    
    
    
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    NSDictionary *parameters = @{@"email": emailInput, @"password": passwordInput};
    [manager POST:@"http://localhost:3000/users/session" parameters:parameters success:^(AFHTTPRequestOperation *operation, id responseObject) {
        NSLog(@"JSON: %@", responseObject);
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];

    
    
}

@end
