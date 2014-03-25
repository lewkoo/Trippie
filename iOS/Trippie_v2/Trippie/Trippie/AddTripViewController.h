//
//  AddTripViewController.h
//  Trippie
//
//  Created by Chris Ventura on 2014-03-20.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SessionManager.h"

@interface AddTripViewController : UITableViewController


@property SessionManager *session;
@property (weak, nonatomic) IBOutlet UITextField *txtTripName;
@property (weak, nonatomic) IBOutlet UIDatePicker *dpStartDate;
@property (weak, nonatomic) IBOutlet UIDatePicker *dpEndDate;

-(IBAction)addTrip;
- (void) addTripHandler: (NSDictionary*) params;

@end
