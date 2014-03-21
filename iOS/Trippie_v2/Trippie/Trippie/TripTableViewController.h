//
//  TripTableViewController.h
//  Trippie
//
//  Created by Chris Ventura on 2014-03-19.
//  Copyright (c) 2014 Chris Ventura. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SessionManager.h"

@interface TripTableViewController : UITableViewController <UITableViewDataSource>

@property SessionManager *session;
@property NSArray *tripList;
@property NSArray *finTripList;

- (IBAction)unwindToTrips:(UIStoryboardSegue *)segue;

@end
