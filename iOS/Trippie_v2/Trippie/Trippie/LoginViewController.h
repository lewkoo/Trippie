//
//  TrippieViewController.h
//  Trippie
//
//  Created by Chris Ventura on 2014-03-11.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface LoginViewController : UIViewController

@property (strong, nonatomic) IBOutlet UITextField *txtEmail;
@property (strong, nonatomic) IBOutlet UITextField *txtPassword;

- (IBAction)signinPressed;
@end
