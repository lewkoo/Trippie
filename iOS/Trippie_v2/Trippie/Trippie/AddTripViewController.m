//
//  AddTripViewController.m
//  Trippie
//
//  Created by Chris Ventura on 2014-03-20.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import "AddTripViewController.h"

@implementation AddTripViewController
@synthesize txtTripName;
@synthesize dpStartDate;
@synthesize dpEndDate;

- (IBAction)addTrip {
    self.session = [SessionManager getInstance];
    NSString *tripName = txtTripName.text;
    NSDate *startDate = dpStartDate.date;
    NSDate *endDate = dpEndDate.date;
    
    NSDictionary *params = @{@"name": tripName,
                             @"tripStartDate": startDate,
                             @"tripEndDate": endDate};
    
    SessionManager *session = [SessionManager getInstance];
    [session.manager POST:@"trips" parameters:params success: ^(AFHTTPRequestOperation *operation, id responseObject) {
        NSLog(@"trip JSON: %@", responseObject);
        [self performSegueWithIdentifier:@"unwindToTrips" sender:self];
    } failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Fail"
                                                        message:@"There was something wrong with adding your trip."
                                                       delegate:nil
                                              cancelButtonTitle:@"OK"
                                              otherButtonTitles:nil];
        
        [alert show];
    }];
}


@end
